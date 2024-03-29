import React from "react";
import { uaIcon, europeIcon } from "../../../../../../img/Support-page";

const TransferCard = (props) => {
    const hideContent = false;
    return (
        <>
            <div className="transfer-card">
                <div className="transfer-type">
                    {uaIcon}
                    <h2>Перекази по Україні</h2>
                </div>
                <div className="transfer-content">
                    <p>Ренювл</p>
                </div>
                <div className="transfer-content">
                    <p>2349544</p>
                </div>
                <div className="transfer-content">
                    <p>UA95837738</p>
                </div>
                <div className="transfer-content">
                    <p>АТ КБ “ПРИВАТБАНК”</p>
                </div>
            </div>
            <div className="transfer-card">
                <div className="transfer-type">
                    {europeIcon}
                    <h2>Перекази в євро</h2>
                </div>
                <div className="transfer-content">
                    <p><b>Renewal</b></p>
                </div>
                {
                    !hideContent && (
                        <div className="transfer-content">
                            <p>2349544</p>
                        </div>
                    )
                }
                <div className="transfer-content">
                    <p>UA90000026001011031877</p>
                </div>
                <div className="transfer-content">
                    <p>Інформація про банк</p>
                    
                </div>
            </div>
        </>
    );
}

export default TransferCard;