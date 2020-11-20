import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

import * as sessionActions from "../../store/session";

// import { getUser} from "../store/actions/user";
// import { setToken } from "../store/actions/authentication";
import './modal-form.css';

const LoginForm = ({ hideLoginForm }) => {
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
        hideLoginForm();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('IN HANDLESUBMIT!!!');

        return dispatch(sessionActions.login({ credential, password }))
                .then(() => hideLoginForm())
                .catch((res) => {
                    if (res.data && res.data.errors) setErrors(res.data.errors);
        });
    }

    return (
        <div className="form-holder">
            <div className="form-content">
                <div className="form-header-container">
                    <h3 className="form-header">Log in</h3> <span onClick={handleClose} className="form-close-btn">x</span>
                </div>
                <form className="form">
                    <ul>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
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

export default LoginForm;