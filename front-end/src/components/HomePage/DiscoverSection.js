import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import * as albumsActions from '../../store/albums';

export const DiscoverSection = () => {

    const randomAlbums = useSelector((state) => state.albums.randomAlbumsList)
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            await dispatch(albumsActions.getRandomAlbums());
        })()
    },[]);

    return (
        <div className="discover__holder">
                    <div className="discover__header">DISCOVER</div>
                    <div className="discover">
                        {randomAlbums && randomAlbums.map((album) => {
                            return (
                                <div key={album.id} class="discover__album-holder">
                                    <NavLink exact to={`/albums/${album.id}`}>
                                        <div 
                                            className="discover__album"
                                            style={{backgroundImage: `url(${album.imgUrl})`}}
                                        >
                                        </div>
                                    </NavLink>
                                    <NavLink className="discover__album-link" exact to={`/albums/${album.id}`}>
                                        <h6 className="discover__album-title">
                                            {album.title}
                                        </h6>
                                    </NavLink>
                                    <span className="discover__artist-name">
                                        {album.artist.artistName}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                </div>
    )
}

export default DiscoverSection;
