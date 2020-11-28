import React, { useState  } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as albumActions from '../../store/album';

const AlbumForm = ({ 
    albumTitle, 
    setAlbumTitle, 
    description, 
    setDescription, 
    credits,
    setCredits,
    img,
    setImg,
    isPublished,
    setAlbumIsLoading,
    setCurrentIdx 
    }) => {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)
    const album = useSelector((state) => state.album.current)
    const [albumFormErrors, setAlbumFormErrors] = useState([]);

// UPDATE FORM PROPERTY
    const updateProperty = (property) => (e) => {
        e.preventDefault();
        property(e.target.value);
    }

// HANDLE CREATE ALBUM BUTTON
    const handleCreateAlbumSubmitBtn = (e) => {
        e.preventDefault();
        setAlbumIsLoading(true);

        const data = new FormData();
        data.append("title", albumTitle);
        data.append("description", description);
        data.append("credits", credits);
        data.append("isPublished", isPublished);
        data.append("file", img);
        data.append("artistId", user.id);

        (async () => {
            try{
                await dispatch(albumActions.createAlbum(data));
                await setCurrentIdx(1);
                await setImg("");
                await setAlbumFormErrors([]);
                await setAlbumIsLoading(false);
            } catch(res) {
                await setAlbumIsLoading(false);
                if (res.data && res.data.errors) setAlbumFormErrors(res.data.errors);
            }
        })()
    }

// HANDLE EDIT ALBUM BUTTON
    const handleEditAlbumBtn = (e) => {
        e.preventDefault();
        setAlbumIsLoading(true);

        const data = new FormData();
        data.append("title", albumTitle);
        data.append("description", description);
        data.append("credits", credits);
        data.append("isPublished", isPublished);
        data.append("file", img);
        data.append("artistId", user.id);

        (async () => {
            try{
                await dispatch(albumActions.editAlbum(data, album.id));
                await setImg("");
                await setAlbumFormErrors([]);
                await setAlbumIsLoading(false);
            } catch(res) {
                setAlbumIsLoading(false);
                if (res.data && res.data.errors) setAlbumFormErrors(res.data.errors);
            }
        })()
    }

    return (
        <div className="album-edit-page__album-detail-form" >
            <ul className="album-form-errors__holder">
                {albumFormErrors.map((error, idx) => <li className="album-form-errors" key={idx}>{error}</li>)}
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
                    <span className="album-edit-page__submit-instruction">Submit to start adding songs!</span>
                    <button type="submit" className="album-edit-page__submit-btn" onClick={handleCreateAlbumSubmitBtn}>
                        Submit
                    </button> 
                </> :
                <button type="submit" className="album-edit-page__edit-btn" onClick={handleEditAlbumBtn}>Edit</button>
            }
        </div>
    )
}

export default AlbumForm;