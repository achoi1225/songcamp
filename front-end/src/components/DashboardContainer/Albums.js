import React from 'react';

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
                        <button onClick={() => handleEditAlbumBtn(album.id)} className="album__edit-btn">edit</button>
                    </div>
                )
            })
        }
        </>
    )
}

export default Albums;