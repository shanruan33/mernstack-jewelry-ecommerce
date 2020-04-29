import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="row">
        <div className="col text-center">
          <div className="footer_logo"><Link to="/">S&S Jewery</Link></div>
          <nav className="footer_nav">
            <ul>
              <li><Link to="/">home</Link></li>

              <li><Link to="/shop">shop</Link></li>

              <li><Link to="/contact">contact</Link></li>
            </ul>
          </nav>
          <div className="footer_social">
            <ul>
              <li><a href="#"><i className="fa fa-pinterest" aria-hidden="true"></i></a></li>
              <li><a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a></li>
              <li><a href="#"><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
              <li><a href="#"><i className="fa fa-reddit-alien" aria-hidden="true"></i></a></li>
              <li><a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
            </ul>
          </div>
          <div className="copyright">
            Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved
</div>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer;
