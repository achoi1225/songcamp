import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as albumActions from '../../store/album';
import * as tracksActions from '../../store/tracks';
import EditAlbumPage from './EditAlbumPage';


const EditAlbumPageContainer = () => {
    const sessionUser = useSelector((state) => state.session.user)
    const album = useSelector((state) => state.album.current)
    const dispatch = useDispatch();

    return (
        <EditAlbumPage 
            user={sessionUser}
            album={album}
            // createAlbum={(data) => dispatch(albumActions.createAlbum(data))}
            // getOneAlbum={(albumId) => dispatch(albumActions.getOneAlbum(albumId))}
            editAlbum={(data, albumId) => dispatch(albumActions.editAlbum(data, albumId))}
            deleteAlbumArtwork={(data, albumId) => dispatch(albumActions.deleteAlbumArtwork(data, albumId))}
            publishAlbum={(data, albumId) => dispatch(albumActions.publishAlbum(data, albumId))}
            createTrack={(data) => dispatch(tracksActions.createTrack(data))}
            editTrackTitle={(data, trackId) => dispatch(tracksActions.editTrackTitle(data, trackId))}
            deleteTrack={(trackId) => dispatch(tracksActions.deleteTrack(trackId))}
        />
    );
}

export default EditAlbumPageContainer;