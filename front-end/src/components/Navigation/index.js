import React from 'react'
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import '../../css/navigation.css'
import ProfileButton from './ProfileButton';

export const Navigation = ({ isLoaded }) => {
    const sessionUser = useSelector((state) => state.session.user);

    console.log("USER", sessionUser);
    if(!isLoaded) {
        return null;
    }

    return (
        <>
        {
            sessionUser ? <ProfileButton user={sessionUser} /> :
            <div>
                <NavLink exact to="/">Home</NavLink>
                <NavLink exact to="/login">Login</NavLink>
                <NavLink exact to="/signup">Signup</NavLink>
            </div>
        }
        </>
    )
}

export default Navigation;
