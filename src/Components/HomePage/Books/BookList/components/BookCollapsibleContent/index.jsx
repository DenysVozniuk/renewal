import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import ResizeObserver from 'resize-observer-polyfill';
import { bookSvg, audioSvg, UkraineSvg } from "../../../../../../img/Books";

const BookCollapsibleContent = (props) => {
    const { index, height, setHeight, collapsibleContent, collapsibleContents, collapsibleText, activeStates, card } = props;
    const bookCardInfoRef = useRef(null);
    const bookCardInfoText1Ref = useRef(null);
    const bookCardInfoText2Ref = useRef(null);
    const [heightHr, setHeightHr] = useState([0, 0]);
    const [marginLeftHr1, setMarginLeftHr1] = useState(0);
    const [marginLeftHr2, setMarginLeftHr2] = useState(0);
    const [isScreenWidthLess1025, setIsScreenWidthLess1025] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width >= 1025) {
                setIsScreenWidthLess1025(false);
            } else {
                setIsScreenWidthLess1025(true);
            }
        };
    
        window.addEventListener('resize', handleResize);
    
        handleResize();
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
    }, []);


    useEffect(() => {
        const observeElement = (element, setSize, option, index = 0, element2 = null) => {
            const resizeObserver = new ResizeObserver((entries) => {
                for (const entry of entries) {
                    if(option === 'height'){
                        const paddingTop = 13;
                        const paddingBottom = 13;
                        entry && (
                            setSize((prevState) => {
                                return prevState.map((v, i) => {
                                    if(i === index){
                                        return Math.ceil(paddingTop + entry.contentRect.height + paddingBottom);
                                    }
                                    return v;
                                })
                            })
                        )
                    }
                    else if(option === 'width'){
                        const paddingLeft = 20;
                        const marginBlockRight = 25;
                        if(element2 === null){
                            entry && (
                                setSize(Math.ceil(paddingLeft + entry.contentRect.width + ((marginBlockRight / 2) - 1)))
                            )
                        }
                        else {
                            if(bookCardInfoText1Ref.current){
                                setSize(Math.ceil(paddingLeft + bookCardInfoText1Ref.current.offsetWidth + marginBlockRight + entry.contentRect.width + ((marginBlockRight / 2) - 1)));
                            }
                        }
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
      
        const cleanup1 = observeElement(bookCardInfoRef, setHeightHr, 'height', 0);
        const cleanup2 = observeElement(bookCardInfoRef, setHeightHr, 'height', 1);
        const cleanup3 = observeElement(bookCardInfoText1Ref, setMarginLeftHr1, 'width');
        const cleanup4 = observeElement(bookCardInfoText2Ref, setMarginLeftHr2, 'width', 0, bookCardInfoText1Ref);
          
      
        return () => {
            cleanup1();
            cleanup2();
            cleanup3();
            cleanup4();
        };
    }, [isScreenWidthLess1025]);

    useEffect(() => {
        for(let i = 0; i < activeStates.length; i++){
            if(activeStates[i].activeState){
                if(collapsibleContent){
                    if(collapsibleContent.current === collapsibleContents.current[activeStates[i].contentPosition].current){
                        setHeight((val) => { 
                            return val.map((v, i) => {
                                if(i === index){
                                    return collapsibleContent.current.scrollHeight;
                                } 
                                return v;    
                            })
                        });
                        return;
                    }    
                }
            }
            else {
                setHeight((val) => { 
                    return val.map((v, i) => {
                        if(i === index){
                            return 0;
                        } 
                        return v;    
                    })
                })
            }
        }
    }, [activeStates])
    return (
        <div
            className="collapsible-content"
            index={index}
            style={{ maxHeight: height }}
            ref={collapsibleContent}
        >
            <div className="book-collapsible-content">
                {
                    isScreenWidthLess1025 ? (
                        <div className="book-card-info-container">
                            <div className="book-card-info">
                                <div className="book-card-info-text-1">
                                    {bookSvg}
                                    <p className="book-card-text book-card-collapsible-text">{card && card.collapsibleContent.collapsibleInfoText1}</p>
                                </div>
                            </div>
                            <div className="book-card-info">
                                <div className="book-card-info-text-2">
                                    <p className="book-card-text book-card-collapsible-text">{card && card.collapsibleContent.collapsibleInfoText2}</p>
                                </div>
                            </div>
                            {
                                card && (
                                    <>
                                        {
                                            card.collapsibleContent.collapsibleInfoText3 ? (
                                                <div className="book-card-info">
                                                    <div className="book-card-info-text-3">
                                                        {audioSvg}
                                                        {UkraineSvg}
                                                        <p className="book-card-text book-card-collapsible-text">{card.collapsibleContent.collapsibleInfoText3}</p>
                                                    </div>
                                                </div>
                                            )
                                            :
                                            null
                                        }
                                    </>
                                )
                            }
                        </div>
                    ) : (
                        <div ref={bookCardInfoRef} className="book-card-info">
                            <div ref={bookCardInfoText1Ref} className="book-card-info-text-1" style={card && {marginRight: '25px'}}>
                                {bookSvg}
                                <p className="book-card-text book-card-collapsible-text">{card && card.collapsibleContent.collapsibleInfoText1}</p>
                            </div>
                            <hr style={{width: "1px", height: `${heightHr[0]}px`, backgroundColor: "#D9D9D9", position: 'absolute', top: 0, left: `${marginLeftHr1}px`}}/>
                            <div ref={bookCardInfoText2Ref} className="book-card-info-text-2" style={card && (card.collapsibleContent.collapsibleInfoText3 ? {marginRight: '25px'} : null)}>
                                <p className="book-card-text book-card-collapsible-text">{card && card.collapsibleContent.collapsibleInfoText2}</p>
                            </div>
                            {
                                card 
                                &&
                                (card.collapsibleContent.collapsibleInfoText3
                                &&
                                <hr style={{width: "1px", height: `${heightHr[1]}px`, backgroundColor: "#D9D9D9", position: 'absolute', top: 0, left: `${marginLeftHr2}px`}}/>)
                            }
                            {
                                card && (
                                    <>
                                        {
                                            card.collapsibleContent.collapsibleInfoText3 ? (
                                                <>
                                                    <div className="book-card-info-text-3">
                                                        {audioSvg}
                                                        {UkraineSvg}
                                                        <p className="book-card-text book-card-collapsible-text">{card.collapsibleContent.collapsibleInfoText3}</p>
                                                    </div>
                                                </>
                                            )
                                            :
                                            null
                                        }
                                    </>
                                )
                            }
                        </div>    
                    )
                }
                {/* <div ref={bookCardInfoRef} className="book-card-info">
                    <div ref={bookCardInfoText1Ref} className="book-card-info-text-1" style={card && {marginRight: '25px'}}>
                        {bookSvg}
                        <p className="book-card-text book-card-collapsible-text">{card && card.collapsibleContent.collapsibleInfoText1}</p>
                    </div>
                    <hr style={{width: "1px", height: `${heightHr[0]}px`, backgroundColor: "#D9D9D9", position: 'absolute', top: 0, left: `${marginLeftHr1}px`}}/>
                    <div ref={bookCardInfoText2Ref} className="book-card-info-text-2" style={card && (card.collapsibleContent.collapsibleInfoText3 ? {marginRight: '25px'} : null)}>
                        <p className="book-card-text book-card-collapsible-text">{card && card.collapsibleContent.collapsibleInfoText2}</p>
                    </div>
                    {
                        card 
                        &&
                        (card.collapsibleContent.collapsibleInfoText3
                        &&
                        <hr style={{width: "1px", height: `${heightHr[1]}px`, backgroundColor: "#D9D9D9", position: 'absolute', top: 0, left: `${marginLeftHr2}px`}}/>)
                    }
                {
                    card && (
                        <>
                            {
                                card.collapsibleContent.collapsibleInfoText3 ? (
                                    <>
                                        <div className="book-card-info-text-3">
                                            {audioSvg}
                                            {UkraineSvg}
                                            <p className="book-card-text book-card-collapsible-text">{card.collapsibleContent.collapsibleInfoText3}</p>
                                        </div>
                                    </>
                                )
                                :
                                null
                            }
                        </>
                    )
                }
                </div> */}
                <p>
                    {collapsibleText && collapsibleText.collapsibleText}
                </p>
            </div>
        </div>
    );
}

export default BookCollapsibleContent;