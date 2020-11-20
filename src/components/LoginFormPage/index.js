import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

import * as sessionActions from '../../store/session';

const LoginFormPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) return (
        <Redirect to="/" />
      );

    const updateProperty = (property) => (e) => {
        property(e.target.value);
    }

    const handleClose = (e) => {
        console.log('close');
        // hideLoginForm();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            credential,
            password,
        }

        return dispatch(sessionActions.login({ credential, password }))
                .catch((res) => {
                    if (res.data && res.data.errors) setErrors(res.data.errors);
        });

        // hideLoginForm();
    }

    return (
        <div className="signup-form-holder">
            <div className="signup-form-content">
                <div className="signup-form-header-container">
                    <h3 className="signup-form-header">Log in</h3> <span onClick={handleClose} className="signup-form-close-btn">x</span>
                </div>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <form className="signup-form">
                    <label>Email address</label>
                    <input name="email" placeholder={credential} value={credential} onChange={updateProperty(setCredential)}/>
                    <label>Password</label>
                    <input type="password" name="password" placeholder={password} value={password} onChange={updateProperty(setPassword)}/>
                    <button onClick={handleSubmit}>Log in</button>
                </form>
            </div>
        </div>
    )
}

export default LoginFormPage;