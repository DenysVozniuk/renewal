import React, {useContext} from "react";
import Context from "../../Context";
import FooterBody from "./components/FooterBody";
import FooterBottom from "./components/FooterBottom";

const Footer = () => {
    const contextValue = useContext(Context);
    return (
        <footer ref={contextValue.contactsSection} id="contacts" className="footer">
            <div className="footer-wrap">
                <FooterBody />
                <FooterBottom />
            </div>
        </footer>
    );
}

export default Footer;