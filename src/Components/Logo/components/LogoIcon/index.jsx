import React from "react";
import { logo } from "../../../../img/Logo";

const LogoIcon = (props) => {
    const { additionalClass = '' } = props;
    return (
        <div className={additionalClass}>
            {logo}
        </div>
    );
}

export default LogoIcon;