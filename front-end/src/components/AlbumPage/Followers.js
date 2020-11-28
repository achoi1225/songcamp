import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as followsActions from '../../store/follows';

export const Followers = ({ artistId }) => {
    const dispatch = useDispatch();
    const followers = useSelector((state) => state.follows.followersList);

    useEffect(() => {
        dispatch(followsActions.getFollowers(artistId))
    },[artistId, dispatch])

    if(!followers || followers.length === 0) {
        return null
    }

    return (
        <>
        <div className="album-page__followers-header">
            supported by
        </div>
        <div className="album-page__followers-holder">
            {followers.map((follower) => {
                return (
                    <div key={follower.id} className="album-page__followers-photo-holder">
                        <div 
                            className="album-page__followers-photo" 
                            style={{backgroundImage: `url(${follower.imgUrl})`}}>
                        </div>
                        <div className="album-page__followers-name">
                            {follower.userName}
                        </div>
                    </div>    
                )
            })}
        </div>
        </>
    )
}

export default Followers;
