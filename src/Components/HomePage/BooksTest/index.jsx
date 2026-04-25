import React, { useState, useEffect, useContext, useCallback } from "react";
import Context from "../../../Context";
import BookList from "./BookList";
import { RotatingLines } from 'react-loader-spinner';

function getPaginationModel(page, totalPages) {
  const N = totalPages;

  if (N <= 1) return [1];
  if (N <= 5) return Array.from({ length: N }, (_, i) => i + 1);

  if (page <= 3) {
    const end = page === 1 ? 2 : page === 2 ? 3 : 4;
    return [1, 2, ...(end >= 3 ? [3] : []), ...(end >= 4 ? [4] : []), "…", N].filter(Boolean);
  }

  if (page === 4) return [1, "…", 3, 4, 5, "…", N];

  if (page >= N - 2) {
    const start = page === N ? N - 1 : page === N - 1 ? N - 2 : N - 3;
    const pages = [];
    for (let p = start; p <= N; p++) pages.push(p);
    return [1, "…", ...pages];
  }

  return [1, "…", page - 1, page, page + 1, "…", N];
}

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
    cartButtonLink: book?.cart_button_link ?? "",
  })).map((card, index) => ({ card, index }));
}

function updateUrlParams(page) {
  const url = new URL(window.location.href);
  if (page > 1) url.searchParams.set("book_page", String(page));
  else url.searchParams.delete("book_page"); // щоб перша сторінка була “чистою”
  window.history.pushState({}, "", url.toString());
}

const Books = () => {
  const {
    booksSection,
    testBooksServerPath,
    testBookList,
    setTestBookList,
  } = useContext(Context);


  const [divideSize, setDivideSize] = useState(3);

  // ВАЖЛИВО: все, що впливає на UI — в state, а не в ref
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // єдиний прапор, щоб прибрати “миготіння” старих книг на reload
  const [booting, setBooting] = useState(true);
  const [loading, setLoading] = useState(false);

  // 1) INITIAL LOAD: POST без body, але з query-string з адреси сторінки
  const initialLoad = useCallback(async () => {
    setBooting(true);
    setLoading(true);
    try {
      const requestUrl = `${testBooksServerPath}${window.location.search || ""}`;
      const r = await fetch(requestUrl, { method: "POST", headers: { Accept: "application/json" } });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const payload = await r.json();

      const meta = payload?.meta ?? {};
      const rows = Array.isArray(payload?.data) ? payload.data : [];

      const metaPage = Number.parseInt(meta.page ?? 1, 10) || 1;
      const metaPerPage = Number.parseInt(meta.per_page ?? 1, 10) || 1;
      const metaTotalPages = Number.parseInt(meta.total_pages ?? 0, 10) || 0;

      setPage(metaPage);
      setPerPage(metaPerPage);
      setTotalPages(metaTotalPages);

      const list = buildCardsFromRows(rows, metaPage, metaPerPage);
      setTestBookList(list);

      updateUrlParams(metaPage);
    } catch (e) {
      console.error("Initial load error:", e);
    } finally {
      setLoading(false);
      setBooting(false);
    }
  }, [testBooksServerPath, setTestBookList]);

  // 2) PAGE LOAD: POST з body {book_page}
  const nextFrame = () => new Promise((resolve) => requestAnimationFrame(() => resolve()));

  const loadPage = useCallback(async (nextPage) => {
    if (loading || booting) return;

    const safePage = Math.min(Math.max(nextPage, 1), totalPages || 1);

    setTestBookList(null);

    setLoading(true);

    await nextFrame();

    try {
      const requestUrl = `${testBooksServerPath}${window.location.search || ""}`;

      const r = await fetch(requestUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ book_page: safePage }),
      });

      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const payload = await r.json();

      const meta = payload?.meta ?? {};
      const rows = Array.isArray(payload?.data) ? payload.data : [];

      const metaPage = Number.parseInt(meta.page ?? safePage, 10) || safePage;
      const metaPerPage = Number.parseInt(meta.per_page ?? perPage, 10) || perPage;
      const metaTotalPages = Number.parseInt(meta.total_pages ?? totalPages, 10) || totalPages;

      setPage(metaPage);
      setPerPage(metaPerPage);
      setTotalPages(metaTotalPages);

      updateUrlParams(metaPage);

      const list = buildCardsFromRows(rows, metaPage, metaPerPage);
      setTestBookList(list);
    } catch (e) {
      console.error("Pagination load error:", e);
    } finally {
      setLoading(false);
    }
  }, [loading, booting, totalPages, perPage, testBooksServerPath, setTestBookList]);

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

  useEffect(() => {
    initialLoad();
  }, [initialLoad]);

  const canPrev = page > 1 && !loading && !booting;
  const canNext = page < totalPages && !loading && !booting;

  const showPagination = !booting && totalPages > 1;

  return (
    <div ref={booksSection} id="books" className="books-section">
      <div className="container books-container">
        <h2>Книги</h2>

        <div
          className={`books-cards-container ${(loading || booting) ? "is-disabled" : ""}`}
          aria-busy={(loading || booting) ? "true" : "false"}
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
            <BookList divideSize={divideSize} cardList={testBookList || []} />
          )}
        </div>

        {showPagination && (
          <div className={`pagination ${(loading || booting) ? "is-disabled" : ""}`} aria-busy={(loading || booting) ? "true" : "false"}>
            <button
              type="button"
              className="pagination-page pagination-prev-page"
              onClick={() => loadPage(page - 1)}
              disabled={!canPrev}
            >
              {"<"}
            </button>

            {getPaginationModel(page, totalPages).map((item, idx) => {
              if (item === "…") {
                return (
                  <span key={`dots-${idx}`} className="pagination-divider">
                    …
                  </span>
                );
              }

              const p = item;
              const isActive = p === page;

              if (isActive) {
                return (
                  <span key={p} className="pagination-page pagination-active-page" aria-current="page">
                    {p}
                  </span>
                );
              }

              return (
                <button
                  key={p}
                  type="button"
                  className="pagination-page"
                  onClick={() => loadPage(p)}
                  disabled={loading || booting}
                >
                  {p}
                </button>
              );
            })}

            <button
              type="button"
              className="pagination-page pagination-next-page"
              onClick={() => loadPage(page + 1)}
              disabled={!canNext}
            >
              {">"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;
