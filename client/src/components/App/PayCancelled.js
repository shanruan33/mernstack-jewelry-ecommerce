import React from 'react';
import { Link } from 'react-router-dom';
import {
    getFromStorage,
    setInStorage
} from '../../utils/storage';



const PayCancelled = () => {
    const obj = getFromStorage('jewelry_app');
    if (obj && obj.token) {
        obj.payment = "cancelled";
        setInStorage('jewelry_app', obj);
        console.log("order :", obj.order, "payment:", obj.payment);
    }
    return (
        <div className="mt-5 pt-5 text-center">
            <div className="section_title mt-5 pt-5">Payment Cancelled!</div>
            <h2 className="test_text">Oops! Payment is not successful. Please try again.</h2>
            <Link to="/cart">Click to go to cart</Link>
        </div>
    );
}

export default PayCancelled;
