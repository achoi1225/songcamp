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

        // handleUploadTrackBtn, 
        // updateTrackFormProperty,
        // handleEditTrackTitleBtn
    }) => {

    const dispatch = useDispatch();
    const album = useSelector((state) => state.album.current)
    const [trackFormErrors, setTrackFormErrors] = useState([]);
    const keyName = `title${currentIdx}`;
    const trackUrl = `track${currentIdx}Url`;
    console.log("CURRENT IDX", currentIdx);

// UPDATE TRACK FORM PROPERTY
    const updateTrackFormProperty = (property, keyName) => (e) => {
        console.log("IDX VALUE!!! ", keyName)
        property(prevState => ({...prevState, [keyName]: e.target.value}));
        console.log("title1!!! ",  tracksData[keyName]);
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
                //     dispatch(tracksActions.editTrackTitle(data, trackId))
                // const newTrack = await createTrack(data);

                const newTrack = await dispatch(tracksActions.createTrack(data))
                await setUploadedTracksVisible(true); 
                await setTracksData(prevState => ({...prevState, track1Url: ''}));
                await setTracksData(prevState => ({...prevState, title1: ''}));
                await setTrackCount(trackCount+1);
                await setCurrentIdx(1);
                await setTrackIsLoading(false);
                //figure out a way to 
                console.log("TRACKS DATA!!!!! ", tracksData)
            })()
        } catch(res) {
            setTrackIsLoading(false);
            if (res.data && res.data.errors) setTrackFormErrors(res.data.errors);
        }

        // createTrack(data)
        //     .then((res) => {
        //         setUploadedTracksVisible(true); 
        //         console.log("LENGTH ", album.Tracks.length);
        //         trackCount = album.Tracks.length;
        //     })
    }

// HANDLE EDIT TRACK BUTTON
    const handleEditTrackTitleBtn = (e) => {
        e.preventDefault();
        const data = new FormData();

        data.append("title", tracksData[`title${currentIdx}`]);
        data.append("albumId", album.id);
        data.append("allowDownload", false);

        (async () => {
            await dispatch(tracksActions.editTrackTitle(data, currentTrackId))
            // await editTrackTitle(data, currentTrackId);
            await setCurrentIdx(1);
        })()
    }

    return (
        <form 
            onSubmit={handleUploadTrackBtn} 
            className="album-edit-page__track-form" 
            // style={{ marginTop: `${193+(currentIdx - 2)*(2*(currentIdx - 2) + 74)}px` }}
            style={{ marginTop: currentIdx > 1 ? 
                    `${ (currentIdx-2)*70 + 245}px` :
                    trackCount === 0 ?
                        `245px` :
                    `${(trackCount)*70 + 245}px`
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