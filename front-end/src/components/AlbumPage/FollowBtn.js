import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as followsActions from '../../store/follows';

const FollowBtn = ({ artistId }) => {
 
    const dispatch = useDispatch();
    const following = useSelector((state) => state.follows.followingList);
    const [isFollowingArtist, setIsFollowingArtist] = useState(false);

    
    useEffect(() => {
        const checkIfFollowing = (f) => {
            return f.id === artistId;
        }

        setIsFollowingArtist(following.some(checkIfFollowing));
    },[following, artistId])

    const handleFollow = (e) => {
        dispatch(followsActions.follow(artistId))
            .then(setIsFollowingArtist(true));
    }

    const handleDeleteFollowBtn = (e) => {
        dispatch(followsActions.deleteFollow(artistId))
            .then(setIsFollowingArtist(false));
    }

    return (
        <>
            { isFollowingArtist ? (
                <button onClick={handleDeleteFollowBtn} className="follow-btn">
                    <span>Following <i className="fa fa-check-circle-o" aria-hidden="true"></i></span>
                </button>
                ) : (
                    <button onClick={handleFollow} className="follow-btn">
                        <span>Follow</span>
                    </button>
                )
            }
        </>
    )
}

export default FollowBtn;