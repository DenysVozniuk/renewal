import React from "react";
import Books from "../../Components/HomePage/BooksTest";

function Test(props) {
  const { title } = props;
  document.title = title;
  return (
    <div>
        <Books />
    </div>
  );
}

export default Test;
