import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as tracksActions from '../../store/tracks';

const TrackForm = (
    { 
        currentIdx,
        tracksData,
        setTracksData,
        trackCount,
        setTrackIsLoading,
        setUploadedTracksVisible,
        setCurrentIdx,
        setTrackCount,
        currentTrackId,
    }) => {

    const dispatch = useDispatch();
    const album = useSelector((state) => state.album.current)
    const [trackFormErrors, setTrackFormErrors] = useState([]);
    const keyName = `title${currentIdx}`;
    const trackUrl = `track${currentIdx}Url`;
    console.log("CURRENT IDX", currentIdx);

// UPDATE TRACK FORM PROPERTY
    const updateTrackFormProperty = (property, keyName) => (e) => {
        property(prevState => ({...prevState, [keyName]: e.target.value}));
    }

// HANDLE UPLOAD TRACK BUTTON 
    const handleUploadTrackBtn = (e) => {
        e.preventDefault();
        setTrackIsLoading(true);

        const data = new FormData();

        data.append("title", tracksData.title1);
        data.append("albumId", album.id);
        data.append("allowDownload", false);
        data.append("file", tracksData.track1Url);

        try {
            (async () => {
                await dispatch(tracksActions.createTrack(data))
                await setUploadedTracksVisible(true); 
                await setTracksData(prevState => ({...prevState, track1Url: ''}));
                await setTracksData(prevState => ({...prevState, title1: ''}));
                await setTrackCount(trackCount+1);
                await setTrackFormErrors([])
                await setCurrentIdx(1);
                await setTrackIsLoading(false);
            })()
        } catch(res) {
            setTrackIsLoading(false);
            if (res.data && res.data.errors) setTrackFormErrors(res.data.errors);
        }
    }

// HANDLE EDIT TRACK BUTTON
    const handleEditTrackTitleBtn = (e) => {
        e.preventDefault();
        setTrackIsLoading(true);
        const data = new FormData();

        data.append("title", tracksData[`title${currentIdx}`]);
        data.append("albumId", album.id);
        data.append("allowDownload", false);

        (async () => {
            try{
                await dispatch(tracksActions.editTrackTitle(data, currentTrackId));
                await setCurrentIdx(1);
                await setTrackFormErrors([])
                setTrackIsLoading(false);
            } catch(res) {
                setTrackIsLoading(false);
                if (res.data && res.data.errors) setTrackFormErrors(res.data.errors);
            }
        })()
    }
    
    return (
        <form 
            onSubmit={handleUploadTrackBtn} 
            className="album-edit-page__track-form" 
            // style={{ marginTop: `${193+(currentIdx - 2)*(2*(currentIdx - 2) + 74)}px` }}
            style={{ marginTop: currentIdx > 1 ? 
                    `${ (currentIdx-2)*70 + 217}px` :
                     album.tracks.length === 0 ?
                        `217px` :
                    `${(album.tracks.length)*70 + 217}px`
            }}>
            <ul className="track-form-errors__holder">
                {trackFormErrors.map((error, idx) => <li className="track-form-errors" key={idx}>{error}</li>)}
            </ul>
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