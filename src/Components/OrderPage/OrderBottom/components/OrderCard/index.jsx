import React, {useState, useRef, useEffect} from "react";
import useOrdersTotalSum from "../../../../../Hooks/useOrdersTotalSum";
import { bookSvg, audioSvg, UkraineSvg } from "../../../../../img/Books";

const OrderCard = (props) => {
    const { id, currentOrder, orderList, setOrderList, setTotalSum, setCartCount } = props;
    const [bookPriceChecked, setBookPriceChecked] = useState(currentOrder.isBookChecked);
    const [copybookPriceChecked, setCopybookPriceChecked] = useState(currentOrder.isCopybookChecked);
    const [audioPriceChecked, setAudioPriceChecked] = useState(currentOrder.isAudioChecked);
    const [orderCardCountMarginBottom, setOrderCardCountMarginBottom] = useState(0);
    const bookPriceInput = useRef(null);
    const copybookPriceInput = useRef(null);
    const audioPriceInput = useRef(null);
    const { calculateTotalSum } = useOrdersTotalSum();

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width >= 744) {
                setOrderCardCountMarginBottom(10);
            } else if (width >= 355){
                setOrderCardCountMarginBottom(7);
            }
            else {
                setOrderCardCountMarginBottom(18);
            }
        };
    
        window.addEventListener('resize', handleResize);
    
        handleResize();
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
    }, []);


    const handlerChangeCheckboxState = (state, setState, ref) => {
        if(currentOrder.copybookPrice){
            if(ref === bookPriceInput && bookPriceChecked && !copybookPriceChecked) return;
            if(ref === copybookPriceInput && copybookPriceChecked && !bookPriceChecked) return;
        }
        if(currentOrder.audioPrice){
            if(ref === bookPriceInput && bookPriceChecked && !audioPriceChecked) return;
            if(ref === audioPriceInput && audioPriceChecked && !bookPriceChecked) return;
        }

        let newTotalSum = 0;
        const newOrderList = orderList.map((order) => {
            if(order.id === id){
                if(ref === bookPriceInput){
                    if(!bookPriceChecked){
                        newTotalSum = calculateTotalSum(order, newTotalSum, order.count, order.copybookCount);
                        newTotalSum += order.bookPrice * order.count;
                    }
                    else {
                        newTotalSum = calculateTotalSum(order, newTotalSum, order.count, order.copybookCount);
                        newTotalSum -= order.bookPrice * order.count;
                    }
                    return {...order, isBookChecked: !state};
                }
                else if(ref === copybookPriceInput){
                    if(!copybookPriceChecked){
                        newTotalSum = calculateTotalSum(order, newTotalSum, order.count, order.copybookCount);
                        newTotalSum += order.copybookPrice * order.copybookCount;
                    }
                    else {
                        newTotalSum = calculateTotalSum(order, newTotalSum, order.count, order.copybookCount);
                        newTotalSum -= order.copybookPrice * order.copybookCount;
                    }
                    return {...order, isCopybookChecked: !state};
                }
                else if(ref === audioPriceInput){
                    if(!audioPriceChecked){
                        newTotalSum = calculateTotalSum(order, newTotalSum, order.count, order.copybookCount);
                        newTotalSum += order.audioPrice;
                    }
                    else {
                        newTotalSum = calculateTotalSum(order, newTotalSum, order.count, order.copybookCount);
                        newTotalSum -= order.audioPrice;
                    }
                    return {...order, isAudioChecked: !state};
                }
                else {
                    return order;
                }
            }
            else {
                newTotalSum = calculateTotalSum(order, newTotalSum, order.count, order.copybookCount);
                return order;
            }
        });
        setState(!state);
        setTotalSum(newTotalSum);
        setOrderList(newOrderList);
        localStorage.setItem('orderList', JSON.stringify(newOrderList));
        localStorage.setItem('totalSum', JSON.stringify(newTotalSum));
    };

    const handlerDeleteOrder = (orderId) => {
        let confirmDelete = confirm("Ви впевнені, що хочете видалити це замовлення");
        const cartCount = JSON.parse(localStorage.getItem('cartCount'));
        if(confirmDelete){
            let newTotalSum = 0;
            const newOrderList = orderList.filter((order) => {
                if(order.id !== orderId){
                    newTotalSum = calculateTotalSum(order, newTotalSum, order.count, order.copybookCount);
                    return true;
                }
                else{
                    return false;
                }
            });
            setOrderList(newOrderList);
            if(newOrderList.length > 0){
                setTotalSum(newTotalSum);
                setCartCount(cartCount - 1);
                localStorage.setItem('orderList', JSON.stringify(newOrderList));
                localStorage.setItem('totalSum', JSON.stringify(newTotalSum));
                localStorage.setItem('cartCount', JSON.stringify(cartCount - 1));
            }
            else {
                localStorage.clear();
                setTotalSum(null);
                setCartCount(null);
            }
        }
    }

    const handlerChangeCount = (currentCount, countNumberChange, type) => {
        if((currentCount + countNumberChange) < 1) return;
        let newTotalSum = 0;
        const newOrderList = orderList.map((order) => {
            if(order.id === id){
                if (type === 'copybook'){
                    const newCount = order.copybookCount + countNumberChange;
                    newTotalSum = calculateTotalSum(order, newTotalSum, order.count, newCount);
                    return {...order, copybookCount: newCount};
                }
                else {
                    const newCount = order.count + countNumberChange;
                    newTotalSum = calculateTotalSum(order, newTotalSum, newCount, order.copybookCount);
                    return {...order, count: newCount};    
                }
            }
            else {
                newTotalSum = calculateTotalSum(order, newTotalSum, order.count, order.copybookCount);
                return order;
            }
        });
        setOrderList(newOrderList);
        setTotalSum(newTotalSum);
        localStorage.setItem('orderList', JSON.stringify(newOrderList));
        localStorage.setItem('totalSum', JSON.stringify(newTotalSum));
    };

    return (
        <div className="order-card">
            <div className="order-card-img-container">
                <img src={currentOrder.image} alt={`order-book-${id}`} />
            </div>
            <div className="order-card-content">
                <h2>{currentOrder.title}</h2>
                <div className="order-card-checkboxes">
                    {
                        currentOrder.copybookPrice ? (
                            <>
                                <div id="order-card-checkbox-1" className="order-card-checkbox">
                                    <input
                                        ref={bookPriceInput}
                                        type="checkbox"
                                        checked={bookPriceChecked}
                                        onChange={() => handlerChangeCheckboxState(bookPriceChecked, setBookPriceChecked, bookPriceInput)}
                                    />
                                    <label><span>посібник - {currentOrder.bookPrice} грн</span></label>
                                </div>
                                <div id="order-card-checkbox-2" className="order-card-checkbox">
                                    <input
                                        ref={copybookPriceInput}
                                        type="checkbox"
                                        checked={copybookPriceChecked}
                                        onChange={() => handlerChangeCheckboxState(copybookPriceChecked, setCopybookPriceChecked, copybookPriceInput)}
                                    />
                                    <label><span>зошит - {currentOrder.copybookPrice} грн</span></label>
                                </div>
                            </>
                        ) : (currentOrder.audioPrice ? (
                            <>
                                <div id="order-card-checkbox-audio-1" className="order-card-checkbox">
                                    <input
                                        ref={bookPriceInput}
                                        type="checkbox"
                                        checked={bookPriceChecked}
                                        onChange={() => handlerChangeCheckboxState(bookPriceChecked, setBookPriceChecked, bookPriceInput)}
                                    />
                                    <label>{bookSvg}<span>{currentOrder.bookPrice} грн</span></label>
                                </div>
                                <div id="order-card-checkbox-audio-2" className="order-card-checkbox">
                                    <input
                                        ref={audioPriceInput}
                                        type="checkbox"
                                        checked={audioPriceChecked}
                                        onChange={() => handlerChangeCheckboxState(audioPriceChecked, setAudioPriceChecked, audioPriceInput)}
                                    />
                                    <label>{UkraineSvg}{audioSvg}<span>{currentOrder.audioPrice} грн</span></label>
                                </div>
                            </>
                        ) : (
                            <div className="order-card-checkbox">
                                {bookSvg}<span>{currentOrder.bookPrice} грн</span>
                            </div>
                        ))
                    }
                </div>
                <button className="order-delete-btn" onClick={() => handlerDeleteOrder(id)} translate="no">видалити замовлення</button>
            </div>
            <div className="order-card-counts">
                <div className="order-card-count order-card-count-1" style={currentOrder.copybookPrice ? {marginBottom: `${orderCardCountMarginBottom}px`} : {}}>
                    <div className="order-minus-container" onClick={() => handlerChangeCount(currentOrder.count, -1, 'book')}>
                        <span className="order-minus">-</span>
                    </div>
                    <div className="order-count">{currentOrder.count}</div>
                    <div className="order-plus-container" onClick={() => handlerChangeCount(currentOrder.count, 1, 'book')}>
                        <span className="order-plus">+</span>
                    </div>
                </div>
                {
                    currentOrder.copybookPrice && (
                        <div className="order-card-count order-card-count-2">
                            <div className="order-minus-container" onClick={() => handlerChangeCount(currentOrder.copybookCount, -1, 'copybook')}>
                                <span className="order-minus">-</span>
                            </div>
                            <div className="order-count">{currentOrder.copybookCount}</div>
                            <div className="order-plus-container" onClick={() => handlerChangeCount(currentOrder.copybookCount, 1, 'copybook')}>
                                <span className="order-plus">+</span>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default OrderCard;