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
                const keyName = `title${track.id+1}`;
                console.log("KEYNAME", keyName)
                console.log("TRACKS DATA!!! ", tracksData);
                // setTracksData(prevState => ({...prevState, [keyName]: track.title}));
                return (
                    <div key={track.id} onClick={() => 
                            {
                                // setCurrentIdx(track.id+1);
                                setCurrentIdx(idx+1);
                                setTracksData(prevState => ({...prevState, [keyName]: track.title}));
                                setUploadedTrackClicked(true);
                            }
                        }
                        className={
                            (currentIdx === (track.id + 1) ) ?
                            ("album-edit-page__track-select active") : 
                            ("album-edit-page__track-select")
                        }
                        
                    >
                        <div className="album-edit-page__track-title"> 
                            <span>{idx+1}.</span>
                            {
                                tracksData[keyName] ? 
                                tracksData[keyName] : track.title
                            }
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default UploadedTracks;