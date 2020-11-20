import React from 'react';

const LoginButton = ({showLoginForm}) => {

    const handleClick = () => {
        showLoginForm();
    }

    return (
        <div>
            <button onClick={handleClick}>log in</button>
        </div>
    )
}

export default LoginButton;