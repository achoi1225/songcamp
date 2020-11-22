import React, {useState} from 'react';

const TrackForm = (
    { 
        currentIdx,
        handleUploadTrackBtn, 
        trackTitle,
        setTrackTitle,
        updateProperty,
        setTrack,
        tracksData,
        setTracksData,
        updateTrackFormProperty,
        trackCount,
        addTrackIdx
    }) => {

    const keyName = `title${currentIdx}`;
    const trackUrl = `track${currentIdx}Url`;
    console.log("CURRENT IDX", currentIdx);
    return (
        <form 
            onSubmit={handleUploadTrackBtn} 
            className="album-edit-page__track-form" 
            style={{ marginTop: `${193+(currentIdx - 2)*(2*(currentIdx - 2) + 74)}px` }}
            // style={{ marginTop: `${(Math.pow((currentIdx - 2), 2)*2) + 74 + 193}px` }}
            >
            <label className="album-edit-page__track-title-input">TRACK TITLE</label>
            <input
                type="text" name="trackTitle" 
                value={tracksData[keyName]}
                placeholder={tracksData[keyName]} 
                onChange={updateTrackFormProperty(setTracksData, keyName)}
            >
            </input>
            <label>upload track:</label>
            <input className="album-edit-page__upload-input"
                type="file"
                onChange={(e) => setTracksData(prevState => ({...prevState, [trackUrl]: e.target.files[0]}))}
            />
            <button type="submit">Submit</button>
        </form>
    )
}

export default TrackForm;