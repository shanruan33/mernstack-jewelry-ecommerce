import React from 'react';
import { Link } from 'react-router-dom';
import {
    getFromStorage,
    setInStorage
} from '../../utils/storage';



const PaySuccess = () => {
    const obj = getFromStorage('jewelry_app');
    if (obj && obj.token) {
        obj.payment = "success";
        setInStorage('jewelry_app', obj);
        console.log("order :",obj.order, "payment:", obj.payment);
    }
    return (
        <div className="mt-5 pt-5 text-center">
            <div className="section_title mt-5 pt-5">Payment Received!</div>
            <h2 className="test_text">Your order is placed! Thank you for shopping with us.</h2>
            <Link to="/">Click to go home</Link>
        </div>
    );
}

export default PaySuccess;
