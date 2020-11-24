import React from 'react'
import { NavLink } from 'react-router-dom';

export const Followers = ({ followers }) => {
    return (
        <>
        {followers && followers.map((follower) => {
                return(
                    <NavLink key={follower.id} className="followers__link" exact to="">
                        <div className="followers__photo-holder">
                            <div className="followers__photo" style={{backgroundImage: `url(${follower.imgUrl})`}}>

                            </div>
                            {follower.userName}
                        </div>
                    </NavLink>
                )
            })
        
        }
        </>
    )
}

export default Followers;
