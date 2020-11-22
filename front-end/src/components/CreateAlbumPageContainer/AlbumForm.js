import React from 'react';


const AlbumForm = ({ 
    updateProperty, 
    albumTitle, 
    setAlbumTitle, 
    description, 
    setDescription, 
    setImg,
    credits,
    setCredits,
    handleCreateAlbumSubmitBtn,
    albumFormErrors }) => {
    
    return (
        <div className="album-edit-page__album-detail-form" >
            <ul>
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
                placeholder={description ? (description) : (null)} 
                value={description} 
                onChange={updateProperty(setDescription)}>
            </textarea>
            <label>credits:</label>
            <textarea 
                name="credits" 
                placeholder={credits} 
                value={credits}
                onChange={updateProperty(setCredits)}>
            </textarea>
            <button onClick={handleCreateAlbumSubmitBtn}>Submit</button>
        </div>
    )
}

export default AlbumForm;