import React from 'react';
// import { Link } from 'react-router-dom';

export const CheckoutItem = ({ product }) => {
    const id = product.id;
    const name = product.name;
    const count = product.count;
    const price = product.price;

    return (
        <li key={id} className="d-flex flex-row align-items-center justify-content-start">
            <div className="cart_total_title">{name} x{count}</div>
            <div className="cart_total_price ml-auto">${price * count}</div>
        </li>
    )
}

export default CheckoutItem;