import React from 'react';
import trash from '../../assets/images/trash.png';
import '../../utils/custom';
import { Link } from 'react-router-dom';

export const CartItem = ({ product, value }) => {
    const id = product.id;
    const name = product.name;
    const count = product.count;
    const price = product.price;
    const image = product.images[0];
    const removeItem = value.removeItem;
    const decrement = value.decrement;
    const increment = value.increment;

    return (
        <li key={id} className=" cart_product d-flex flex-md-row flex-column align-items-md-center align-items-start justify-content-start">
            {/* product image & name*/}
            <div className="cart_product_image"><img src={image} alt="" /></div>
            <div className="cart_product_name"><Link to={`/shop/:${id}`}>{name}</Link></div>
            {/* price quantity total delete*/}
            <div className="cart_product_info ml-auto">
                <div className="cart_product_info_inner d-flex flex-row align-items-center justify-content-md-end justify-content-start">
                    <div className="cart_product_price">${price}</div>
                    <div className="cart_product_quantity_container">
                        <div className="product_quantity clearfix">
                            <input type="text" pattern="[0-9]*"
                             value={count} onChange={value.handleChange}
                            />
                            <div className="quantity_buttons">
                                <div className="quantity_inc quantity_control" onClick={()=>increment(id)}><i className="fa fa-caret-up" aria-hidden="true" ></i></div>
                                <div className="quantity_dec quantity_control" onClick={()=>decrement(id)}><i className="fa fa-caret-down" aria-hidden="true" ></i></div>
                            </div>
                        </div>
                    </div>
                    <div className="cart_product_total">${price*count}</div>
                    <div className="cart_product_button">
                        <button className="cart_product_remove" onClick={()=>removeItem(id)}><img src={trash} alt="" /></button>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default CartItem;