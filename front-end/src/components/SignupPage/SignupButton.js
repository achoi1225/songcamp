import React from 'react';

const SignupButton = ({ showRoleForm }) => {

    const handleClick = (e) => {
        showRoleForm();
    }

    return (
        <div>
            <button onClick={handleClick}>sign up</button>
        </div>
    )
}

export default SignupButton;