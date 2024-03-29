import React, { useState, useEffect, useRef } from "react";
import Book from "./components/Book";
import BookCollapsibleContent from "./components/BookCollapsibleContent";

const BookList = (props) => {
    const { divideSize, cardList } = props;
    const [card, setCard] = useState(null);
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

    const bookRowList = [];
    let indexTwoElementsInArray = null;
    for(let i = 0; i < cardList.length; i += divideSize){
        const row = [];
        for(let j = 0; j < divideSize && i + j < cardList.length; j++){
            row.push(cardList[i + j]);

            if (!isScreenWidthLess1025) {
                if (i + (j + 1) === cardList.length && row.length === 2) {
                    indexTwoElementsInArray = (i / divideSize) + 1;
                }    
            }
        }
        bookRowList.push(row);
    }

    const [height, setHeight] = useState(bookRowList.map(() => 0));
    const [collapsibleText, setCollapsibleText] = useState(bookRowList.map(() => null));
    const collapsibleContentRefs = useRef(bookRowList.map(() => React.createRef()));

    let activeStatesInitialArray = [];

    bookRowList.forEach((value, index) => {
        value.forEach(() => {
            activeStatesInitialArray.push({activeState: false, contentPosition: index});
        })
    })

    activeStatesInitialArray = activeStatesInitialArray.map((v, i) => {
        return {
            ...v,
            cardPosition: i
        };
    });

    const [activeStates, setActiveStates] = useState(activeStatesInitialArray);
    useEffect(() => {
        setHeight(bookRowList.map(() => 0));
        setCollapsibleText(bookRowList.map(() => null));
        collapsibleContentRefs.current = bookRowList.map(() => React.createRef());
        setActiveStates(activeStatesInitialArray);
    }, [divideSize]);


    return (
        <div className="books-cards">
            {
                bookRowList.map((value, index) => {
                    return (
                        <div key={index} className="books-card-row">
                            <div 
                                className="book-card-block"
                                style={
                                    (indexTwoElementsInArray !== null && indexTwoElementsInArray === (index + 1))
                                    ?
                                    {maxWidth: 'calc(100% - (((100% - (255px * 3)) / 2) + 255px))'}
                                    :
                                    {}
                                }
                            >
                                {
                                    value.map((v, i) => {
                                        return (
                                            <Book 
                                                key={i}
                                                currentIndex={v.index}
                                                currentContentIndex={index}
                                                card={v.card}
                                                setCollapsibleText={setCollapsibleText}
                                                activeStates={activeStates}
                                                setActiveStates={setActiveStates}
                                                setCollapsibleContentCard={setCard}
                                            />
                                        );
                                    })
                                }
                            </div>
                            <BookCollapsibleContent 
                                index={index}
                                height={height[index]}
                                setHeight={setHeight}
                                collapsibleContent={collapsibleContentRefs.current[index]}
                                collapsibleContents={collapsibleContentRefs}
                                collapsibleText={collapsibleText[index]}
                                activeStates={activeStates}
                                card={card}
                            />
                        </div>
                    );
                })
            }
        </div>
    );
}

export default BookList;