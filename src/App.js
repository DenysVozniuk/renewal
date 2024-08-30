import React, { useState, useEffect, useLayoutEffect, useCallback, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Context from "./Context";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import MobileMenu from "./Components/MobileMenu";
import Home from "./Pages/Home";
import Order from "./Pages/Order";
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
  const [bookList, setBookList] = useState(null);

  const handlerShowLanguageButton = () => {
    setIsShowLanguageButton((prevState) => !prevState);
  }

  const getBooks = useCallback(() => {
    //const serverPath = "http://renewal/data.php";
    const serverPath = "https://renewal.org.ua/Server/data.php";
    fetch(serverPath)
    .then(response => {
        if (!response.ok) {
        throw new Error('Відповідь мережі була неправильною');
        }
        return response.json();
    })
    .then(data => {
        const books = data.map((book, index) => {
                return {
                    id: (index + 1),
                    image: 'data:image/jpeg;base64,' + book.image,
                    title: book.title,
                    bookPrice: parseFloat(book.book_price),
                    copybookPrice: parseFloat(book.copybook_price),
                    audioPrice: parseFloat(book.audio_price),
                    collapsibleContent: {
                        collapsibleInfoText1: book.printed_text,
                        collapsibleInfoText2: book.availability_text,
                        collapsibleInfoText3: book.audio_text,
                        collapsibleText: book.description
                    },
                    availability_status: Boolean(parseInt(book.availability_status, 10)),
                    disabledText: book.disabled_text,
                    orderPlace: parseInt(book.order_place, 10)
                }
        });
        const list = [];
        books.sort(function(a, b) {
            return a.orderPlace - b.orderPlace;
        });
        for (let i = 0; i < books.length; i++){
            list.push({card: books[i], index: i});
        }
        setBookList(list);
    })
    .catch(error => {
        console.error('Виникла проблема з операцією отримання:', error);
    });
  }, []);

  useLayoutEffect(() => { 
    getBooks();
  }, [getBooks]);

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
    if(isMobileMenuButtonActive) {
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

  const value = {
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
    bookList,
    liqpayData,
    setLiqpayData,
    liqpaySignature,
    setLiqpaySignature
  };
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
