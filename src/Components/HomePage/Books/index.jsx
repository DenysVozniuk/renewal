import React, { useState, useEffect, useContext, useRef } from "react";
import Context from "../../../Context";
import BookList from "./BookList";
import { RotatingLines } from "react-loader-spinner";
import Pagination from "../../Pagination";
import { useServerPagination } from "../../../Hooks/useServerPagination";

function buildCardsFromRows(rows, page, perPage) {
    return rows.map((book, index) => ({
        id: (page - 1) * perPage + (index + 1),
        imageFileName: book.image_file_name ?? "",
        title: book?.title ?? "",
        bookPrice: Number.parseFloat(book?.book_price ?? 0),
        copybookPrice: Number.parseFloat(book?.copybook_price ?? 0),
        audioPrice: Number.parseFloat(book?.audio_price ?? 0),
        collapsibleContent: {
            collapsibleInfoText1: book?.printed_text ?? "",
            collapsibleInfoText2: book?.availability_text ?? "",
            collapsibleInfoText3: book?.audio_text ?? "",
            collapsibleText: book?.description ?? "",
        },
        availability_status: Boolean(Number.parseInt(book?.availability_status ?? 0, 10)),
        disabledText: book?.disabled_text ?? "",
        orderPlace: Number.parseInt(book?.order_place ?? 0, 10),
        scale: Number.parseFloat(book?.scale ?? 1),
        cartButtonText: book?.cart_button_text ?? "",
    })).map((card, index) => ({ card, index }));
}

const Books = () => {
    const { booksSection, booksServerPath, bookList, setBookList } = useContext(Context);

    const [divideSize, setDivideSize] = useState(3);
    const cardsTopRef = useRef(null);

    const {
        page,
        totalPages,
        booting,
        loading,
        disabled,
        loadPage,
    } = useServerPagination({
        endpoint: booksServerPath,
        paramName: "book_page",
        setList: setBookList,
        buildList: buildCardsFromRows,
        scrollRef: cardsTopRef,
        scrollOffset: 150,
        requestInitHeaders: { Accept: "application/json" },
    });

    // resize
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width >= 1025) setDivideSize(3);
            else if (width >= 744) setDivideSize(2);
            else setDivideSize(1);
        };

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div ref={booksSection} id="books" className="books-section">
            <div className="container books-container">
                <h2>Книги</h2>

                <div
                    ref={cardsTopRef}
                    className={`books-cards-container ${disabled ? "is-disabled" : ""}`}
                    aria-busy={disabled ? "true" : "false"}
                >
                    {(booting || loading) ? (
                        <div className="book-loader">
                            <RotatingLines
                                visible={true}
                                height="96"
                                width="96"
                                color="#c2c2c2"
                                strokeColor="#aaa"
                                strokeWidth="5"
                                animationDuration="0.75"
                                ariaLabel="rotating-lines-loading"
                            />
                        </div>
                    ) : (
                        <BookList divideSize={divideSize} cardList={bookList || []} />
                    )}
                </div>

                <div className={`books-pagination ${(!totalPages || totalPages <= 1) ? 'hide' : ''}`}>
                    <Pagination
                        page={page}
                        totalPages={totalPages}
                        disabled={disabled}
                        onPageChange={loadPage}
                    />
                </div>
            </div>
        </div>
    );
};

export default Books;