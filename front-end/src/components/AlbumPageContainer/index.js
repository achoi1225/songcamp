import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
// import {USER_ID} from '../store/actions/authentication';
// import { getUser } from '../store/actions/user'; 
// import { getFollowing, follow, deleteFollow } from '../store/actions/follows';
// import { getOneAlbum } from '../store/actions/album';
import * as followsActions from '../../store/follows';
import * as albumActions from '../../store/album';
import AlbumPage from './AlbumPage';

const AlbumPageContainer = () => {
    // const userId = localStorage.getItem(USER_ID);
    const { id } = useParams();
    const albumId = Number.parseInt(id);

    const dispatch = useDispatch();
    
    // const user = useSelector((state) => state.user.data);
    const sessionUser = useSelector(state => state.session.user);

    // const follows = useSelector((state) => state.follows.list);
    const followers = useSelector((state) => state.follows.followersList);
    const following = useSelector((state) => state.follows.followingList);

    // const current = useSelector((state) => state.album.current);
    const album = useSelector((state) => state.album.current);


    // useEffect(() => {
    //     dispatch(getFollowing());
    //     // dispatch(getUser());
    // }, []);

    // useEffect(() => {
    //     dispatch(getOneAlbum(albumId));
    // }, [albumId]);
    
    // if(!user || !follows) {
    //     return null;
    // }

    return (
        <AlbumPage
            // getOneAlbum={(albumId) => dispatch(getOneAlbum(albumId))}
            user={sessionUser}
            followers={followers}
            following={following}
            album={album}
            getOneAlbum={(artistId) => dispatch(albumActions.getOneAlbum(artistId))}
            follow={(followingId) => dispatch(followsActions.follow(followingId))}
            getFollowers={(artistId) => dispatch(followsActions.getFollowers(artistId))}
            getFollowing={(userId) => dispatch(followsActions.getFollowing(userId))}
            deleteFollow={(id) => dispatch(followsActions.deleteFollow(id))}
        />
    );
}

export default AlbumPageContainer;