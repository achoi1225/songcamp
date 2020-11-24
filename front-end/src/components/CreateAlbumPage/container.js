import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { uploadPhoto, deletePhoto, getUser, editBio } from '../store/actions/user'; 

// import {USER_ID} from '../store/actions/authentication';
// import { createAlbum } from '../store/actions/album';
// import { createTrack } from '../store/actions/track';

import * as albumActions from '../../store/album';
import * as tracksActions from '../../store/tracks';
// import CreateAlbumPage from './CreateAlbumPage';


const CreateAlbumPageContainer = () => {
    const sessionUser = useSelector((state) => state.session.user)
    const album = useSelector((state) => state.album.current)
    const dispatch = useDispatch();

    return (
        <CreateAlbumPage 
            // user={sessionUser}
            // album={album}
            // createAlbum={(data) => dispatch(albumActions.createAlbum(data))}
            // editAlbum={(data, albumId) => dispatch(albumActions.editAlbum(data, albumId))}
            // deleteAlbumArtwork={(data, albumId) => dispatch(albumActions.deleteAlbumArtwork(data, albumId))}
            // publishAlbum={(data, albumId) => dispatch(albumActions.publishAlbum(data, albumId))}
            // createTrack={(data) => dispatch(tracksActions.createTrack(data))}
            // editTrackTitle={(data, trackId) => dispatch(tracksActions.editTrackTitle(data, trackId))}
            // deleteTrack={(trackId) => dispatch(tracksActions.deleteTrack(trackId))}
        />
    );
}

export default CreateAlbumPageContainer;