import React from 'react';
import { NavLink } from 'react-router-dom';

const Albums = ({ albums, handleEditAlbumBtn }) => {
    return(
        <>
        {
            albums.map((album) => {
                return(
                    <div key={album.id} className="album__holder">
                        <div className="album__artwork" style={{backgroundImage: `url(${album.imgUrl})`}}>
                            {
                                !album.isPublished ?
                                <div className="album__draft">
                                    draft
                                </div> :
                                null
                            }
                        </div>
                        <div className="album__title">
                            {album.title}
                        </div>
                        <NavLink exact to={`/edit-album/${album.id}`} className="album__edit-link">
                            edit 
                        </NavLink>
                    </div>
                )
            })
        }
        </>
    )
}

export default Albums;