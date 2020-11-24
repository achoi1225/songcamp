import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';

const FollowBtn = ({following, handleFollow, handleDeleteFollowBtn, artistId}) => {
    // const [isFollowingArtist, setIsFollowingArtist] = useState(false);
    // const [isLoaded, setIsLoaded] = useState(false);

    let isFollowingArtist;
    console.log('ARTIST ID!!!', artistId)

    for(const property in following) {
        if(following[property].followingId === artistId) {
            isFollowingArtist=true;
            console.log("TRUE!!!");
            break;
        }
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