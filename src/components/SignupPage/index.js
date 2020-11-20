import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
import { useDispatch, useSelector, } from "react-redux";

import './signup-page.css';
import tent from '../../images/tent.png';
import SignupButton from './SignupButton';
import LoginButton from './LoginButton';
import FanSignupForm from './FanSignupForm';
import ArtistSignupPage from './ArtistSignupPage';

import LoginForm from './LoginForm';
import RoleForm from './RoleForm';
import { showFanSignupForm, hideFanSignupForm } from '../../store/ui-fan-signup-form';
import { showArtistSignupForm, hideArtistSignupForm } from '../../store/ui-artist-signup-form';
import { showLoginForm, hideLoginForm } from '../../store/ui-login-form';
import { showRoleForm, hideRoleForm } from '../../store/ui-role-form';
// import { FanSignup } from "../store/actions/authentication";

const SignupPage = ({ setNavVisible }) => {
    // const [role, setRole] = useState('');
    const fanSignupFormVisible = useSelector(state => state.fanSignupForm.formVisible);
    const artistSignupFormVisible = useSelector(state => state.artistSignupForm.formVisible);
    const loginFormVisible = useSelector(state => state.loginForm.formVisible);
    const roleFormVisible = useSelector(state => state.roleForm.formVisible);
    const dispatch = useDispatch();

    // const updateProperty = (property) => (e) => {
    //     console.log(e.target.value)
    //     property(e.target.value);
    // }

    // useEffect(() => {
    //     setNavVisible(false);
    // }, [])

    return (
        <>
            { fanSignupFormVisible ? 
                ( <FanSignupForm hideFanSignupForm={ () => dispatch(hideFanSignupForm()) } /> ) : null }
            { loginFormVisible ? 
                ( <LoginForm hideLoginForm={ () => dispatch(hideLoginForm()) } /> ) : null }  
            { roleFormVisible ? 
                ( 
                    <RoleForm 
                        hideRoleForm={ () => dispatch(hideRoleForm()) } 
                        showFanSignupForm={ () => dispatch(showFanSignupForm()) } 
                        showArtistSignupForm={ () => dispatch(showArtistSignupForm()) } 
                    /> 
                ) : null 
            }
            <div className="signup-page__holder">
                <div className="signup-page__top-row-holder">
                    <div className="signup-page__header-holder">

                            <div className="signup-page__logo-holder">
                                <img className="signup-page__tent-img" src={tent} />
                                <h3>songcamp</h3>
                            </div>
                            <div className="signup-page__discover">
                                Discover new and amazing music and support the artists who make it. 
                            </div>

                    </div>
                    <div className="signup-page__signup-login-btn-holder">
                        <SignupButton 
                            showRoleForm={ () => dispatch(showRoleForm()) }
                        />
                        <LoginButton 
                            showLoginForm={ () => dispatch(showLoginForm()) }
                        />
                    </div>
                </div>

                { artistSignupFormVisible ? 
                    (<ArtistSignupPage hideArtistSignupForm={hideArtistSignupForm} />) : 
                    (

                        <div className="signup-page__main-img-holder">
                            <div className="signup-page__message-holder">
                                <h2>Welcome to Songcamp</h2>
                                &nbsp;Listen. Create. Share.
                                <button>Sign Up Now</button>
                            </div>
                        </div>
                    )
                
                }

                <div className="signup-page__footer">
                    
                </div>
            </div>
        </>
    )
}

export default SignupPage;