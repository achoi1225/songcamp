import React, {useState} from 'react';

const UploadedTracks = ({
    album, 
    tracksData, 
    setTracksData, 
    currentIdx, 
    setCurrentIdx, 
    handleDeleteTrackBtn,
    setCurrentTrackId }) => {
    // if(!album) {
    //     return null;
    // }
    // const [uploadedTrackClicked, setUploadedTrackClicked] = useState(false)
    // if(!album) {
    //     return null;
    // }

    const tracks = album.tracks;
    return (
        <>
            {tracks.map((track, idx) => {
                const keyName = `title${idx+2}`;
                console.log("KEYNAME", keyName)
                console.log("TRACKS DATA!!! ", tracksData);
                // setTracksData(prevState => ({...prevState, [keyName]: track.title}));
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