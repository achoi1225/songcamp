import React, {useState} from 'react';
import albumReducer from '../../store/album';

const TrackForm = (
    { 
        album,
        currentIdx,
        handleUploadTrackBtn, 
        tracksData,
        setTracksData,
        updateTrackFormProperty,
        // trackCount,
        handleEditTrackTitleBtn
    }) => {

    const keyName = `title${currentIdx}`;
    const trackUrl = `track${currentIdx}Url`;
    console.log("CURRENT IDX", currentIdx);
    return (
        <form 
            onSubmit={handleUploadTrackBtn} 
            className="album-edit-page__track-form" 
            // style={{ marginTop: `${193+(currentIdx - 2)*(2*(currentIdx - 2) + 74)}px` }}
            style={{ marginTop: currentIdx > 1 ? 
                    `${ (currentIdx-2)*70 + 245}px` :
                     album.tracks.length === 0 ?
                        `245px` :
                    `${(album.tracks.length)*70 + 245}px`
            }}>
            <label className="album-edit-page__track-title-input">TRACK TITLE</label>
            <input
                type="text" name="trackTitle" 
                value={tracksData[keyName]}
                placeholder={tracksData[keyName]} 
                onChange={updateTrackFormProperty(setTracksData, keyName)}
            >
            </input>

            {currentIdx === 1 ? 
                <>
                    <label>upload track:</label>
                    <input className="album-edit-page__upload-input"
                        type="file"
                        onChange={(e) => setTracksData(prevState => ({...prevState, [trackUrl]: e.target.files[0]}))}
                    />
                    <button className="album-edit-page__submit-btn" type="submit">Submit</button>
                </> :
                <button onClick={handleEditTrackTitleBtn} className="album-edit-page__edit-btn" type="submit">Edit</button>
            }
        </form>
    )
}

export default TrackForm;