import React from "react";
import { Link } from "react-router-dom";
import LogoIcon from "./components/LogoIcon";

const Logo = (props) => {
    const { additionalClass } = props;
    return (
        <Link to="/">
            <div className="logo">
                <LogoIcon additionalClass={additionalClass} />
                <p><span>RENEWAL</span><br />громадська<br />організація</p>
            </div>
        </Link>
    );
}

export default Logo;