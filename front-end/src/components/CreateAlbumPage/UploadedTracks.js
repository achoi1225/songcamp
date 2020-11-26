import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import * as albumActions from '../../store/album';
import * as tracksActions from '../../store/tracks';
// import AlbumForm from './AlbumForm';
// import TrackForm from './TrackForm';
// import AddTrackSection from './AddTrackSection';
// import CircularIndeterminate from './CircularIndeterminate';

const UploadedTracks = ({
    tracksData, 
    setTracksData, 
    currentIdx, 
    setCurrentIdx, 
    setCurrentTrackId,
    trackCount,
    setTrackCount, 
}) => {
    
    const dispatch = useDispatch();
    const album = useSelector((state) => state.album.current)
    const tracks = album.tracks;
    const [trackDeleteErrors, setTrackDeleteErrors] = useState({});

// HANDLE DELETE TRACK BUTTON
    const handleDeleteTrackBtn = (trackId) => (e) => {
        e.preventDefault();
        try{
            (async () => {
                const res = await dispatch(tracksActions.deleteTrack(trackId))
                await setTrackCount(trackCount - 1);
                await setCurrentIdx(1);
                console.log("DELETED! ", res);
            })()
        } catch(res) {
            if (res.data && res.data.errors) setTrackDeleteErrors(res.data.errors);
        }
    }

    return (
        <>
            {tracks.map((track, idx) => {
                const keyName = `title${idx+2}`;
                console.log("KEYNAME", keyName)
                console.log("TRACKS DATA!!! ", tracksData);
                return (
                    <div key={track.id} onClick={() => 
                            {
                                setCurrentIdx(idx+2);
                                setCurrentTrackId(track.id);
                                setTracksData(prevState => ({...prevState, [keyName]: track.title}));
                            }
                        }
                        className={
                            (currentIdx === (idx+2) ) ?
                            ("album-edit-page__track-holder active") : 
                            ("album-edit-page__track-holder")
                        }
                        
                    >
                        <div className="album-edit-page__track-title"> 
                            <span>{idx+1}.</span>
                            {
                                tracksData[keyName] && (currentIdx === (idx+2)) ? 
                                tracksData[keyName] : 
                                (
                                    (currentIdx !== (idx+2)) ? 
                                    track.title :
                                    null
                                )   
                            }
                        </div>
                        <button className="album-edit-page__track-delete-btn" onClick={handleDeleteTrackBtn(track.id)}>delete</button>
                    </div>
                )
            })}
        </>
    )
}


export default UploadedTracks;