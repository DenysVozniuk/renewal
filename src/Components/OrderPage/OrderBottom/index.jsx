import React, { useContext } from "react";
import Context from "../../../Context";
import OrderCard from "./components/OrderCard";

const OrderBottom = (props) => {
    const { cardsRef } = props;
    const contextValue = useContext(Context);

    const clearCart = () => {
        let confirmDelete = confirm("Ви впевнені, що хочете очистити кошик?");
        if(confirmDelete){
            contextValue.setOrderList([]);
            contextValue.setTotalSum(null);
            contextValue.setCartCount(null);
            localStorage.clear();
        }
    }
    
    return (
        <div ref={cardsRef} className="order-cards">
            {
                contextValue.orderList && (
                    contextValue.orderList.map((order) => {
                        return (
                            <OrderCard
                                key={order.id}
                                id={order.id}
                                currentOrder={order}
                                orderList={contextValue.orderList}
                                setOrderList={contextValue.setOrderList}
                                setTotalSum={contextValue.setTotalSum}
                                setCartCount={contextValue.setCartCount}
                            />
                        )
                    })
                )
            }
            
            {contextValue.totalSum && (<div className="order-total-sum"><p>Загальна сума: {contextValue.totalSum} грн</p></div>)}

            {
                (
                    localStorage.getItem('orderList') !== null ||
                    localStorage.getItem('totalSum') !== null || 
                    localStorage.getItem('cartCount') !== null
                ) && (
                    <button className="order-clear-cart-btn" onClick={clearCart}>Очистити кошик</button>
                )
            }
        </div>
    );
}

export default OrderBottom;