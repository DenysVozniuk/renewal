import React, {useState, useEffect} from "react";
import OrderPage from "../../Components/OrderPage";
import ScrollUpButton from "../../Components/ScrollUpButton";

function Order(props) {
  const { title } = props;
  document.title = title;
  const [showScrollUpButton, setShowScrollUpButton] = useState(false);

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
      <OrderPage />
      { showScrollUpButton && <ScrollUpButton bottom={40} right={40} /> }
    </>
  );
}

export default Order;
