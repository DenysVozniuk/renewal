import React, { useContext, useEffect, useRef } from "react";
import Context from "../../../../Context";
import SocialLinks from "../../../SocialLinks";
import { enLanguage, uaLanguage } from "../../../../img/Header";
import useChangeLanguage from "./hooks/useChangeLanguage";

const HeaderButtons = () => {
    const value = useContext(Context);
    const buttonRef = useRef(null);

    const { handlerClick, handlerClickChangeLanguage } = useChangeLanguage(value);

    useEffect(() => {
        const closeCollapsibleMenu = (e) => {
            e.stopPropagation();
            if(value.isShowLanguageButton && e.target !== buttonRef.current){
                value.handlerShowLanguageButton();
            }
        }
            
        window.addEventListener('click', closeCollapsibleMenu);
    
        return () => {
          window.removeEventListener('click', closeCollapsibleMenu);
        }
    }, [value.isShowLanguageButton]);
        
    
    return (
        <div className="header-buttons">
            <div ref={buttonRef} className="header-buttons-language" onClick={handlerClick}>
                <div className="header-buttons-language-icon">{uaLanguage}</div>
                <span className="header-buttons-language-content">UA</span>
                {value.isShowLanguageButton && (<div className="header-buttons-language-change" onClick={handlerClickChangeLanguage}>
                    {enLanguage}
                    <span>EN</span>
                </div>)}
            </div>
        </div>
    );
}

export default HeaderButtons;