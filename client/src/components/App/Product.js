import React from 'react';
import { Link } from 'react-router-dom';
import eye from '../../assets/images/camera-solid.svg';


export const Product = ({ product }) => {

    return (
        <div className="col-md-4">
            <div className="product_grid">
                {/* product */}
                <div className="cateProduct">
                    <div className="product_image">
                        {/* <a href={`/${product.id}`}><img src={product.images[3].fields.file.url} alt={product.name} /></a> */}
                        <Link to={`/shop/:${product.id}`}><img src={product.images[3]} alt={product.name} /></Link>

                    </div>
                    <div className={`rating rating_${product.rating}`} data-rating={product.rating}>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        {product.ar ? <a href="https://instagram.com/a/r/?effect_id=216138253076637" target="_blank" className="product_fav" id="try_on"><img src={eye} /></a> : null}
                    </div>

                    <div className="product_content clearfix">
                        <div className="product_info">
                            <div className="product_name"><Link to={`/shop/:${product.id}`}>{product.name}</Link></div>
                            <div className="product_price">${product.price}</div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}


export default Product;