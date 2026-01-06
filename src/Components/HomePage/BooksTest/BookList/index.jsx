import React, { useState, useEffect, useRef } from "react";
import Book from "./components/Book";
import BookCollapsibleContent from "./components/BookCollapsibleContent";

const BookList = (props) => {
    const { divideSize, cardList } = props;
    const [card, setCard] = useState(null);
    const [isScreenWidthLess1025, setIsScreenWidthLess1025] = useState(false);
    const [bookRowList, setBookRowList] = useState([]);
    const [initialIndexTwoElementsInArrayValue, setInitialIndexTwoElementsInArrayValue] = useState(null);
    const [indexTwoElementsInArray, setIndexTwoElementsInArray] = useState(initialIndexTwoElementsInArrayValue);


    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width >= 1025) {
                setIsScreenWidthLess1025(false);
                setIndexTwoElementsInArray(initialIndexTwoElementsInArrayValue);
            } else {
                setIsScreenWidthLess1025(true);
                setIndexTwoElementsInArray(null);
            }
        };

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => {
          window.removeEventListener('resize', handleResize);
        };
    }, [initialIndexTwoElementsInArrayValue]);
    

    const [height, setHeight] = useState([]);
    const [collapsibleText, setCollapsibleText] = useState([]);
    const collapsibleContentRefs = useRef([]);

    const [activeStates, setActiveStates] = useState([]);

    useEffect(() => {
        if(cardList){
            const rowList = [];
            let activeStatesInitialArray = [];
            for(let i = 0; i < cardList.length; i += divideSize){
                const row = [];
                for(let j = 0; j < divideSize && i + j < cardList.length; j++){
                    row.push(cardList[i + j]);

                    if (!isScreenWidthLess1025) {
                        if (i + (j + 1) === cardList.length && row.length === 2) {
                            setInitialIndexTwoElementsInArrayValue((i / divideSize) + 1);
                            setIndexTwoElementsInArray((i / divideSize) + 1);
                        }
                    }
                }
                rowList.push(row);
            }
            setBookRowList(rowList);
            rowList.forEach((value, index) => {
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
            setHeight(rowList.map(() => 0));
            setCollapsibleText(rowList.map(() => null));
            collapsibleContentRefs.current = rowList.map(() => React.createRef());
            setActiveStates(activeStatesInitialArray);
        }
    }, [cardList, divideSize]);


    return (
        <div className="books-cards">
            {
                bookRowList.length > 0 && (
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
                )
            }
        </div>
    );
}

export default BookList;