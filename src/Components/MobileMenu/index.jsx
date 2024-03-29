import React, { useContext } from "react";
import Context from "../../Context";
import SocialLinks from "../SocialLinks";
import Navigation from "../Navigation";

const MobileMenu = () => {
    const contextValue = useContext(Context);
    return (
        <div className={`mobile-menu${contextValue.isMobileMenuOpen ? ' open' : ' close'}`}>
            <div className="mobile-menu-body">
                <Navigation 
                    navClassName={"mobile-navigation"}
                    listClassName={"mobile-navigation-list"}
                    itemClassName={"mobile-navigation-item"}
                    linkClassName={"mobile-navigation-link"}
                />
                <SocialLinks />
            </div>           
        </div>
    );
}

export default MobileMenu;