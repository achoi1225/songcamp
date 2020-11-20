import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { showFanSignupForm } from "../store/actions/ui-fan-signup-form";
// import * as fanSignupFormActions from "../../store/ui-fan-signup-form";

// import { FanSignup } from "../store/actions/authentication";
// import { setToken } from "../store/actions/authentication";
import './modal-form.css';
import artistOptionIcon from "../../images/artist-option-icon.png";
import fanOptionIcon from "../../images/fan-option-icon.png";

const RoleForm = ({ hideRoleForm, showFanSignupForm, showArtistSignupForm }) => {
    // const [role, setRole] = useState('');
    // const history = useHistory();

    const updateRole = (e) =>  {
        e.preventDefault();
        console.log(`USER CHOSE ${e.target.value} AS ROLE!!!!`);
        if(e.target.value === "fan") {
            showFanSignupForm();
        } else if(e.target.value === "artist") {
            showArtistSignupForm()
            // history.replace("/artist-signup");
        }

        // setRole(e.target.value);
        hideRoleForm();
    }

    const handleClose = (e) => {
        console.log('close');
        hideRoleForm();
    }

    return (
        <div className="form-holder">
            <div className="role-form-content">
                <div className="form-header-container">
                    <h3 className="form-header">Sign up for a Songcamp account</h3>
                    <span onClick={handleClose} className="form-close-btn">x</span>
                </div>

                <form className="role-form">
                    <div className="role-form__option-holder">
                        <img src={fanOptionIcon} />
                        <div className="role-form__button-holder">
                            <button className="role-form__fan-button" value="fan" onClick={updateRole}>Sign up as a fan</button>
                            <p>Follow your favorite artists!</p>
                        </div>
                    </div>

                    <div className="role-form__option-holder">
                        <img src={artistOptionIcon} />
                        <div className="role-form__button-holder">
                            <button className="role-form__artist-button" value="artist" onClick={updateRole}>Sign up as an artist</button>
                            <p>Share your music with your fans!</p>
                        </div>
                    </div>

                    {/* <button value="artist" onClick={updateRole}>Sign up as an artist</button> */}
                </form>
            </div>
        </div>
    )
}

export default RoleForm;