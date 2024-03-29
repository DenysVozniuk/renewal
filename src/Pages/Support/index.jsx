import React from "react";
import SupportPage from "../../Components/SupportPage";

function Support(props) {
  const { title } = props;
  document.title = title;
  return (
    <SupportPage />
  );
}

export default Support;
