import React, { useEffect, useContext } from "react";
import Context from "../../Context";
import { useLocation } from "react-router-dom";
import MainScreen from "../../Components/HomePage/MainScreen";
import AboutUs from "../../Components/HomePage/AboutUs";
import AdmTeam from "../../Components/HomePage/AdmTeam";
import Books from "../../Components/HomePage/Books";
import Projects from "../../Components/HomePage/Projects";
import ShopCartButton from "../../Components/ShopCartButton";

function Home(props) {
  const { title } = props;
  document.title = title;
  const location = useLocation();
  const contextValue = useContext(Context);

  useEffect(() => {
    if(contextValue.anchorLink){
      if(contextValue.anchorLink === "about-us" && contextValue.aboutUsSection){
        setTimeout(() => {
          window.scrollTo({
            left: 0,
            top: contextValue.aboutUsSection.current.offsetTop,
            behavior: 'smooth'
          });
        }, 400);
      }
      else if(contextValue.anchorLink === "books" && contextValue.booksSection){
        setTimeout(() => {
          window.scrollTo({
            left: 0,
            top: contextValue.booksSection.current.offsetTop,
            behavior: 'smooth'
          });
  
        }, 400);
      }
      else if(contextValue.anchorLink === "projects" && contextValue.projectsSection){
        setTimeout(() => {
          window.scrollTo({
            left: 0,
            top: contextValue.projectsSection.current.offsetTop,
            behavior: 'smooth'
          });
        }, 400);
      }
      else if(contextValue.anchorLink === "institutions" && contextValue.institutionsSection){
        setTimeout(() => {
          window.scrollTo({
            left: 0,
            top: contextValue.institutionsSection.current.offsetTop,
            behavior: 'smooth'
          });  
        }, 400);
      }
      else if(contextValue.anchorLink === "contacts" && contextValue.contactsSection){
        setTimeout(() => {
          window.scrollTo({
            left: 0,
            top: contextValue.contactsSection.current.offsetTop,
            behavior: 'smooth'
          });  
        }, 400);
      }
      contextValue.setAnchorLink(null);
    }
    else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  useEffect(() => {
    
  }, []);

  return (
    <>
      <MainScreen />
      <AboutUs />
      {/* <AdmTeam /> */}
      <Books />
      <Projects />
      <ShopCartButton />
    </>
  );
}

export default Home;
