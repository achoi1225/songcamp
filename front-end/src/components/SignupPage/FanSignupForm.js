import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { Redirect } from "react-router-dom";

import './modal-form.css';
import * as sessionActions from "../../store/session";

const FanSignupForm = ({ hideFanSignupForm }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [errors, setErrors] = useState([]);
    const isArtist = false;
    const artistName = null;
    const bio= null; 
    const imgUrl= null;
    const genre= null;
    const dispatch = useDispatch();


    const updateProperty = (property) => (e) => {
        console.log(e.target.value)
        property(e.target.value);
    }

    const handleClose = (e) => {
        hideFanSignupForm();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('IN HANDLESUBMIT!!!');
        const payload = {
            email,
            password,
            userName,
            artistName,
            isArtist,
            bio,
            imgUrl,
            genre,
        }

        if (password === confirmPassword) {
            setErrors([]);
            hideFanSignupForm();
            return dispatch(sessionActions.fanSignup(payload))
              .catch(res => {
                if (res.data && res.data.errors) setErrors(res.data.errors);
              });
            }
            return setErrors(['Confirm Password field must be the same as the Password field']);
        
        // (async () => {
        //     const successMessage = dispatch(FanSignup(payload));
        //     if(successMessage) {
        //     }
        // })();
    }

    return (
        <div className="form-holder">
            <div className="form-content">
                <div className="form-header-container">
                    <h3 className="form-header">Sign up for a Songcamp fan account</h3> <span onClick={handleClose} className="form-close-btn">x</span>
                </div>
                <form className="form">
                    <ul>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                    <label>Email address</label>
                    <input name="email" placeholder={email} value={email} onChange={updateProperty(setEmail)}/>
                    <label>Password</label>
                    <input type="password" name="password" placeholder={password} value={password} onChange={updateProperty(setPassword)}/>
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <label>Username</label>
                    <input type="text" name="username" placeholder={userName} value={userName} onChange={updateProperty(setUserName)} />
                    <label>
      </label>
                    <button onClick={handleSubmit}>Sign up</button>
                </form>
            </div>
        </div>
    )
}

export default FanSignupForm;
