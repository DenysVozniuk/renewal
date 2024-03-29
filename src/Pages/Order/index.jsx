import React from "react";
import OrderPage from "../../Components/OrderPage";

function Order(props) {
  const { title } = props;
  document.title = title;
  return (
    <OrderPage />
  );
}

export default Order;
