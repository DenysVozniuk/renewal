import React, { useState, useContext, useRef, useEffect } from "react";
import Context from "../../../../../Context";
import { RotatingLines } from 'react-loader-spinner';

const OrderForm = () => {
    const contextValue = useContext(Context);
    const [activeOrderButton, setActiveOrderButton] = useState(false);
    const [waitingResponse, setWaitingResponse] = useState(false);
    const [pay, setPay] = useState(null);
    //const [data, setData] = useState('');
    //const [signature, setSignature] = useState('');
    const payForm = useRef(null);
    const payButton = useRef(null);
    const formData = [
        {
            labelName: '1. Ваше прізвище та ім\'я',
            inputName: 'name',
            isRequired: true
        },
        {
            labelName: '2. Номер телефону',
            inputName: 'phone',
            isRequired: true
        },
        {
            labelName: '3. Адреса відправлення (НП)',
            inputName: 'address',
            isRequired: false
        },
        {
            labelName: '4. Коментар до замовлення (не обов\'язково)',
            inputName: 'comment',
            isRequired: false
        }
    ];
    const [formInputValueState, setFormInputValueState] = useState(formData.map((v) => {
        return {
            name: v.inputName,
            value: ''
        };
    }));

    const handleChange = (event, index) => {
        setFormInputValueState((prevState) => {
            return prevState.map((state, i) => {
                return i === index ? {...state, value: event.target.value} : state;
            })
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(contextValue.orderList.length === 0){
            alert("Ви маєте замовити хоча б одну книгу для того, щоб відправити замовлення");
            setFormInputValueState(formData.map((v) => {
                return {
                    ...v,
                    value: ''
                };
            }));
            return;
        }
        //setActiveOrderButton(true);
        //setWaitingResponse(true);
        if(contextValue.totalSum){
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
                orderData: orderData,
                formInputValueState: formInputValueState
            };

            // console.log(JSON.stringify(dataToServer));
            // return;
    
            //const serverPath = "http://renewal/index.php";
            const serverPath = "https://renewal.org.ua/Server/index.php";
            fetch(serverPath, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToServer),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                //return response.json();
                return response.text();
            })
            .then(response => {
                //setWaitingResponse(false);
                //setActiveOrderButton(false);
                //setPay(response.paymentUrl);
                if(response === "Success"){
                    setFormInputValueState(formData.map((v) => {
                        return {
                            ...v,
                            value: ''
                        }
                    }));
                    contextValue.setOrderList([]);
                    contextValue.setTotalSum(null);
                    contextValue.setCartCount(null);
                    localStorage.clear();
                    alert("Ваше замовлення успішно відправилося");
                }
                else{
                    alert("Вибачте, сталася помилка! Ваше замовлення не відправилося!");
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
                alert("Вибачте, сталася помилка! Ваше замовлення не відправилося!");
            });
        }
    };

    // useEffect(() => {
    //     const inputNameData = document.querySelectorAll('input[name="data"]');
    //     const inputNameSignature = document.querySelectorAll('input[name="signature"]');
    //     if(inputNameData && inputNameSignature) {
    //         if(inputNameData[1] && inputNameSignature[1]){
    //             contextValue.setLiqpayData(inputNameData[1].value);
    //             contextValue.setLiqpaySignature(inputNameSignature[1].value);
    //         }
    //     }
    // }, [pay]);

    return (
        <>
        <form onSubmit={handleSubmit} className="order-form">
            {
                formData.map((value, index) => {
                    return (
                        <label key={index}>
                            <span>{value.labelName}</span>
                            <input
                                type="text"
                                name={value.inputName}
                                value={formInputValueState[index].value}
                                onChange={(event) => handleChange(event, index)}
                                required={value.isRequired}
                            />
                        </label>
                    );
                })
            }
            <button className={activeOrderButton ? 'active' : ''} disabled={activeOrderButton} type="submit">відправити замовлення</button>
        </form>
        {/* {
            (pay == null && !waitingResponse) ? (
                null
            )
            :
            (
                (pay == null && waitingResponse) ? (
                    <div className="pay-loader">
                        <RotatingLines 
                            visible={true}
                            height="76"
                            width="76"
                            color="#c2c2c2"
                            strokeColor="#aaa"
                            strokeWidth="5"
                            animationDuration="0.75"
                            ariaLabel="rotating-lines-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                        />
                    </div>
                )
                :
                (
                    <form ref={payButton} method="POST" action="https://www.liqpay.ua/api/3/checkout" acceptCharset="utf-8">
                        <input type="hidden" name="data" value={contextValue.liqpayData}/>
                        <input type="hidden" name="signature" value={contextValue.liqpaySignature}/>
                        <input type={(contextValue.liqpayData === '' && contextValue.liqpaySignature === '') ? "hidden" : "image"} src="//static.liqpay.ua/buttons/payUk.png" alt="pay-button"/>
                    </form>
                )
            )
        }
        <div ref={payForm} dangerouslySetInnerHTML={{ __html: pay }} style={{display: 'none'}} /> */}
        </>
    );
}

export default OrderForm;