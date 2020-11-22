import React, {useState} from 'react';

const UploadedTracks = ({album, tracksData, setTracksData, currentIdx, setCurrentIdx, uploadedTrackClicked, setUploadedTrackClicked}) => {
    // if(!album) {
    //     return null;
    // }
    // const [uploadedTrackClicked, setUploadedTrackClicked] = useState(false)

    const tracks = album.Tracks;
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
                                // setCurrentIdx(track.id+1);
                                setCurrentIdx(idx+2);
                                setTracksData(prevState => ({...prevState, [keyName]: track.title}));
                                // setUploadedTrackClicked(true);
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
                    </div>
                )
            })}
        </>
    )
}

export default UploadedTracks;