import React from "react";
import { NavLink, useLocation, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

import './nav.css';
import ProfileButton from './ProfileButton';
import LoginForm from '../SignupPage/LoginForm';
import SignupButton from '../SignupPage/SignupButton';
import LoginButton from '../SignupPage/LoginButton';
// import FanSignupForm from '../SignupPage/FanSignupForm';
import RoleForm from '../SignupPage/RoleForm';
import { showFanSignupForm } from '../../store/ui-fan-signup-form';
import { showArtistSignupForm } from '../../store/ui-artist-signup-form';
import { showLoginForm, hideLoginForm } from '../../store/ui-login-form';
import { showRoleForm, hideRoleForm } from '../../store/ui-role-form';

const Nav = () => {
    const artistSignupFormVisible = useSelector(state => state.artistSignupForm.formVisible);
    const loginFormVisible = useSelector(state => state.loginForm.formVisible);
    const roleFormVisible = useSelector(state => state.roleForm.formVisible);
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const location = useLocation();

    if(location.pathname === '/signup') return null

    return (
        <nav>
            <div className="nav__logo-holder">
                <NavLink className="nav__homepage-link" activeClassName="nav__homepage-link" exact to="/">
                    <i className="fas fa-campground nav__tent-logo"></i>   
                    songcamp
                </NavLink>
                <span className="nav__discover">Discover new music and support the artists that make it!</span>
            </div>
            {/* <div className="nav__form-holder">
                <form>
                    <input className={"search-field"}
                        type="text"
                        placeholder="Search and discover music"
                        value={searchValue}
                        onChange={updateProperty}
                    />
                </form>
            </div> */}
            <>
            {
                sessionUser ? <ProfileButton user={sessionUser} /> :
                    <>
                        {/* <NavLink exact to="/">Home</NavLink> */}
                        <SignupButton 
                            showRoleForm={ () => dispatch(showRoleForm()) }
                        />
                        <LoginButton 
                            showLoginForm={ () => dispatch(showLoginForm()) }
                        />
                    </>
            }
            </>
            { roleFormVisible ? 
                ( 
                    <RoleForm 
                        hideRoleForm={ () => dispatch(hideRoleForm()) } 
                        showFanSignupForm={ () => dispatch(showFanSignupForm()) } 
                        showArtistSignupForm={ () => dispatch(showArtistSignupForm()) } 

                    /> 
                ) : null 
            }
            { artistSignupFormVisible ? 
                ( <Redirect to="/signup" /> ) : null }
            { loginFormVisible ? 
                ( <LoginForm hideLoginForm={ () => dispatch(hideLoginForm()) } /> ) : null } 
           
        </nav>
    )
}

export default Nav;