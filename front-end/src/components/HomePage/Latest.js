import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import * as albumsActions from '../../store/albums';

export const Latest = () => {
    const dispatch = useDispatch();
    const newAlbums = useSelector((state) => state.albums.newestAlbumsList)

    useEffect(() => {
        (async () => {
            await dispatch(albumsActions.getNewAlbums());
            
        })()
    },[dispatch]);

    return (
        <>
        <div className="latest__header">LATEST</div>
        <div className="latest__holder">
            {newAlbums && newAlbums.map((album) => {
                return(
                    <>
                        <>
                            <div className="latest__album-holder">
                                <NavLink exact to={`/albums/${album.id}`}>
                                    <div key={album.id}
                                        className="latest__album"
                                        style={{backgroundImage: `url(${album.imgUrl})`}}
                                    >
                                    </div>
                                </NavLink>
                                <div className="latest__description">
                                    <NavLink className="latest__album-link" exact to={`/albums/${album.id}`}>
                                        <h5 className="latest__album-header">{album.title}</h5> 
                                        <h5 className="latest__album-header">by {album.artist.artistName}</h5> 
                                    </NavLink>
                                    <span className="latest__genre">{album.artist.genre}</span>
                                    {album.description}
                                </div>
                            </div>
                        </>
                    </>
                )
                
            })}
        </div>
        </>
    )
}

export default Latest;
