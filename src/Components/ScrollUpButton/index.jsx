import React from "react";

const ScrollUpButton = (props) => {
    const { bottom, right } = props;
    const handlerClick = () => {
        window.scrollTo({
            left: 0,
            top: 0,
            behavior: 'smooth'
          });  
    };
    return (
        <div className="scroll-up-button" style={{bottom: `${bottom}px`, right: `${right}px`}} onClick={() => handlerClick()}>
            <span></span>
        </div>
    );
}

export default ScrollUpButton;