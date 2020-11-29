import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useParams } from 'react-router-dom';
import * as sessionActions from "../../store/session";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import './profile-button.css'

export const ProfileButton = ({ user }) => {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
      };
      
      useEffect(() => {
        if (!showMenu) return;
    
        const closeMenu = () => {
          setShowMenu(false);
        };
    
        document.addEventListener('click', closeMenu);
      
        return () => document.removeEventListener("click", closeMenu);
      }, [showMenu]);
    
      const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
      };
    
      return (
        <>
          <button id="target" className="profile-button" onClick={openMenu}>
                <AccountCircleIcon fontSize='large' />
          </button>
          {showMenu && (
            <ul className="profile-dropdown">
              <li>{user.userName}</li>
              {/* <li>{user.artistName}</li> */}
              <li>
                <NavLink className="profile__dashboard-link" exact to="/dashboard">
                  Dashboard
                </NavLink>
              </li>
              <li>
                <button className="profile__logout" onClick={logout}>Log Out</button>
              </li>
            </ul>
          )}
        </>
      );
    }
    
    export default ProfileButton;
