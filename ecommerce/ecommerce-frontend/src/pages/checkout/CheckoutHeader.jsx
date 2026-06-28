/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router";
import logo from '../../assets/images/logo.png'
import mobileLogo from '../../assets/images/mobile-logo.png'
import checkoutLock from '../../assets/images/icons/checkout-lock-icon.png'
export function CheckoutHeader({cart}) {
    let totalQuantity=0;
    cart.forEach((cartItem)=>{
        totalQuantity+=cartItem.quantity;
    })
    return (
        <div className="checkout-header">
            <div className="header-content">
                <div className="checkout-header-left-section">
                    <Link to="/">
                        <img className="logo" src={logo} />
                        <img className="mobile-logo" src={mobileLogo} />
                    </Link>
                </div>

                <div className="checkout-header-middle-section">
                    Checkout (<Link className="return-to-home-link"
                    
                        to="/">{totalQuantity} item</Link>)
                </div>

                <div className="checkout-header-right-section">
                    <img src={checkoutLock} />
                </div>
            </div>
        </div>
    )
}