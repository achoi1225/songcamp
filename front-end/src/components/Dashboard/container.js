import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { uploadPhoto, deletePhoto, getUser, editBio } from '../store/actions/user'; 
import * as followsActions from '../../store/follows';
import * as albumsActions from '../../store/albums';
import * as userActions from '../../store/user';
import Dashboard from './Dashboard';

const DashboardContainer = () => {
    // const userId = localStorage.getItem(USER_ID);
    // const dispatch = useDispatch();
    // const sessionUser = useSelector(state => state.session.user);
    // const followers = useSelector((state) => state.follows.followersList);
    // const following = useSelector((state) => state.follows.followingList);
    // const albums = useSelector((state) => state.albums.listForOneArtist);
    //     return null;
    // }


    return (
        <Dashboard 
            // user={sessionUser}
            // followers={followers}
            // following={following}
            // albums={albums}
            // getFollowers={(id) => dispatch(followsActions.getFollowers(id))}
            // getFollowing={(id) => dispatch(followsActions.getFollowing(id))}
            // getAllAlbumsForOneArtist={(userId) => dispatch(albumsActions.getAllAlbumsForOneArtist(userId))}
            // editBio={(userId) => dispatch(userActions.editBio(userId))}
        />
    );
}

export default DashboardContainer;