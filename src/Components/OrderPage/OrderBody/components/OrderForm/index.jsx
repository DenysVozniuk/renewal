import React, { useState, useContext, useRef, useEffect } from "react";
import Context from "../../../../../Context";

const API_BASE = "/Server/nova.php"; // бек-проксі до Нової пошти

const OrderForm = () => {
  const contextValue = useContext(Context);
  const [activeOrderButton, setActiveOrderButton] = useState(false);

  const formData = [
    { labelName: "1. Ваше прізвище та ім'я", inputName: "name", isRequired: true },
    { labelName: "2. Номер телефону", inputName: "phone", isRequired: true },
    { labelName: "3. Адреса відправлення", inputName: "address", isRequired: true },
    { labelName: "4. Коментар до замовлення (не обов'язково)", inputName: "comment", isRequired: false },
  ];

  const [formInputValueState, setFormInputValueState] = useState(
    formData.map(v => ({ name: v.inputName, value: "" }))
  );

  const [manualMode, setManualMode] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [cityQuery, setCityQuery] = useState("");
  const [cities, setCities] = useState([]);
  const [citiesOpen, setCitiesOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [warehouses, setWarehouses] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const debounceRef = useRef(null);

  const setAddressValue = (val) => {
    const addrIdx = 2;
    setFormInputValueState(prev => prev.map((s, i) => i === addrIdx ? { ...s, value: val } : s));
  };

  const combineCityAndOption = (city, optionText) => {
    const cityName = (city?.label || "").trim();
    const t = (optionText || "").trim();
    if (!cityName) return t;
    const tLower = t.toLowerCase();
    const cLower = cityName.toLowerCase();
    if (tLower.startsWith(cLower) || tLower.includes(cLower)) return t;
    return `${cityName}, ${t}`;
  };

  // ---------- API ----------
  const fetchCities = async (q) => {
    if (!q.trim()) {
      setCities([]);
      return;
    }
    try {
      const r = await fetch(`${API_BASE}?action=cities&q=${encodeURIComponent(q)}&limit=50`);
      const j = await r.json();
      if (j.success) setCities(j.items || []);
    } catch (e) {
      console.error(e);
      setErrorMsg("Помилка з’єднання з сервісом НП.");
    }
  };

  const fetchWarehouses = async (settlementRef) => {
    try {
      const r = await fetch(`${API_BASE}?action=warehouses&ref=${encodeURIComponent(settlementRef)}&limit=200`);
      const j = await r.json();
      if (j.success) setWarehouses(j.items || []);
    } catch (e) {
      console.error(e);
      setErrorMsg("Помилка з’єднання з сервісом НП.");
    }
  };

  useEffect(() => {
    if (!manualMode && selectedCity?.ref) {
      fetchWarehouses(selectedCity.ref);
      setSelectedWarehouse(null);
      setAddressValue("");
    }
  }, [selectedCity, manualMode]);

  const handleChange = (event, index) => {
    setFormInputValueState(prev =>
      prev.map((state, i) => i === index ? { ...state, value: event.target.value } : state)
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (contextValue.orderList.length === 0) {
      alert("Ви маєте замовити хоча б одну книгу для того, щоб відправити замовлення");
      setFormInputValueState(formData.map(v => ({ ...v, value: "" })));
      return;
    }

    const orderData = contextValue.orderList.map((order) => {
      return (
        (order.isCopybookChecked && order.isBookChecked) ? {
          name: order.title,
          count: order.count,
          copybookCount: order.copybookCount,
          isAudio: false
        } : ((order.isAudioChecked && order.isBookChecked) ? {
          name: order.title,
          count: order.count,
          copybookCount: order.copybookCount,
          isAudio: true
        } : (order.isCopybookChecked ? {
          name: order.title,
          count: null,
          copybookCount: order.copybookCount,
          isAudio: false
        } : (order.isAudioChecked ? {
          name: order.title,
          count: null,
          copybookCount: null,
          isAudio: true
        } : {
          name: order.title,
          count: order.count,
          copybookCount: null,
          isAudio: false
        })))
      );
    });

    const dataToServer = {
      totalSum: contextValue.totalSum,
      orderData,
      formInputValueState,
    };

    try {
      const res = await fetch("https://renewal.org.ua/Server/index.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToServer),
      });
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const text = await res.text();
      if (text === "Success") {
        setFormInputValueState(formData.map(v => ({ ...v, value: "" })));
        setSelectedCity(null);
        setSelectedWarehouse(null);
        setCities([]);
        setWarehouses([]);
        setManualMode(false);
        setErrorMsg("");
        contextValue.setOrderList([]);
        contextValue.setTotalSum(null);
        contextValue.setCartCount(null);
        localStorage.clear();
        alert("Ваше замовлення успішно відправилося");
      } else {
        alert("Вибачте, сталася помилка! Ваше замовлення не відправилося!");
      }
    } catch (e) {
      console.error("Fetch error:", e);
      alert("Вибачте, сталася помилка! Ваше замовлення не відправилося!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="order-form">
      {/* 1) Ім'я */}
      <label>
        <span>{formData[0].labelName}</span>
        <input
          type="text"
          name={formData[0].inputName}
          value={formInputValueState[0].value}
          onChange={(e) => handleChange(e, 0)}
          required
        />
      </label>

      {/* 2) Телефон */}
      <label>
        <span>{formData[1].labelName}</span>
        <input
          type="text"
          name={formData[1].inputName}
          value={formInputValueState[1].value}
          onChange={(e) => handleChange(e, 1)}
          required
        />
      </label>

      {/* 3) Адреса */}
      <fieldset style={{ border: "1px solid #eee", padding: 12, borderRadius: 6 }}>
        <legend style={{ fontSize: 12, opacity: 0.8 }}>3. Адреса відправлення (НП)</legend>

        {!manualMode ? (
          <>
            {/* Пошук міста */}
            <label style={{ display: "block" }}>
              <span style={{ fontSize: 13, marginBottom: 4, display: "block" }}>Місто</span>
              <input
                type="text"
                placeholder="Почніть вводити..."
                value={cityQuery}
                onChange={(e) => {
                  const q = e.target.value;
                  setCityQuery(q);
                  setCitiesOpen(!!q);
                  if (debounceRef.current) clearTimeout(debounceRef.current);
                  debounceRef.current = setTimeout(() => fetchCities(q), 300);
                }}
                onFocus={() => setCitiesOpen(!!cityQuery)}
              />
            </label>

            {citiesOpen && cities.length > 0 && (
              <ul
                style={{
                  border: "1px solid #ddd",
                  borderRadius: 6,
                  maxHeight: 180,
                  overflowY: "auto",
                  marginTop: 6,
                }}
              >
                {cities.map((c) => (
                  <li
                    key={c.ref}
                    onClick={() => {
                      setSelectedCity(c);
                      setCityQuery(c.label);
                      setCitiesOpen(false);
                    }}
                    style={{ padding: "8px 10px", cursor: "pointer" }}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    {c.label} {c.region ? <em style={{ opacity: 0.6 }}>({c.region})</em> : null}
                  </li>
                ))}
              </ul>
            )}

            {/* Відділення */}
            {selectedCity && (
              <label style={{ display: "block", marginTop: 10 }}>
                <span style={{ fontSize: 13, marginBottom: 4, display: "block" }}>Відділення</span>
                <select
                  value={selectedWarehouse?.value || ""}
                  onChange={(e) => {
                    const val = e.target.value;
                    const optionText =
                      e.target.selectedOptions?.[0]?.text ||
                      e.target.options[e.target.selectedIndex].text ||
                      "";
                    const wh = warehouses.find((w) => w.value === val) || null;
                    setSelectedWarehouse(wh);
                    setAddressValue(combineCityAndOption(selectedCity, optionText));
                  }}
                  style={{ width: "100%" }}
                >
                  <option value="">Оберіть відділення…</option>
                  {warehouses.map((w) => (
                    <option key={w.value} value={w.value}>
                      {w.label}{w.isPostomat ? " (Поштомат)" : ""}
                    </option>
                  ))}
                </select>
              </label>
            )}

            {/* Підсумкова адреса */}
            <label style={{ display: "block", marginTop: 10 }}>
              <span style={{ fontSize: 13, marginBottom: 4, display: "block" }}>Підсумкова адреса</span>
              <input
                type="text"
                name="address"
                value={formInputValueState[2].value}
                readOnly
                placeholder="Автоматично після вибору міста та відділення"
              />
            </label>

            <button
              type="button"
              onClick={() => {
                setManualMode(true);
                setAddressValue("");
              }}
              style={{ marginTop: 10 }}
            >
              Ввести адресу вручну
            </button>
          </>
        ) : (
          <>
            <label style={{ display: "block" }}>
              <span style={{ fontSize: 13, marginBottom: 4, display: "block" }}>
                Введіть адресу вручну
              </span>
              <input
                type="text"
                name="address"
                value={formInputValueState[2].value}
                onChange={(e) => setAddressValue(e.target.value)}
                placeholder="Наприклад: Київ, Відділення №12, вул. ..."
              />
            </label>

            <button
              type="button"
              onClick={() => {
                setManualMode(false);
                setAddressValue("");
              }}
              style={{ marginTop: 10 }}
            >
              Повернутись до автопошуку
            </button>
          </>
        )}
      </fieldset>

      {/* 4) Коментар */}
      <label>
        <span>{formData[3].labelName}</span>
        <input
          type="text"
          name={formData[3].inputName}
          value={formInputValueState[3].value}
          onChange={(e) => handleChange(e, 3)}
        />
      </label>

      <button className={activeOrderButton ? "active" : ""} disabled={activeOrderButton} type="submit">
        відправити замовлення
      </button>
    </form>
  );
};

export default OrderForm;




















// import React, { useState, useContext, useRef, useEffect } from "react";
// import Context from "../../../../../Context";
// import { RotatingLines } from 'react-loader-spinner';

// const OrderForm = () => {
//     const contextValue = useContext(Context);
//     const [activeOrderButton, setActiveOrderButton] = useState(false);
//     const [waitingResponse, setWaitingResponse] = useState(false);
//     const [pay, setPay] = useState(null);
//     //const [data, setData] = useState('');
//     //const [signature, setSignature] = useState('');
//     const payForm = useRef(null);
//     const payButton = useRef(null);
//     const formData = [
//         {
//             labelName: '1. Ваше прізвище та ім\'я',
//             inputName: 'name',
//             isRequired: true
//         },
//         {
//             labelName: '2. Номер телефону',
//             inputName: 'phone',
//             isRequired: true
//         },
//         {
//             labelName: '3. Адреса відправлення (НП)',
//             inputName: 'address',
//             isRequired: false
//         },
//         {
//             labelName: '4. Коментар до замовлення (не обов\'язково)',
//             inputName: 'comment',
//             isRequired: false
//         }
//     ];
//     const [formInputValueState, setFormInputValueState] = useState(formData.map((v) => {
//         return {
//             name: v.inputName,
//             value: ''
//         };
//     }));

//     const handleChange = (event, index) => {
//         setFormInputValueState((prevState) => {
//             return prevState.map((state, i) => {
//                 return i === index ? {...state, value: event.target.value} : state;
//             })
//         });
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         if(contextValue.orderList.length === 0){
//             alert("Ви маєте замовити хоча б одну книгу для того, щоб відправити замовлення");
//             setFormInputValueState(formData.map((v) => {
//                 return {
//                     ...v,
//                     value: ''
//                 };
//             }));
//             return;
//         }
//         //setActiveOrderButton(true);
//         //setWaitingResponse(true);
//         if(contextValue.totalSum){
//             const orderData = contextValue.orderList.map((order) => {
//                 return (
//                     (order.isCopybookChecked && order.isBookChecked) ? {
//                         name: order.title,
//                         count: order.count,
//                         copybookCount: order.copybookCount,
//                         isAudio: false
//                     } : ((order.isAudioChecked && order.isBookChecked) ? {
//                         name: order.title,
//                         count: order.count,
//                         copybookCount: order.copybookCount,
//                         isAudio: true
//                     } : (order.isCopybookChecked ? {
//                         name: order.title,
//                         count: null,
//                         copybookCount: order.copybookCount,
//                         isAudio: false
//                     } : (order.isAudioChecked ? {
//                         name: order.title,
//                         count: null,
//                         copybookCount: null,
//                         isAudio: true
//                     } : {
//                         name: order.title,
//                         count: order.count,
//                         copybookCount: null,
//                         isAudio: false
//                     })))
//                 );
//             });

//             const dataToServer = {
//                 totalSum: contextValue.totalSum,
//                 orderData: orderData,
//                 formInputValueState: formInputValueState
//             };

//             // console.log(JSON.stringify(dataToServer));
//             // return;

//             //const serverPath = "http://renewal/index.php";
//             const serverPath = "https://renewal.org.ua/Server/index.php";
//             fetch(serverPath, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(dataToServer),
//             })
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! Status: ${response.status}`);
//                 }
//                 //return response.json();
//                 return response.text();
//             })
//             .then(response => {
//                 //setWaitingResponse(false);
//                 //setActiveOrderButton(false);
//                 //setPay(response.paymentUrl);
//                 if(response === "Success"){
//                     setFormInputValueState(formData.map((v) => {
//                         return {
//                             ...v,
//                             value: ''
//                         }
//                     }));
//                     contextValue.setOrderList([]);
//                     contextValue.setTotalSum(null);
//                     contextValue.setCartCount(null);
//                     localStorage.clear();
//                     alert("Ваше замовлення успішно відправилося");
//                 }
//                 else{
//                     alert("Вибачте, сталася помилка! Ваше замовлення не відправилося!");
//                 }
//             })
//             .catch(error => {
//                 console.error('Fetch error:', error);
//                 alert("Вибачте, сталася помилка! Ваше замовлення не відправилося!");
//             });
//         }
//     };

//     // useEffect(() => {
//     //     const inputNameData = document.querySelectorAll('input[name="data"]');
//     //     const inputNameSignature = document.querySelectorAll('input[name="signature"]');
//     //     if(inputNameData && inputNameSignature) {
//     //         if(inputNameData[1] && inputNameSignature[1]){
//     //             contextValue.setLiqpayData(inputNameData[1].value);
//     //             contextValue.setLiqpaySignature(inputNameSignature[1].value);
//     //         }
//     //     }
//     // }, [pay]);

//     return (
//         <>
//         <form onSubmit={handleSubmit} className="order-form">
//             {
//                 formData.map((value, index) => {
//                     return (
//                         <label key={index}>
//                             <span>{value.labelName}</span>
//                             <input
//                                 type="text"
//                                 name={value.inputName}
//                                 value={formInputValueState[index].value}
//                                 onChange={(event) => handleChange(event, index)}
//                                 required={value.isRequired}
//                             />
//                         </label>
//                     );
//                 })
//             }
//             <button className={activeOrderButton ? 'active' : ''} disabled={activeOrderButton} type="submit">відправити замовлення</button>
//         </form>
//         {/* {
//             (pay == null && !waitingResponse) ? (
//                 null
//             )
//             :
//             (
//                 (pay == null && waitingResponse) ? (
//                     <div className="pay-loader">
//                         <RotatingLines
//                             visible={true}
//                             height="76"
//                             width="76"
//                             color="#c2c2c2"
//                             strokeColor="#aaa"
//                             strokeWidth="5"
//                             animationDuration="0.75"
//                             ariaLabel="rotating-lines-loading"
//                             wrapperStyle={{}}
//                             wrapperClass=""
//                         />
//                     </div>
//                 )
//                 :
//                 (
//                     <form ref={payButton} method="POST" action="https://www.liqpay.ua/api/3/checkout" acceptCharset="utf-8">
//                         <input type="hidden" name="data" value={contextValue.liqpayData}/>
//                         <input type="hidden" name="signature" value={contextValue.liqpaySignature}/>
//                         <input type={(contextValue.liqpayData === '' && contextValue.liqpaySignature === '') ? "hidden" : "image"} src="//static.liqpay.ua/buttons/payUk.png" alt="pay-button"/>
//                     </form>
//                 )
//             )
//         }
//         <div ref={payForm} dangerouslySetInnerHTML={{ __html: pay }} style={{display: 'none'}} /> */}
//         </>
//     );
// }

// export default OrderForm;