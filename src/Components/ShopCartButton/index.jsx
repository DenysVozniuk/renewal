import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Context from "../../Context";
import { shopCartIcon } from "../../img/Shop-cart";

const ShopCartButton = () => {
    const contextValue = useContext(Context);
    return (
        <>
            {
                contextValue.cartCount && 
                (
                <div className="shop-cart-container">
                    <Link to="/order">
                        <div className="shop-cart-button">
                            <div className="shop-cart-icon">
                                {shopCartIcon}
                                <div id="shop-cart-icon-count">{contextValue.cartCount}</div>
                            </div>
                            кошик
                        </div>
                    </Link>
                </div>
                )
            }
        </>
    );
}

export default ShopCartButton;