import React, { Component, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import ContactBackground from "../assets/home/contact.jpg";
import { ProductContext, ProductConsumer } from '../context';
import visaImg from '../assets/images/visa.jpg';
import masterImg from '../assets/images/master.jpg';
import CheckoutItem from '../components/App/ChechoutItem';
// import config from '../../../config/config';


export const Checkout = () => {

    //stripe
    
    const [stripe, setStripe] = useState(null);
    // const STRIPE_TOKEN ='pk_test_iLMNoDebIdHBrD0vDzNPieTV000FbD0rmQ'
    // const stripeToken = process.env.REACT_APP_STRIPE_TOKEN;
    const stripeToken = 'pk_test_iLMNoDebIdHBrD0vDzNPieTV000FbD0rmQ';

    useEffect(() => {
        if (window.Stripe) setStripe(window.Stripe(stripeToken))
    }, [stripeToken])

    return (
        <div>
            <div className="home_background" style={{ backgroundImage: `url(${ContactBackground})` }} ></div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="home_container">
                            <div className="home_content">
                                <div className="home_title">Checkout</div>
                                <div className="breadcrumbs">
                                    <ul>
                                        <li><Link to="/">Home</Link></li>
                                        <li>Shopping cart</li>
                                        <li>Checkout</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div className="checkout">
                <div className="container">
                    <ProductConsumer>
                        {value => {
                            const checkSignIn = value.checkSignIn;
                            const loading = value.loading;
                            // let sortCart = value.sortCart;
                            // let cart = value.cart;
                            // let products = sortCart(cart);
                            const products = value.sortedCart;

                            const shipping = 5;
                            let cartSubtotal = value.cartSubtotal;
                            let cartTax = value.cartTax;
                            let cartTotal = value.cartTotal + shipping;
                            const firstName = value.firstName;
                            const lastName = value.lastName;
                            const email = value.email;

                            const checkout = value.checkout;
                            const clearCart = value.clearCart;

                            return (


                                <div className="row">


                                    <div className="col-lg-6">
                                        <div className="billing">
                                            <div className="checkout_title">billing details</div>
                                            <div className="checkout_form_container">


                                                <form action="#" id="checkout_form">
                                                    <div className="d-flex flex-lg-row flex-column align-items-start justify-content-between">
                                                        <input type="text" className="checkout_input checkout_input_50"
                                                            placeholder={firstName ? firstName : "First Name"}
                                                            required="required" />
                                                        <input type="text" className="checkout_input checkout_input_50" placeholder={lastName ? lastName : "Last Name"} required="required" />
                                                    </div>
                                                    <input type="text" className="checkout_input" placeholder="Company Name" />
                                                    <input type="text" className="checkout_input" placeholder={email ? email : "E-mail"} required="required" />
                                                    <select name="country" id="country" className="country_select checkout_input">
                                                        <option>Canada</option>
                                                        <option>US</option>
                                                    </select>
                                                    <input type="text" className="checkout_input" placeholder="Address" required="required" />
                                                    <input type="text" className="checkout_input" placeholder="Town" required="required" />

                                                    <div className="d-flex flex-lg-row flex-column align-items-start justify-content-between" >
                                                        <input type="text" className="checkout_input checkout_input_50" placeholder="Zipcode" required="required" />
                                                        <input type="text" className="checkout_input checkout_input_50" placeholder="Phone No" required="required" />
                                                    </div>
                                                    <textarea name="checkout_comment" id="checkout_comment" className="checkout_comment" placeholder="Leave a comment about your order"></textarea>
                                                    {/* <div className="billing_options">
                                                <div className="billing_account">
                                                    <input type="checkbox" id="checkbox_account" name="regular_checkbox" className="regular_checkbox checkbox_account" />
                                                    <label htmlFor="checkbox_account"><img src={checkedImg} alt="" /></label>
                                                    <span>Create an account</span>
                                                </div>
                                                <div className="billing_shipping">
                                                    <input type="checkbox" id="checkbox_shipping" name="regular_checkbox" className="regular_checkbox checkbox_shipping" />
                                                    <label htmlFor="checkbox_shipping"><img src={checkedImg} alt="" /></label>
                                                    <span>Ship to a different address</span>
                                                </div>
                                            </div> */}
                                                </form>
                                                {/* {(checkSignIn()) ? null : <Link to="/login"><button className="cart_total_button">login / sign up</button></Link>} */}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                        <div className="cart_details">
                                            <div className="checkout_title">cart total</div>
                                            <div className="cart_total">
                                                <ul>
                                                    <li className="d-flex flex-row align-items-center justify-content-start">
                                                        <div className="cart_total_title">Product</div>
                                                        <div className="cart_total_price ml-auto">Total</div>
                                                    </li>
                                                    {loading ? <p>loading...</p> : <>{products.map(product => {
                                                        return <CheckoutItem key={product.id} product={product} />
                                                    })}</>}
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
                                                    <li className="d-flex flex-row align-items-start justify-content-start total_row">
                                                        <div className="cart_total_title">Total</div>
                                                        <div className="cart_total_price ml-auto">${cartTotal}</div>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="payment_options">
                                                <div>
                                                    <input type="radio" id="radio_payment_1" name="regular_radio" className="regular_radioC" />
                                                    <label htmlFor="radio_payment_1">debit card</label>
                                                </div>
                                                <div>
                                                    <input type="radio" id="radio_payment_2" name="regular_radio" className="regular_radioC" />
                                                    <label htmlFor="radio_payment_2">credit card</label>
                                                    <div className="visa payment_option"><a href="#"><img src={visaImg} alt="" /></a></div>
                                                    <div className="master payment_option"><a href="#"><img src={masterImg} alt="" /></a></div>
                                                </div>
                                                {(checkSignIn()) ? <button className="cart_total_button" onClick={() => checkout()}>place order</button> : <><button className="cart_total_button" onClick={() => checkout()}>place order as a guest</button><Link to="/login"><button className="cart_total_button">or login / sign up</button></Link></>}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }}
                    </ProductConsumer>
                </div>
            </div>
        </div >
    )
}

export default Checkout;