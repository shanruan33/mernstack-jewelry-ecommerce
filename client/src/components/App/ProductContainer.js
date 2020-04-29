
import React, { Component } from 'react';
import Product from './Product';
import { ProductConsumer, ProductProvider, ProductContext } from '../../context';
// import Loading from './Loading';

export default class ProductContainer extends Component {
    static contextType = ProductContext;


    render() {
        let value = this.context;
        let loading = value.loading;
        //let products = value.products;
        let filteredProducts = value.filteredProducts;

        return (
            <>
                {loading ? <p>loading...</p> : <div className="row products_container">{filteredProducts.map(product => {
                    return <Product key={product.id} product={product} />
                })}</div>}
            </>


        )
    }
}

