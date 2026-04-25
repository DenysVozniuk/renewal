import React, { useState, useEffect, useLayoutEffect, useCallback, useRef, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Context from "./Context";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import MobileMenu from "./Components/MobileMenu";
import Home from "./Pages/Home";
import Order from "./Pages/Order";
import Test from "./Pages/Test";
import Agreement from "./Pages/Agreement";

function App() {
  const [isShowLanguageButton, setIsShowLanguageButton] = useState(false);
  const [isMobileMenuButtonActive, setIsMobileMenuButtonActive] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScreenWidthLess1025, setIsScreenWidthLess1025] = useState(false);
  const [orderList, setOrderList] = useState(JSON.parse(localStorage.getItem('orderList')) || []);
  const [totalSum, setTotalSum] = useState(JSON.parse(localStorage.getItem('totalSum')) || null);
  const [cartCount, setCartCount] = useState(JSON.parse(localStorage.getItem('cartCount')) || null);
  const [liqpayData, setLiqpayData] = useState(JSON.parse(localStorage.getItem('liqpayData')) || '');
  const [liqpaySignature, setLiqpaySignature] = useState(JSON.parse(localStorage.getItem('liqpaySignature')) || '');
  const aboutUsSection = useRef(null);
  const booksSection = useRef(null);
  const projectsSection = useRef(null);
  const institutionsSection = useRef(null);
  const contactsSection = useRef(null);
  const [anchorLink, setAnchorLink] = useState(null);
  const [booksServerPath, setBooksServerPath] = useState("https://renewal.org.ua/Server/data.php");
  const [bookList, setBookList] = useState(null);
  const [booksPerPage, setBooksPerPage] = useState(null);
  const [booksTotalPages, setBooksTotalPages] = useState(null);

  const [testBooksServerPath, setTestBooksServerPath] = useState("https://renewal.org.ua/Server/data-test.php");
  const [testBookList, setTestBookList] = useState(null);
  const [testBooksPerPage, setTestBooksPerPage] = useState(null);
  const [testBooksTotalPages, setTestBooksTotalPages] = useState(null);

  const handlerShowLanguageButton = () => {
    setIsShowLanguageButton((prevState) => !prevState);
  }

  const getBooks = useCallback(() => {
    fetch(booksServerPath, {
      method: "POST",
      headers: {
        "Accept": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        return response.json();
      })
      .then((payload) => {
        const rows = Array.isArray(payload?.data) ? payload.data : [];

        const books = rows.map((book, index) => ({
          id: index + 1,

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
        }));

        books.sort((a, b) => b.orderPlace - a.orderPlace);

        const list = books.map((card, index) => ({ card, index }));
        setBookList(list);

        const perPage = payload?.per_page ?? 50;
        setBooksPerPage(perPage);

        const totalPages = payload?.total_pages ?? 0;
        setBooksTotalPages(totalPages);

        if (payload?.error) {
          console.warn(payload.error);
        }
      })
      .catch((error) => {
        console.error("Виникла проблема з операцією отримання:", error);
      });
  }, []);

  const getTestBooks = useCallback(() => {
    const requestUrl = `${testBooksServerPath}${window.location.search || ""}`;

    fetch(requestUrl, {
      method: "POST",
      headers: { "Accept": "application/json" },
    })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((payload) => {
        if (!payload) return;

        const rows = Array.isArray(payload.data) ? payload.data : [];

        const books = rows.map((book, index) => ({
          id: index + 1,
          imageFileName: book.image_file_name ?? "",
          title: book.title ?? "",
          bookPrice: Number.parseFloat(book.book_price ?? 0),
          copybookPrice: Number.parseFloat(book.copybook_price ?? 0),
          audioPrice: Number.parseFloat(book.audio_price ?? 0),
          collapsibleContent: {
            collapsibleInfoText1: book.printed_text ?? "",
            collapsibleInfoText2: book.availability_text ?? "",
            collapsibleInfoText3: book.audio_text ?? "",
            collapsibleText: book.description ?? "",
          },
          availability_status: Boolean(Number.parseInt(book.availability_status ?? 0, 10)),
          disabledText: book.disabled_text ?? "",
          orderPlace: Number.parseInt(book.order_place ?? 0, 10),
          scale: Number.parseFloat(book.scale ?? 1),
          cartButtonText: book.cart_button_text ?? "",
          cartButtonLink: book?.cart_button_link ?? "",
        }));

        const list = books.map((card, index) => ({ card, index }));
        setTestBookList(list);

        const perPage = payload.meta?.per_page ?? 50;
        setTestBooksPerPage(perPage);

        const totalPages = payload.meta?.total_pages ?? 0;
        setTestBooksTotalPages(totalPages);

        if (payload.error) console.warn(payload.error);
      })
      .catch((error) => {
        console.error("Виникла проблема з операцією отримання:", error);
      });
  }, [testBooksServerPath]);

  useLayoutEffect(() => {
    getBooks();
    getTestBooks()
  }, [getBooks, getTestBooks]);

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
    if (isMobileMenuButtonActive) {
      !document.querySelector('body').classList.contains('no-scroll') && (document.querySelector('body').classList.add('no-scroll'));
    } else {
      document.querySelector('body').classList.contains('no-scroll') && (document.querySelector('body').classList.remove('no-scroll'));
    }
  }, [isMobileMenuButtonActive]);

  useEffect(() => {
    isMobileMenuOpen ? (
      setIsMobileMenuButtonActive(() => true)
    ) : (
      setTimeout(() => {
        setIsMobileMenuButtonActive(() => false)
      }, 290)
    )
  }, [isMobileMenuOpen])

  const value = useMemo(() => ({
    isShowLanguageButton,
    handlerShowLanguageButton,
    orderList,
    setOrderList,
    totalSum,
    setTotalSum,
    cartCount,
    setCartCount,
    isMobileMenuButtonActive,
    setIsMobileMenuButtonActive,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    aboutUsSection,
    booksSection,
    projectsSection,
    institutionsSection,
    contactsSection,
    anchorLink,
    setAnchorLink,
    booksServerPath,
    bookList,
    setBookList,
    booksPerPage,
    booksTotalPages,

    testBooksServerPath,
    testBookList,
    setTestBookList,
    testBooksPerPage,
    testBooksTotalPages,
    setTestBooksPerPage,
    setTestBooksTotalPages,

    liqpayData,
    setLiqpayData,
    liqpaySignature,
    setLiqpaySignature,
  }), [
    isShowLanguageButton,
    orderList,
    totalSum,
    cartCount,
    isMobileMenuButtonActive,
    isMobileMenuOpen,
    anchorLink,
    booksServerPath,
    bookList,
    booksPerPage,
    booksTotalPages,
    testBooksServerPath,
    testBookList,
    testBooksPerPage,
    testBooksTotalPages,
    liqpayData,
    liqpaySignature,
  ]);
  return (
    <Router>
      <Context.Provider value={value}>
        <div className="wrap">
          <Header />
          {
            isScreenWidthLess1025 && (
              isMobileMenuButtonActive && <MobileMenu />
            )
          }
          <div className="main-content">
            <Routes>
              <Route path='/' element={<Home title={"Громадська організація RENEWAL"} />} />
              <Route path='/order' element={<Order title={"RENEWAL Замовлення книг"} />} />
              <Route path='/test' element={<Test title={"RENEWAL Test"} />} />
              {/* <Route path='/agreement' element={<Agreement title={"RENEWAL Договір оферти"} />} /> */}
            </Routes>
          </div>
          <Footer />
        </div>
      </Context.Provider>
    </Router>
  );
}

export default App;
