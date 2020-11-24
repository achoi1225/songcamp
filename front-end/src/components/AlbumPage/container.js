import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import * as followsActions from '../../store/follows';
import * as albumActions from '../../store/album';
import AlbumPage from './AlbumPage';

const AlbumPageContainer = () => {
    const { id } = useParams();
    // const albumId = Number.parseInt(id);

    return (
        <AlbumPage />
    );
}

export default AlbumPageContainer;