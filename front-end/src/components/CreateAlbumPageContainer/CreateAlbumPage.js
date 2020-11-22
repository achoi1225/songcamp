import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import classNames from 'classnames';

// import {USER_ID} from '../store/actions/authentication';
import './album-edit-page.css';
import './upload-form.css';
import AlbumForm from './AlbumForm';
import TrackForm from './TrackForm';
import UploadedTracks from './UploadedTracks';
import AddTrackSection from './AddTrackSection';

const CreateAlbumPage = ({ user, createAlbum, album, createTrack }) => {
    const [albumTitle, setAlbumTitle] = useState("");
    const [description, setDescription] = useState("");
    const [credits, setCredits] = useState("");
    const [img, setImg] = useState(null);
    const [isPublished, setIsPublished] = useState(false);
    const [trackTitle, setTrackTitle] = useState("");
    const [track, setTrack] = useState(null);
    const [tracksData, setTracksData] = useState({});
    const [newAlbumData, setNewAlbumData] = useState("");
    const [uploadedTracksVisible, setUploadedTracksVisible] = useState(false);
    const [uploadedTrackClicked, setUploadedTrackClicked] = useState(false);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [albumFormErrors, setAlbumFormErrors] = useState([]);
    const albumDetailSelectIdx = 0;
    const addTrackIdx = 1;
    let trackCount = 0;
    let albumId;

    // console.log("tracks data!", tracksData[0].title);
    const updateProperty = (property) => (e) => {
        // setTracksData([{title: e.target.value}]);
        property(e.target.value);
    }

    const updateTrackFormProperty = (property, keyName) => (e) => {
        // setTracksData([{title: e.target.value}]);
        // console.log(property);
        // property(prevState => ([{...prevState, title: e.target.value}]));
        // property(prevState => ([{...prevState}, {title2: e.target.value}]));
        console.log("IDX VALUE!!! ", keyName)
        property(prevState => ({...prevState, [keyName]: e.target.value}));
        console.log("title1!!! ",  tracksData[keyName]);
    }

    const handleCreateAlbumSubmitBtn = (e) => {
        e.preventDefault();
        const data = new FormData();

        data.append("title", albumTitle);
        data.append("description", description);
        data.append("credits", credits);
        data.append("isPublished", isPublished);
        data.append("file", img);
        data.append("artistId", user.id);

       
        // const newAlbum = createAlbum(data);
        // setNewAlbumData(newAlbum);
        // setCurrentIdx(1);

        // return createAlbum(data)
        //     .then((res) => setNewAlbumData(newAlbum))
        //     .then((res) => setCurrentIdx(1))
        //     .catch((res) => {
        //         if (res.data && res.data.errors) setAlbumFormErrors(res.data.errors);
        //     });

        (async () => {
            try{
                const res = await createAlbum(data);
                setNewAlbumData(res.data.newAlbum);
                setCurrentIdx(1);

            } catch(err) {
                console.log(err);
            }
        })()

    }

    const handleUploadTrackBtn = (e) => {
        e.preventDefault();
        const data = new FormData();

        console.log("ALBUM ID", album.id);
        data.append("title", tracksData.title1);
        // data.append("trackUrl", track);
        data.append("albumId", album.id);
        data.append("allowDownload", false);
        data.append("file", tracksData.track1Url);

        console.log("TRACK URL!!!");

        (async () => {
            const newTrack = await createTrack(data);
            console.log("NEW TRACK CREATED!")
            setUploadedTracksVisible(true); 
            setTracksData(prevState => ({...prevState, track1: ''}));
            setTracksData(prevState => ({...prevState, title1: ''}));
            console.log("TRACKS DATA!!!!! ", tracksData)
            setCurrentIdx(1);
            // trackCount = album.Tracks.length;

        })()

        // createTrack(data)
        //     .then((res) => {
        //         setUploadedTracksVisible(true); 
        //         console.log("LENGTH ", album.Tracks.length);
        //         trackCount = album.Tracks.length;
        //     })
    }

    const handleEditTrackBtn = (e) => {
        e.preventDefault();
        const data = new FormData();

        console.log("ALBUM ID", albumId);
        data.append("title", tracksData[`title${currentIdx}`]);
        // data.append("trackUrl", track);
        data.append("albumId", albumId);
        data.append("allowDownload", false);
        data.append("file", tracksData[`track${currentIdx}Url`]);

        console.log("TRACK URL!!!", tracksData[`track${currentIdx}Url`])

        // (async () => {
        //     const newTrack = await createTrack(data);
        //     console.log("NEW TRACK!!! ", newTrack);
        // })()
    }

    // console.log("album!!!!", album);
    if(album) {
        albumId = album.id;
        console.log('album ID!!! ', album.id);
        // trackCount = album.Tracks.length;

    }

    return (
        <div className="album-edit-page__holder">
            <div className="album-edit-page__left-col">
                <div onClick={() => setCurrentIdx(0)} className =
                    { (currentIdx === albumDetailSelectIdx) ? 
                    ("album-edit-page__album-select active") : 
                    ("album-edit-page__album-select")} >
                    {
                        album && album.imgUrl ? 
                            (
                                <div className="album-edit-page__album-art" style={{backgroundImage: `url(${album.imgUrl})`}}></div>
                            ) : 
                            (
                                <div className="album-edit-page__album-placeholder"></div>
                            )
                    }
                    <div className="album-edit-page__album-details-holder"> 
                        { 
                            album && album.title && (currentIdx !== albumDetailSelectIdx) ?
                            <h4>{ album.title }</h4> :
                            <h4>{ albumTitle }</h4>
                        }
                        by <span>The Pojos</span>
                    </div>
                </div>


                {/* uploaded track component */}
                {
                    uploadedTracksVisible ? 
                    (
                        <>
                        <h4 className="album-edit-page__tracks-header">TRACKS</h4>
                            <UploadedTracks 
                                album={album}
                                tracksData={tracksData}
                                setTracksData={setTracksData}
                                currentIdx={currentIdx}
                                setCurrentIdx={setCurrentIdx}
                                uploadedTrackClicked={uploadedTrackClicked}
                                setUploadedTrackClicked={setUploadedTrackClicked}
                            />
                        </>
                    ) : null
                }

                {
                    album ?
                    <AddTrackSection 
                        currentIdx={currentIdx}
                        setCurrentIdx={setCurrentIdx}
                        addTrackIdx={addTrackIdx}
                        tracksData={tracksData}/> :
                    null
                }

                {/* DELETE SOON! ========================================================== */}
                {/* <div onClick={() => setCurrentIdx(1)}
                    className={
                        (currentIdx === trackSelectIdx) ?
                        ("album-edit-page__track-select active") : 
                        ("album-edit-page__track-select")
                    }
                    
                >
                    <div className="album-edit-page__track-title"> 
                        {tracksData.title1}
                    </div>
                </div> */}
        
                <button>
                    Publish
                </button>

            </div>

            <div className="album-edit-page__right-col">
                {
                    (currentIdx === albumDetailSelectIdx) ? 
                        (
                            <AlbumForm 
                                updateProperty={updateProperty}
                                albumTitle={albumTitle}
                                setAlbumTitle={setAlbumTitle}
                                setImg={setImg}
                                description={description}
                                setDescription={setDescription}
                                credits={credits}
                                setCredits={setCredits}
                                handleCreateAlbumSubmitBtn={handleCreateAlbumSubmitBtn}
                                trackCount={trackCount} 
                                albumFormErrors={albumFormErrors} />
                        ) : null
                }
                {
                    (currentIdx >= addTrackIdx) ? 
                    (
                        <TrackForm 
                            currentIdx={currentIdx}
                            handleUploadTrackBtn={handleUploadTrackBtn}
                            trackTitle={trackTitle}
                            setTrackTitle={setTrackTitle}
                            setTrack={setTrack}
                            updateProperty={updateProperty}
                            tracksData={tracksData}
                            setTracksData={setTracksData}
                            updateTrackFormProperty={updateTrackFormProperty}
                            trackCount={trackCount}
                            addTrackIdx={addTrackIdx}
                        />
                    ) : null
                }

                {/* <form onSubmit={handleUploadTrackBtn} className="album-edit-page__track-form">
                    <label className="album-edit-page__track-title-input">TRACK TITLE</label>
                    <input
                        type="text" name="trackTitle" 
                        value={trackTitle}
                        placeholder={trackTitle} 
                        onChange={updateProperty(setTrackTitle)}
                    >
                    </input>
                    <label>upload track:</label>
                    <input className="album-edit-page__upload-input"
                        type="file"
                        onChange={(e) => setTrack(e.target.files[0])}
                    />
                    <button type="submit">Submit</button>
                </form> */}

                
            </div>
        </div>
    )
}

export default CreateAlbumPage;