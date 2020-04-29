import React from 'react';
import { Link } from 'react-router-dom';
import manifyingGlass from '../../assets/images/magnifying-glass.svg';
import '../../utils/custom';

export const Menu = () => {
    return (
        <div className="menu d-flex flex-column align-items-end justify-content-start text-right menu_mm trans_400">
            <div className="menu_close_container"><div className="menu_close"><div></div><div></div></div></div>
            <div className="logo menu_mm"><a href="#">S&S Jewery</a></div>
            <div className="search">
                {/* <form action="#">
                    <input type="search" class="search_input menu_mm" required="required">
                        <button type="submit" id="search_button" class="search_button menu_mm"><img class="menu_mm" src="images/magnifying-glass.svg" alt=""></button>
			</form> */}
		</div>
                    <nav className="menu_nav">
                        <ul className="menu_mm">
                            <li className="menu_mm"><Link to="/">Home</Link></li>
                            <li className="menu_mm"><Link to="/shop">Shop</Link></li>
                            <li className="menu_mm"><Link to="/contact">Contact</Link></li>
                        </ul>
                    </nav>
	</div>
    )
}
export default Menu;