import React, {useState, useLayoutEffect, useRef, useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import Context from "../../../../../../Context";
import { bookSvg, audioSvg, UkraineSvg } from "../../../../../../img/Books";
import ResizeObserver from 'resize-observer-polyfill';
import CollapsibleButton from "../../../../../CollapsibleButton";
import useOrdersTotalSum from "../../../../../../Hooks/useOrdersTotalSum";
import useCollapsibleButtons from "../../../../../../Hooks/useCollapsibleButtons";
import useCollapseButtonClick from "../../../../../../Hooks/useCollapseButtonClick";


const Book = (props) => {
    const { currentIndex, currentContentIndex, card, setCollapsibleText, activeStates, setActiveStates, setCollapsibleContentCard } = props;
    const contextValue = useContext(Context);
    const cardRef = useRef(null);
    const bookCardInfoRef = useRef(null);
    const bookCardPriceRef = useRef(null);
    const [heightHr, setHeightHr] = useState(0);
    const [bookCardInfoVerticalPadding, setBookCardInfoVerticalPadding] = useState(0);
    const [marginLeftHr, setMarginLeftHr] = useState(0);
    const [additionalMarginsForHr, setAdditionalMarginsForHr] = useState(0);
    const { calculateTotalSum } = useOrdersTotalSum();
    const [marginRightBookPrice, setMarginRightBookPrice] = useState(0);

    const [distance, setDistance] = useState(1);
    const currentButton = useRef(null);
    const { toggleCollapsibleButton } = useCollapsibleButtons(activeStates, setActiveStates, setCollapsibleText, setCollapsibleContentCard);
    const { handlerCollapseButtonClick } = useCollapseButtonClick(currentButton.current, cardRef.current, setDistance);



    useLayoutEffect(() => {
        const observeElement = (element, setSize, option) => {
          const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                if(option === 'height'){
                    setSize(Math.ceil(bookCardInfoVerticalPadding + entry.contentRect.height));
                }
                else if(option === 'width'){
                    setSize(Math.ceil(additionalMarginsForHr + entry.contentRect.width));
                }
            }
        });
    
        if (element.current) {
            resizeObserver.observe(element.current);
        }
    
        return () => {
            if (element.current) {
              resizeObserver.unobserve(element.current);
            }
          };
        };
    
        const cleanup1 = observeElement(bookCardInfoRef, setHeightHr, 'height');
        const cleanup2 = observeElement(bookCardPriceRef, setMarginLeftHr, 'width');
    
        return () => {
          cleanup1();
          cleanup2();
        };
    }, [bookCardInfoVerticalPadding]);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width >= 1025) {
                setMarginRightBookPrice(25);
                setBookCardInfoVerticalPadding(30);
                setAdditionalMarginsForHr(27);
            } else {
                setMarginRightBookPrice(20);
                setBookCardInfoVerticalPadding(20);
                setAdditionalMarginsForHr(17)
            }
        };
    
        window.addEventListener('resize', handleResize);
    
        handleResize();
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handlerAddOrderToCart = () => {
        const orderList = JSON.parse(localStorage.getItem('orderList')) || [];
        const cartCount = JSON.parse(localStorage.getItem('cartCount')) || null;
        let isInOrderList = false;
        for (let i = 0; i < orderList.length; i++){
            orderList[i].id === card.id && (isInOrderList = true);
            if(isInOrderList) break;
        }
        let newOrderList = [];
        let totalSum = 0;
        if(isInOrderList) {
            newOrderList = orderList.map((order) => {
                if(order.id === card.id){
                    const newBookCount = order.count + 1;
                    totalSum = calculateTotalSum(order, totalSum, newBookCount, order.copybookCount);
                    return {...order, count: newBookCount};
                }
                else {
                    totalSum = calculateTotalSum(order, totalSum, order.count, order.copybookCount);
                    return order;
                }
            });
        }
        else {
            newOrderList = orderList.map((order) => {
                totalSum = calculateTotalSum(order, totalSum, order.count, order.copybookCount);
                return order;
            });
            newOrderList.push({
                id: card.id,
                count: 1,
                copybookCount: 1,
                image: card.image,
                title: card.title,
                bookPrice: card.bookPrice,
                copybookPrice: card.copybookPrice ? card.copybookPrice : null,
                audioPrice: card.audioPrice ? card.audioPrice : null,
                isBookChecked: true,
                isCopybookChecked: false,
                isAudioChecked: false
            });
            if(cartCount === null){
                contextValue.setCartCount(1);
                localStorage.setItem('cartCount', JSON.stringify(1));
            }
            else {
                contextValue.setCartCount(cartCount + 1);
                localStorage.setItem('cartCount', JSON.stringify(cartCount + 1));
            }
            totalSum += card.bookPrice;
        }
        contextValue.setOrderList(newOrderList);
        contextValue.setTotalSum(totalSum);
        localStorage.setItem('orderList', JSON.stringify(newOrderList));
        localStorage.setItem('totalSum', JSON.stringify(totalSum));
    }

    return (
        <div ref={cardRef} className="book-card">
            <div className="d-flex flex-column justify-space-between align-items-center flex-1">
                <div
                    className="book-card-img-container"
                    onClick={() => handlerCollapseButtonClick(toggleCollapsibleButton, activeStates[currentIndex].activeState, card.collapsibleContent, currentIndex, 2, currentContentIndex, card)}
                >
                    <img className="book-card-img" src={card.image} alt="book" />
                </div>
                <h3 className="book-card-text">{card.title}</h3>
                <div ref={bookCardInfoRef} className="book-card-info">
                    {
                        card.audioPrice ? (
                            <>
                                <div ref={bookCardPriceRef} className="book-card-price" style={{marginRight: marginRightBookPrice}}>
                                    {bookSvg}
                                    <p className="book-card-text">{card.bookPrice} грн</p>
                                </div>
                                <hr style={{width: "1px", height: `${heightHr}px`, backgroundColor: "#D9D9D9", position: 'absolute', top: 0, left: `${marginLeftHr}px`}}/>
                                <div className="audio-book-card-price">
                                    {audioSvg}
                                    {UkraineSvg}
                                    <p className="book-card-text">{card.audioPrice} грн</p>
                                </div>
                            </>
                        )
                        :
                        (
                            <div ref={bookCardPriceRef} className="book-card-price">
                                {bookSvg}
                                {
                                    card.copybookPrice ? (
                                        <p className="book-card-text">{card.bookPrice} грн / {card.copybookPrice} грн (зошит)</p>
                                    ) : (
                                        <p className="book-card-text">{card.bookPrice} грн</p>
                                    )
                                }
                                
                            </div>
                        )
                    }
                    
                </div>
            </div>
            <div className="book-card-buy-buttons">
                <button className="book-card-buy-button book-card-buy-button-1 book-card-text" onClick={() => handlerAddOrderToCart()}>До кошика</button>
                <Link to="/order" className="book-card-buy-button book-card-buy-button-2 book-card-text" onClick={() => handlerAddOrderToCart()}>Замовити</Link>
            </div>
            <div className="book-card-details-button">
                <p
                    style={{color: '#9A9A9A', cursor: 'pointer'}}
                    className="book-card-text"
                    onClick={() => handlerCollapseButtonClick(toggleCollapsibleButton, activeStates[currentIndex].activeState, card.collapsibleContent, currentIndex, 2, currentContentIndex, card)}
                >
                    Детальніше
                </p>
                <CollapsibleButton
                    currentIndex={currentIndex}
                    currentContentIndex={currentContentIndex}
                    currentActiveState={activeStates[currentIndex].activeState}
                    currentButton={currentButton}
                    activeStates={activeStates}
                    setActiveStates={setActiveStates}
                    deepStatesArray={2}
                    setCollapsibleText={setCollapsibleText}
                    text={card.collapsibleContent}
                    card={cardRef.current}
                    setCollapsibleContentCard={setCollapsibleContentCard}
                    cardInfo={card}
                    additionalClass={'book-collapsible-btn'}
                    distanceFromAbove={distance}
                    setDistanceFromAbove={setDistance}
                />
            </div>
        </div>
    );
}

export default Book;