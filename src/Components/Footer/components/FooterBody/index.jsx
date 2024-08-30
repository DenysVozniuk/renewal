import React from "react";
import Logo from "../../../Logo";
import { emailIcon } from "../../../../img/Footer";

const FooterBody = () => {
    return (
        <div className="footer-body">
            <div className="container main-container">
                <div className="footer-body-wrap">
                    <div className="footer-body-wrap-logo">
                        <Logo 
                            additionalClass={'logo-footer-icon'}
                        />
                    </div>
                    <div className="footer-body-links">
                        <div className="footer-email-wrap">
                            {emailIcon}
                        </div>
                        <div className="footer-text footer-email-link">renewal.ngo@gmail.com</div>
                    </div>
                    <a className="footer-body-links footer-site-link footer-text" href="https://chveu-osvita.org.ua/" target="_blank" rel="noreferrer">
                        сайт Департаменту освіти УЦХВЄ
                    </a>
                </div>
            </div>
        </div>
    );
}

export default FooterBody;