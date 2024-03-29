import React from "react";
import { hryvnaIcon, euroIcon, dollarIcon } from "../../img/Support-page";
import Transfers from "./components/Transfers";

const SupportPage = () => {
    return (
        <div className="container support-page-container">
            <h1>Підтримати</h1>
            <div className="support-headings">
                <div id="support-heading-1" className="support-heading">{hryvnaIcon}<span>Перекази по Україні</span></div>
                <div id="support-heading-2" className="support-heading">{euroIcon}<span>Перекази в євро</span></div>
                <div id="support-heading-3" className="support-heading">{dollarIcon}<span>Перекази в доларах</span></div>
            </div>
            <Transfers />
        </div>
    );
}

export default SupportPage;