import React, {useContext} from "react";
import Context from "../../../Context";
import LogoIcon from "../../Logo/components/LogoIcon";

function AboutUs() {
    const contextValue = useContext(Context);
  return (
    <div ref={contextValue.aboutUsSection} id="about-us" className="about-us">
        <div className="about-us-background"></div>
        <div className="container about-us-container">
            <div className="about-us-logo">
                <LogoIcon />
            </div>
            <div className="about-us-body">
                <div className="about-us-title">
                    <h2 className="about-us-h2">Про нас</h2>
                </div>
                <div className="about-us-content">
                    <p className="about-us-text" translate="no">Громадська організація RENEWAL — це команда, обʼєднана спільними ідеями та цінностями, яка різними способами відповідає на культурно-освітні потреби людей та здійснює духовно-доброчинну діяльність.</p>
                </div>
            </div>
        </div>
    </div>
  );
}

export default AboutUs;
