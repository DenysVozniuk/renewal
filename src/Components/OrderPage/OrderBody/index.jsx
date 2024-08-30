import React from "react";
import OrderForm from "./components/OrderForm";

const OrderBody = () => {
    return (
        <div className="order-body">
            <h2>Оформлення замовлення</h2>
            <div className="order-form-body">
                <div className="order-form-background"></div>
                <div className="order-form-container">
                    <OrderForm />
                </div>
            </div>
        </div>
    );
}

export default OrderBody;