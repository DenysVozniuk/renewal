import React, { useState, useEffect, useContext } from "react";
import Context from "../../Context";
import { useLocation, useNavigate } from "react-router-dom";
import MainScreen from "../../Components/HomePage/MainScreen";
import AboutUs from "../../Components/HomePage/AboutUs";
import AdmTeam from "../../Components/HomePage/AdmTeam";
import Books from "../../Components/HomePage/Books";
import Projects from "../../Components/HomePage/Projects";
import ShopCartButton from "../../Components/ShopCartButton";
import ScrollUpButton from "../../Components/ScrollUpButton";

function Home(props) {
  const { title } = props;
  document.title = title;
  const location = useLocation();
  const navigate = useNavigate();
  const contextValue = useContext(Context);
  const [showScrollUpButton, setShowScrollUpButton] = useState(false);
  const [bottom, setBottom] = useState(0);
  const [right, setRight] = useState(0);
  const [screenWidthLess1024, setScreenWidthLess1024] = useState(false);
  const [paymentResult, setPaymentResult] = useState("");

  useEffect(() => {
    if(location.hash.includes("#clearLocalStorage")){
      if(location.hash.includes("#clearLocalStorage&successResult")){
        contextValue.setOrderList([]);
        contextValue.setTotalSum(null);
        contextValue.setCartCount(null);
        setPaymentResult("success");
        localStorage.clear();
      }
      else if (location.hash.includes("#clearLocalStorage&errorResult")){
        setPaymentResult("error");
      }
      navigate("/", { replace: true });
    }
    else if(location.hash.includes("#books") && contextValue.booksSection){
      setTimeout(() => {
        window.scrollTo({
          left: 0,
          top: contextValue.booksSection.current.offsetTop,
          behavior: 'smooth'
        });

      }, 500);
    }
    if(contextValue.anchorLink){
      if(contextValue.anchorLink === "home"){
        window.scrollTo(0, 0);
      }
      else if(contextValue.anchorLink === "about-us" && contextValue.aboutUsSection){
        setTimeout(() => {
          window.scrollTo({
            left: 0,
            top: contextValue.aboutUsSection.current.offsetTop,
            behavior: 'smooth'
          });
        }, 500);
      }
      else if(contextValue.anchorLink === "books" && contextValue.booksSection){
        setTimeout(() => {
          window.scrollTo({
            left: 0,
            top: contextValue.booksSection.current.offsetTop,
            behavior: 'smooth'
          });
  
        }, 500);
      }
      else if(contextValue.anchorLink === "projects" && contextValue.projectsSection){
        setTimeout(() => {
          window.scrollTo({
            left: 0,
            top: contextValue.projectsSection.current.offsetTop,
            behavior: 'smooth'
          });
        }, 500);
      }
      else if(contextValue.anchorLink === "institutions" && contextValue.institutionsSection){
        setTimeout(() => {
          window.scrollTo({
            left: 0,
            top: contextValue.institutionsSection.current.offsetTop,
            behavior: 'smooth'
          });  
        }, 500);
      }
      else if(contextValue.anchorLink === "contacts" && contextValue.contactsSection){
        setTimeout(() => {
          window.scrollTo({
            left: 0,
            top: contextValue.contactsSection.current.offsetTop,
            behavior: 'smooth'
          });  
        }, 500);
      }
      contextValue.setAnchorLink(null);
    }
    else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if(paymentResult === "success"){
      alert("Ваш платіж підтверджено! Незабаром з вами зв'яжуться!");
      setPaymentResult("");
    }
    else if(paymentResult === "error") { 
      alert("Вибачте, сталася помилка. Ваш платіж не підтверджено!");
      setPaymentResult("");
    }
  }, [paymentResult]);

  useEffect(() => {
    const handleResize = () => {
        const width = window.innerWidth;
        if (width >= 1025) {
            setScreenWidthLess1024(false);
        } else {
            setScreenWidthLess1024(true);
        }
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if(screenWidthLess1024) {
      setBottom(90);
      setRight(50);
    }
    else {
      setBottom(110);
      setRight(65);
    }
  }, [screenWidthLess1024]);

  useEffect(() => {
    const handleScroll = () => {
      const windowScroll = window.scrollY;
      if(windowScroll > 67) {
        setShowScrollUpButton(true);
      }
      else {
        setShowScrollUpButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <MainScreen />
      <AboutUs />
      {/* <AdmTeam /> */}
      <Books />
      <Projects />
      { contextValue.cartCount && <ShopCartButton cartCount={contextValue.cartCount}/> }
      { 
        showScrollUpButton && ( contextValue.cartCount ? <ScrollUpButton bottom={bottom} right={right} /> : <ScrollUpButton bottom={40} right={40} />) 
      }
    </>
  );
}

export default Home;
