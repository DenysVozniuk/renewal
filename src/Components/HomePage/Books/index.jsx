import React, { useState, useEffect, useContext } from "react";
import Context from "../../../Context";
import BookList from "./BookList";

const Books = () => {
    const [divideSize, setDivideSize] = useState(3);
    const contextValue = useContext(Context);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width >= 1025) {
                setDivideSize(3);
            } else if (width >= 744){
                setDivideSize(2);
            } else {
                setDivideSize(1);
            }
        };
    
        window.addEventListener('resize', handleResize);
    
        handleResize();
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div ref={contextValue.booksSection} id="books" className="books-section">
            <div className="container books-container">
                <h2>Книги</h2>
                <div className="books-cards-container">
                    <BookList 
                        divideSize={divideSize}
                        cardList={contextValue.bookList}
                    />
                </div>
            </div>
        </div>
    );
}

export default Books;