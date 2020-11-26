import React from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import '../../css/navigation.css'
import ProfileButton from './ProfileButton';

export const Navigation = ({ isLoaded }) => {
    const sessionUser = useSelector((state) => state.session.user);
    const location = useLocation();
    console.log("PATHNAME!! ", location.pathname);
    // console.log("USER", sessionUser);
    if(location.pathname === '/signup') return null

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
