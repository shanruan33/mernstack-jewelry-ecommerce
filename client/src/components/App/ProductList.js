import React from 'react';
import Product from "./Product";


export const ProductList = ({ products }) => {
    if (products.length === 0) {
        return (
            <div className="">
                <h3>unfortunetely no room matched your search parameters</h3>
            </div>
        );
    }
    return (
            <div className="product_grid">
                {products.map(item => {
                    return <Product key={item.index} product={item} />
                })}
            </div>
    )
}

export default ProductList;