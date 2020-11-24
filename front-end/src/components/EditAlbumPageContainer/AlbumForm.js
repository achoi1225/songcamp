import React from 'react';


const AlbumForm = ({ 
    album,
    updateProperty, 
    albumTitle, 
    setAlbumTitle, 
    description, 
    setDescription, 
    setImg,
    credits,
    setCredits,
    handleEditAlbumBtn,
    albumFormErrors }) => {
    
    return (
        <div className="album-edit-page__album-detail-form" >
            <ul className="errors">
                {albumFormErrors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <label className="album-edit-page__album-title-label">ALBUM TITLE</label>
            <input className="album-edit-page__album-title-input" 
                type="text" name="albumTitle" 
                value={albumTitle}
                onChange={updateProperty(setAlbumTitle)}>
            </input>
            <label>upload album art:</label>
            <input className="album-edit-page__upload-input"
                type="file"
                onChange={(e) => setImg(e.target.files[0])}
            />
            <label>about this album:</label>
            <textarea 
                name="description" 
                value={description} 
                onChange={updateProperty(setDescription)}>
            </textarea>
            <label>credits:</label>
            <textarea 
                name="credits" 
                value={credits}
                onChange={updateProperty(setCredits)}>
            </textarea>
            
            { !album ? 
                <>
                    {/* <span className="album-edit-page__submit-instruction">Submit to start adding songs!</span>
                    <button type="submit" className="album-edit-page__submit-btn" onClick={handleCreateAlbumSubmitBtn}>
                        Submit
                    </button>  */}
                    null
                </> :
                <button type="submit" className="album-edit-page__edit-btn" onClick={handleEditAlbumBtn}>Edit</button>
            }
        </div>
    )
}

export default AlbumForm;