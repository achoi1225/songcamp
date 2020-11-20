import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { uploadPhoto, deletePhoto, getUser, editBio } from '../store/actions/user'; 
import {USER_ID} from '../store/actions/authentication';
import { getFollowers } from '../store/actions/follows';
import { getAllAlbumsForOneArtist } from '../store/actions/albums';
import Dashboard from './Dashboard';

const DashboardContainer = () => {
    // const userId = localStorage.getItem(USER_ID);
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const followers = useSelector((state) => state.follows.followersList);
    const albums = useSelector((state) => state.albums.listForOneArtist);
    //     return null;
    // }


    return (
        <Dashboard 
            user={sessionUser}
            followers={followers}
            albums={albums}
            getFollowers={() => dispatch(getFollowers())}
            getAllAlbumsForOneArtist={(userId) => dispatch(getAllAlbumsForOneArtist(userId))}
        />
    );
}

export default DashboardContainer;