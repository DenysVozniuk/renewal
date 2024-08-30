import React, { useContext } from "react";
import Context from "../../Context";

const MobileMenuButton = () => {
    const contextValue = useContext(Context);
    const handlerClick = (state) => {
        state ? contextValue.setIsMobileMenuOpen(() => false) : contextValue.setIsMobileMenuOpen(() => true);        
    }
    return (
        <div 
            className={`mobile-menu-btn${contextValue.isMobileMenuOpen ? " active" : ""}`}
            onClick={() => handlerClick(contextValue.isMobileMenuButtonActive)}
        >
            <span className="menu-open"></span>
        </div>
    );
}

export default MobileMenuButton;