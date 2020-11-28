import React, { useState,useEffect, useContext } from "react";
import { NavLink, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import './nav.css';
import LoginForm from '../SignupPage/LoginForm';
import SignupButton from '../SignupPage/SignupButton';
import LoginButton from '../SignupPage/LoginButton';
import FanSignupForm from '../SignupPage/FanSignupForm';
import RoleForm from '../SignupPage/RoleForm';
import { showFanSignupForm, hideFanSignupForm } from '../../store/ui-fan-signup-form';
import { showArtistSignupForm, hideArtistSignupForm } from '../../store/ui-artist-signup-form';
import { showLoginForm, hideLoginForm } from '../../store/ui-login-form';
import { showRoleForm, hideRoleForm } from '../../store/ui-role-form';
// import SignupButton from './SignupButton';
// import LoginButton from './LoginButton';
// import FanSignupForm from './FanSignupForm';
// import LoginForm from './LoginForm';
// import RoleForm from './RoleForm';
// import { showFanSignupForm, hideFanSignupForm } from '../store/actions/ui-fan-signup-form';
// import { showLoginForm, hideLoginForm } from '../store/actions/ui-login-form';
// import { showRoleForm, hideRoleForm } from '../store/actions/ui-role-form';

const Nav = () => {
    const [searchValue, setSearchValue] = useState('');
    const [role, setRole] = useState('');
    const fanSignupFormVisible = useSelector(state => state.fanSignupForm.formVisible);
    const artistSignupFormVisible = useSelector(state => state.artistSignupForm.formVisible);
    const loginFormVisible = useSelector(state => state.loginForm.formVisible);
    const roleFormVisible = useSelector(state => state.roleForm.formVisible);
    const dispatch = useDispatch();

    console.log("ROLE IS:", role);
    // console.log("IS FAN SIGN UP FORM VISIBLE?:", fanSignupFormVisible);

    const updateProperty = (e) => {
        console.log("SEARCH BAR!!!!", e.target.value);
    }

    return (
        <nav>
            <div className="nav__logo-holder">
                    Songcamp
            </div>
            <div className="nav__form-holder">
                <form>
                    <input className={"search-field"}
                        type="text"
                        placeholder="Search and discover music"
                        value={searchValue}
                        onChange={updateProperty}
                    />
                </form>
            </div>
            <SignupButton 
                showRoleForm={ () => dispatch(showRoleForm()) }
            />
            <LoginButton 
                showLoginForm={ () => dispatch(showLoginForm()) }
            />
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
                ( <FanSignupForm hideFanSignupForm={ () => dispatch(hideFanSignupForm()) } /> ) : null }
            { loginFormVisible ? 
                ( <LoginForm hideLoginForm={ () => dispatch(hideLoginForm()) } /> ) : null } 
           
        </nav>
    )
}

export default Nav;