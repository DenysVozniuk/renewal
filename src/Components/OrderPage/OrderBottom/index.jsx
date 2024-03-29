import React, { useContext } from "react";
import Context from "../../../Context";
import OrderCard from "./components/OrderCard";

const OrderBottom = () => {
    const contextValue = useContext(Context);
    
    return (
        <div className="order-cards">
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
        </div>
    );
}

export default OrderBottom;