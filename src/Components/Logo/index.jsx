import React, {useContext} from "react";
import Context from "../../Context";
import { Link, useLocation } from "react-router-dom";
import LogoIcon from "./components/LogoIcon";

const Logo = (props) => {
    const { additionalClass } = props;
    const contextValue = useContext(Context);
    const location = useLocation();

    const handlerClickNotHome = (currentLink) => {
        contextValue.setAnchorLink(() => currentLink);
    };

    const handlerClickHome = (e) => {
        e.preventDefault();
        window.scrollTo(0, 0);
    };

    return (
        <Link
            to="/"
            onClick={
                (location.pathname.includes('order') || location.pathname.includes('agreement'))
                ?
                () => handlerClickNotHome("home")
                :
                (e) => handlerClickHome(e)
            }
        >
            <div className="logo">
                <LogoIcon additionalClass={additionalClass} />
                <p><span>RENEWAL</span><br />громадська<br />організація</p>
            </div>
        </Link>
    );
}

export default Logo;