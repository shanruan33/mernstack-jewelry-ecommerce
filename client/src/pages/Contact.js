import React from 'react'
import { Link } from 'react-router-dom';
import ContactBackground from '../assets/home/category.jpg';
import contact1 from '../assets/images/contact_info_1.png';
import contact2 from '../assets/images/contact_info_2.png';
import contact3 from '../assets/images/contact_info_3.png';
import '../utils/custom';

export const Contact = () => (

    <div>

        <div className="home_background" style={{ backgroundImage: `url(${ContactBackground})` }} ></div>
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="home_container">
                        <div className="home_content">
                            <div className="home_title">Contact</div>
                            <div className="breadcrumbs">
                                <ul>
                                    <li><Link to="/">Home</Link></li>
                                    <li>Contact</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="contact">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="review_form_container">
                            <div className="review_form_title">get in touch</div>
                            <div className="review_form_content">
                                <form action="#" id="review_form" className="review_form">
                                    <div className="d-flex flex-md-row flex-column align-items-start justify-content-between">
                                        <input type="text" className="review_form_input" placeholder="Name" required="required" />
                                        <input type="email" className="review_form_input" placeholder="E-mail" required="required" />
                                        <input type="text" className="review_form_input" placeholder="Subject" />
                                    </div>
                                    <textarea className="review_form_text" name="review_form_text" placeholder="Message"></textarea>
                                    <button type="submit" className="review_form_button">send message</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>



        <div className="contact_text">
            <div className="container">
                <div className="row">


                    <div className="col-lg-5">

                        <div className="contact_info">
                            <div className="contact_title">contact info</div>
                            <div className="contact_info_content">
                                <ul>
                                    <li>
                                        <div className="contact_info_icon"><img src={contact1} alt="" /></div>
                                        <div className="contact_info_text">Rosia Road, no67, Gibraltar UK</div>
                                    </li>
                                    <li>
                                        <div className="contact_info_icon"><img src={contact2} alt="" /></div>
                                        <div className="contact_info_text">office@yourbusiness.com</div>
                                    </li>
                                    <li>
                                        <div className="contact_info_icon"><img src={contact3} alt="" /></div>
                                        <div className="contact_info_text">+45 7703 29293 34</div>
                                    </li>
                                </ul>
                            </div>
                            <div className="contact_info_social">
                                <ul>
                                    <li><a href="#"><i className="fa fa-pinterest" aria-hidden="true"></i></a></li>
                                    <li><a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a></li>
                                    <li><a href="#"><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
                                    <li><a href="#"><i className="fa fa-reddit-alien" aria-hidden="true"></i></a></li>
                                    <li><a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>


                    <div className="col-lg-7">
                        <div className="faq">
                            <div className="contact_title">faq</div>
                            <div className="faq_content">


                                <div className="accordions">

                                    <div className="accordion_container">
                                        <div className="accordion d-flex flex-row align-items-center"><div>Lorem ipsum dolor sit amet, consectetur?</div></div>
                                        <div className="accordion_panel">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis quam ipsum. Pellentesque consequat tellus non tortor tempus, id egestas elit iaculis. Proin eu dui porta, pretium metus vitae, pharetra odio. Sed ac mi commodo, pellentesque erat eget, accumsan justo.</p>
                                        </div>
                                    </div>

                                    <div className="accordion_container">
                                        <div className="accordion d-flex flex-row align-items-center"><div>Ipsum dolor sit amet, consectetur?</div></div>
                                        <div className="accordion_panel">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis quam ipsum. Pellentesque consequat tellus non tortor tempus, id egestas elit iaculis. Proin eu dui porta, pretium metus vitae, pharetra odio. Sed ac mi commodo, pellentesque erat eget, accumsan justo.</p>
                                        </div>
                                    </div>

                                    <div className="accordion_container">
                                        <div className="accordion d-flex flex-row align-items-center"><div>Ipsum dolor sit amet, consectetur?</div></div>
                                        <div className="accordion_panel">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis quam ipsum. Pellentesque consequat tellus non tortor tempus, id egestas elit iaculis. Proin eu dui porta, pretium metus vitae, pharetra odio. Sed ac mi commodo, pellentesque erat eget, accumsan justo.</p>
                                        </div>
                                    </div>

                                    {/* <div className="accordion_container">
                                        <div className="accordion d-flex flex-row align-items-center active"><div>Proin eu dui porta, pretium metus vitae?</div></div>
                                        <div className="accordion_panel">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis quam ipsum. Pellentesque consequat tellus non tortor tempus, id egestas elit iaculis. Proin eu dui porta, pretium metus vitae, pharetra odio. Sed ac mi commodo, pellentesque erat eget, accumsan justo.</p>
                                        </div>
                                    </div> */}

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

)

export default Contact;