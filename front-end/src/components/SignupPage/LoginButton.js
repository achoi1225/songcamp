import React from 'react';

const LoginButton = ({showLoginForm}) => {

    const handleClick = () => {
        showLoginForm();
    }

    return (
        <div>
            <button className="signup-login-btn" onClick={handleClick}>log in</button>
        </div>
    )
}

export default LoginButton;