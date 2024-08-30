import React, { useState, useEffect, useRef, useContext } from "react";
import Context from "../../Context";
import { useLocation, Link } from "react-router-dom";
import OrderBody from "./OrderBody";
import OrderBottom from "./OrderBottom";

const OrderPage = () => {
    const location = useLocation();
    const contextValue = useContext(Context);
    const [top, setTop] = useState(0);
    const [right, setRight] = useState('0');
    const orderCards = useRef(null);
    const h1ContainerRef = useRef(null);
    const headContentContainerRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width >= 1025) {
                setTop(395);
                setRight('35px');
            } else if (width >= 744) {
                setTop(294);
                setRight('35px');
            }
            else {
                if(orderCards && h1ContainerRef && headContentContainerRef){
                    setTop(128 + h1ContainerRef.current.clientHeight + headContentContainerRef.current.clientHeight + orderCards.current.clientHeight + 20);
                    setRight('calc((100% - 124.34px) / 2)');
                }
            }
        };
    
        window.addEventListener('resize', handleResize);
    
        handleResize();
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, [contextValue.orderList]);

    return (
        <>
            {/* <Link to="/" className="return-to-main-page order-return-to-main-page" style={{top: `${top}px`, right: right}}>На головну</Link> */}
            <div className="container order-page-container">
                <div ref={h1ContainerRef} className="d-flex justify-center">
                    <h1>Замовлення книг</h1>
                </div>
                <div ref={headContentContainerRef} className="d-flex flex-column align-items-center">
                    <p className="order-page-head-content">Ваше замовлення — це пожертва на розвиток нових освітніх проєктів</p>
                    {/* <Link to="/agreement" className="agreement-page-href">Переглянути умови публічного договору</Link> */}
                </div>
                <OrderBottom cardsRef={orderCards} />
                <OrderBody />
                <p style={{textAlign: 'center', fontWeight: 600}}>Якщо у вас виникають питання, звертайтеся за номером: (067)&nbsp;747&nbsp;13&nbsp;72</p>
            </div>
        </>
    );
}

export default OrderPage;