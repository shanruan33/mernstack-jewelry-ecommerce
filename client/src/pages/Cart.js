import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ContactBackground from "../assets/home/contact.jpg";
import CartItem from '../components/App/CartItem';
import { ProductContext } from '../context';


export default class Cart extends Component {
    static contextType = ProductContext;
    render() {
        const value = this.context;
        const loading = value.loading;
        const products = value.sortedCart;
        const shipping = 5;
        const cartSubtotal = value.cartSubtotal;
        const cartTax = value.cartTax;
        const cartTotal = value.cartTotal+shipping;
        const clearCart = value.clearCart;
        

        return (


            <div>
                <div
                    className="home_background"
                    style={{ backgroundImage: `url(${ContactBackground})` }}
                ></div>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="home_container">
                                <div className="home_content">
                                    <div className="home_title">Cart</div>
                                    <div className="breadcrumbs">
                                        <ul>
                                            <li>
                                                <Link to="/">Home</Link>
                                            </li>
                                            <li>Shopping cart</li>
                                            <li>Cart</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cart_container">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <div className="cart_title">your shopping cart</div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="cart_bar d-flex flex-row align-items-center justify-content-start">
                                    <div className="cart_bar_title_name">Product</div>
                                    <div className="cart_bar_title_content ml-auto">
                                        <div className="cart_bar_title_content_inner d-flex flex-row align-items-center justify-content-end">
                                            <div className="cart_bar_title_price">Price</div>
                                            <div className="cart_bar_title_quantity">Quantity</div>
                                            <div className="cart_bar_title_total">Total</div>
                                            <div className="cart_bar_title_button"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="cart_products">
                                    {/* {<CartItem />} */}
                                    {loading ? <p>loading...</p> : <ul>{products.map(product => {
                                        return <CartItem key={product.id} product={product} value={value} />
                                    })}</ul>}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="cart_control_bar d-flex flex-md-row flex-column align-items-end justify-content-end">
                                    <button className="button_clear cart_button" onClick={()=>{clearCart()}}>clear cart</button>
                                    <Link id="continueShopping" to="/shop"><button className="button_update cart_button_2 ml-md-auto">continue shopping</button></Link>
                                </div>
                            </div>
                        </div>
                        <div className="row cart_extra">

                            <div className="col-lg-6">
                                <div className="cart_coupon">
                                    <div className="cart_title">coupon code</div>
                                    <form action="#" className="cart_coupon_form d-flex flex-row align-items-start justify-content-start" id="cart_coupon_form">
                                        <input type="text" className="cart_coupon_input" placeholder="Coupon code" required="required" />
                                        <button className="button_clear cart_button_2">apply coupon</button>
                                    </form>
                                </div>
                            </div>

                            <div className="col-lg-5 offset-lg-1">
                                <div className="cart_total">
                                    <div className="cart_title">cart total</div>
                                    <ul>
                                        <li className="d-flex flex-row align-items-center justify-content-start">
                                            <div className="cart_total_title">Subtotal</div>
                                            <div className="cart_total_price ml-auto">${cartSubtotal}</div>
                                        </li>
                                        <li className="d-flex flex-row align-items-center justify-content-start">
                                            <div className="cart_total_title">Tax</div>
                                            <div className="cart_total_price ml-auto">${cartTax}</div>
                                        </li>
                                        <li className="d-flex flex-row align-items-center justify-content-start">
                                            <div className="cart_total_title">Shipping</div>
                                            <div className="cart_total_price ml-auto">${shipping}</div>
                                        </li>
                                        <li className="d-flex flex-row align-items-center justify-content-start">
                                            <div className="cart_total_title">Total</div>
                                            <div className="cart_total_price ml-auto">${cartTotal}</div>
                                        </li>
                                    </ul>
                                    <Link to="/checkout">
                                        <button className="cart_total_button">proceed to checkout</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}



