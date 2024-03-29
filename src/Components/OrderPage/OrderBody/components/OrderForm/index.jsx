import React, { useState, useContext } from "react";
import Context from "../../../../../Context";

const OrderForm = () => {
    const contextValue = useContext(Context);
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
            isRequired: true
        },
        {
            labelName: '4. Коментар до замовлення',
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
    
            //const serverPath = "http://department-osvitu";
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
                return response.text();
            })
            .then(response => {
                console.log(response);
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
                else {
                    alert("Вибачте, сталася помилка! Ваше замовлення не відправилося!");
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
                alert("Вибачте, сталася помилка! Ваше замовлення не відправилося!");
            });
        }
    };

    return (
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
            <button type="submit">відправити замовлення</button>
        </form>
    );
}

export default OrderForm;