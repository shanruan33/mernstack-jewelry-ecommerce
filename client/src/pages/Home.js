import React from 'react'
import Background1 from '../assets/home/bg7.png';
import { Link } from 'react-router-dom';
import ring4 from '../assets/product/ring/1/4.jpg';
import bracelet4 from '../assets/product/bracelet/1/4.jpg';
import earing4 from '../assets/product/earring/1/4.jpg';
import NewArrival from '../components/App/NewArrival';
import { ProductConsumer, ProductProvider, ProductContext } from '../context';
import { useContext } from "react";


export const Home = () => {
    const context = useContext(ProductContext);
    const handleChange = context.handleChange;
    return (

        <div>
            <div className="home">
                <div className="home_slider_background" style={{ backgroundImage: `url(${Background1})` }}></div>

                <div className="home_slider_content">
                    <div className="home_slider_content_inner">
                        <div className="home_slider_subtitle">New Collection</div>
                        <div className="home_slider_title">Make Hearts Fly</div>
                    </div>
                    <div className="btn_container">
                        <Link to="/shop"><div className="btn">
                            Shop now
                </div></Link>
                    </div>
                </div>
            </div>
            <div className="promo">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="section_title_container text-center">
                                <div className="section_subtitle">only the best</div>
                                <div className="section_title">Categories</div>
                            </div>
                        </div>
                    </div>
                    <div className="row promo_container">


                        <div className="col-lg-4 promo_col">
                            <div className="promo_item">
                                <div className="promo_image">
                                    <img src={ring4} alt="" />

                                </div>
                                <div className="promo_link"><Link to="/shop" name="ring" onClick={handleChange}>Ring</Link></div>
                            </div>
                        </div>


                        <div className="col-lg-4 promo_col">
                            <div className="promo_item">
                                <div className="promo_image">
                                    <img src={bracelet4} alt="" />

                                </div>
                                <div className="promo_link"><Link to="/shop" name="bracelet" onClick={handleChange}>Bracelet</Link></div>
                            </div>
                        </div>


                        <div className="col-lg-4 promo_col">
                            <div className="promo_item">
                                <div className="promo_image">
                                    <img src={earing4} alt="" />

                                </div>
                                <div className="promo_link"><Link to="/shop" name="earring" onClick={handleChange}>Earring</Link></div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>



            <div className="arrivals">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="section_title_container text-center">
                                <div className="section_subtitle">only the best</div>
                                <div className="section_title">new arrivals</div>
                            </div>
                        </div>
                    </div>
                    <NewArrival />

                    <div className="testimonials">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <div className="section_title_container text-center">
                                        <div className="section_subtitle">only the best</div>
                                        <div className="section_title">About Us</div>
                                    </div>
                                </div>
                            </div>
                            <div className="row test_slider_container">
                                <div className="col">





                                    <div className="owl-item">
                                        <div className="test_text">“S&S focuses on creating the perfect demi-fine jewellery for your everyday wardrobe. An integral part of our designs is their ability to be worn alone or layered. We embrace the need for versatility, interchangeable pieces, mix & match studs, and collectable pendants and charms; ultimately your jewellery should be a unique expression of your individual style and express every dimension of you.”</div>
                                        <div className="test_content" style={{ textAlign: 'center' }}>
                                            <div className="test_name">Shan Ruan & Steve Yichen Li</div>
                                            <div className="test_title">Funders of S&S </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        // </div>

    )
}

export default Home;
