import React from 'react'
import { NavLink, useParams } from 'react-router-dom';

import './footer.css';

export const Footer = () => {
    return (
        <div className="footer__holder">
            <div className="footer__content">
                <div className="col-1">
                    <NavLink activeClassName="footer__links" className="footer__links" exact to="">
                        About Us
                    </NavLink>
                    <NavLink  activeClassName="footer__links" className="footer__links" exact to="">
                        Terms of Us
                    </NavLink>
                    <NavLink  activeClassName="footer__links" className="footer__links" exact to="">
                        Privacy
                    </NavLink>
                    <NavLink activeClassName="footer__links" className="footer__links" exact to="">
                        Copyright Policy
                    </NavLink>
                </div>
                <div className="col-2">
                <NavLink activeClassName="footer__links" className="footer__links" exact to="">
                        Facebook
                    </NavLink>
                    <NavLink  activeClassName="footer__links" className="footer__links" exact to="">
                        Twitter
                    </NavLink>
                    <NavLink  activeClassName="footer__links" className="footer__links" exact to="">
                        Instagram
                    </NavLink>
                    <NavLink activeClassName="footer__links" className="footer__links" exact to="">
                        Contact/Help
                    </NavLink>
                </div>
                <div className="col-3">
                    <NavLink activeClassName="footer__links" className="footer__links" exact to="">
                        Signup
                    </NavLink>
                    <NavLink  activeClassName="footer__links" className="footer__links" exact to="">
                        Logout
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default Footer;
