import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import OrderBody from "./OrderBody";
import OrderBottom from "./OrderBottom";

const OrderPage = () => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);
    return (
        <div className="container order-page-container">
            <h1>Замовлення книг</h1>
            <p className="order-page-head-content">Ваше замовлення — це добровільне пожертвування на розвиток освітньої діяльності</p>
            <OrderBottom />
            <OrderBody />
        </div>
    );
}

export default OrderPage;