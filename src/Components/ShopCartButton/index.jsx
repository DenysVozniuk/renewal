import React from "react";
import { Link } from "react-router-dom";
import { shopCartIcon } from "../../img/Shop-cart";

const ShopCartButton = (props) => {
    const { cartCount } = props;
    return (
        <div className="shop-cart-container">
            <Link to="/order">
                <div className="shop-cart-button">
                    <div className="shop-cart-icon">
                        {shopCartIcon}
                        <div id="shop-cart-icon-count">{cartCount}</div>
                    </div>
                    кошик
                </div>
            </Link>
        </div>
    );
}

export default ShopCartButton;