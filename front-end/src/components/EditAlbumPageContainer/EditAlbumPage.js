import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import CheckIcon from '@material-ui/icons/Check';
// import classNames from 'classnames';

// import {USER_ID} from '../store/actions/authentication';
import './album-edit-page.css';
import './upload-form.css';
import AlbumForm from './AlbumForm';
import TrackForm from './TrackForm';
import UploadedTracks from './UploadedTracks';
import AddTrackSection from './AddTrackSection';
import CircularIndeterminate from './CircularIndeterminate';

import * as albumActions from '../../store/album';


const EditAlbumPage = ({ 
    user, 
    // getOneAlbum, 
    editAlbum, 
    deleteAlbumArtwork, 
    publishAlbum,
    album, 
    createTrack,
    editTrackTitle,
    deleteTrack }) => {

    const [albumTitle, setAlbumTitle] = useState("");
    const [description, setDescription] = useState("");
    const [credits, setCredits] = useState("");
    const [img, setImg] = useState("");
    const [isPublished, setIsPublished] = useState(false);
    const [tracksData, setTracksData] = useState({});
    // const [uploadedTracksVisible, setUploadedTracksVisible] = useState(false);
    // const [uploadedTrackClicked, setUploadedTrackClicked] = useState(false);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [albumFormErrors, setAlbumFormErrors] = useState([]);
    const [trackFormErrors, setTrackFormErrors] = useState([]);
    const [trackCount, setTrackCount] = useState(0);
    const [currentTrackId, setCurrentTrackId] = useState(0);
    const [albumIsLoading, setAlbumIsLoading] = useState(false);
    const [trackIsLoading, setTrackIsLoading] = useState(false);
    const albumDetailSelectIdx = 0;
    const addTrackIdx = 1;

    const dispatch = useDispatch();
    let { albumId } = useParams();

    console.log("TRACK COUNT!!! ", trackCount);
    console.log("CURRENT TRACK ID!!! ", currentTrackId);
 
    useEffect(() => {
        (async () => {
            // await getOneAlbum(albumId);
            await dispatch(albumActions.getOneAlbum(albumId));
            // if(album) {
            //     setTrackCount(album.tracks.length)
            // }
        })()
    }, [albumId, dispatch])

    const handleAlbumDetailSelect = (e) => {
        e.preventDefault();
        (async () => {
            await setCurrentIdx(0)
            if(album) {
                await setAlbumTitle(album.title);
                await setDescription(album.description);
                await setCredits(album.credits);
            }
        })()
    }

    const updateProperty = (property) => (e) => {
        e.preventDefault();
        property(e.target.value);
    }


    const updateTrackFormProperty = (property, keyName) => (e) => {
        console.log("IDX VALUE!!! ", keyName)
        property(prevState => ({...prevState, [keyName]: e.target.value}));
        console.log("title1!!! ",  tracksData[keyName]);
    }

    // const handleCreateAlbumSubmitBtn = (e) => {
    //     e.preventDefault();
    //     setAlbumIsLoading(true);

    //     const data = new FormData();
    //     data.append("title", albumTitle);
    //     data.append("description", description);
    //     data.append("credits", credits);
    //     data.append("isPublished", isPublished);
    //     data.append("file", img);
    //     data.append("artistId", user.id);


    //     (async () => {
    //         try{
    //             const res = await createAlbum(data);
    //             console.log("RES FOR NEW ALBUM ", res.data.newAlbum);
    //             await setCurrentIdx(1);
    //             await setImg("");
    //             await setAlbumFormErrors([]);
    //             await setAlbumIsLoading(false);
    //         } catch(res) {
    //             if (res.data && res.data.errors) setAlbumFormErrors(res.data.errors);
    //         }
    //     })()
    // }


    const handleEditAlbumBtn = (e) => {
        e.preventDefault();
        setAlbumIsLoading(true);

        const data = new FormData();
        data.append("title", albumTitle);
        data.append("description", description);
        data.append("credits", credits);
        data.append("isPublished", album.isPublished);
        data.append("file", img);
        data.append("artistId", user.id);

        (async () => {
            try{
                await editAlbum(data, album.id);
                await setImg("");
                await setAlbumFormErrors([]);
                await setAlbumIsLoading(false);
            } catch(res) {
                setAlbumIsLoading(false);
                if (res.data && res.data.errors) setAlbumFormErrors(res.data.errors);
            }
        })()
    }


    const handleDeleteAlbumArtworkBtn = (e) => {
        e.preventDefault();
        
        const imgUrl = '';
        const data = { imgUrl };

        (async () => {
            try{
                await deleteAlbumArtwork(data, album.id);
                // e.target.value = null;
            } catch(res) {
                if (res.data && res.data.errors) setAlbumFormErrors(res.data.errors);
            }
        })()
    }


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
                const newTrack = await createTrack(data);
                // await setUploadedTracksVisible(true); 
                await setTracksData(prevState => ({...prevState, track1: ''}));
                await setTracksData(prevState => ({...prevState, title1: ''}));
                await setTrackCount(trackCount+1);
                await setCurrentIdx(1);
                await setTrackIsLoading(false);
                console.log("TRACKS DATA!!!!! ", tracksData)
            })()
        } catch(res) {
            setTrackIsLoading(false);
            if (res.data && res.data.errors) setTrackFormErrors(res.data.errors);
        }
    }

    const handleEditTrackTitleBtn = (e) => {
        e.preventDefault();
        const data = new FormData();

        data.append("title", tracksData[`title${currentIdx}`]);
        data.append("albumId", album.id);
        data.append("allowDownload", false);

        (async () => {
            await editTrackTitle(data, currentTrackId);
            await setCurrentIdx(1);
        })()
    }


    const handleDeleteTrackBtn = (trackId) => (e) => {
        e.preventDefault();
        try{
            (async () => {
                const res = await deleteTrack(trackId);
                await setTrackCount(trackCount - 1);
                await setCurrentIdx(1);
                console.log("DELETED! ", res);
            })()
        } catch(res) {
            if (res.data && res.data.errors) setAlbumFormErrors(res.data.errors);
        }
    }
    
    const handlePublishBtn = (e) => {
        e.preventDefault();

        //ASK ABOUT THIS??????
        // setIsPublished(true);
        const data = {"isPublished": true};
        
        (async () => {
            try{
                await publishAlbum(data, album.id);
                await setIsPublished(true);
            } catch(res) {
                if (res.data && res.data.errors) setAlbumFormErrors(res.data.errors);
            }
        })()

    }

    if(!album) {
        return null;
    }

    return (
        <div className="album-edit-page__holder">
            <div className="album-edit-page__left-col">
                <div onClick={handleAlbumDetailSelect} className =
                    { (currentIdx === albumDetailSelectIdx) ? 
                    ("album-edit-page__album-select active") : 
                    ("album-edit-page__album-select")} >
                    
                    {/* ADD CONFIRM BUTTON LATER!! =============================================================*/}
                    {album && album.imgUrl ? 
                            (
                                <div className="album-edit-page__album-art" style={{backgroundImage: `url(${album.imgUrl})`}}>
                                    <button type="submit" onClick={handleDeleteAlbumArtworkBtn} className="album-edit-page__artwork-delete-btn">
                                        <i className="fas fa-times"></i>
                                    </button>   
                                </div>
                            ) : 
                            (
                                albumIsLoading ? 
                                <div className="album-edit-page__album-placeholder">
                                    <span>Loading...</span>
                                    <CircularIndeterminate />
                                </div> :
                                <div className="album-edit-page__album-placeholder"></div>
                            )
                    }
                    <div className="album-edit-page__album-details-holder"> 
                        {album && album.title && (currentIdx !== albumDetailSelectIdx) ?
                            <h4>{ album.title }</h4> :
                            albumTitle ? 
                                <h4>{ albumTitle }</h4> :
                                <h4>Untitled Album</h4>
                        }
                        by <span>The Pojos</span>
                    </div>
                </div>

                <h4 className="album-edit-page__tracks-header">TRACKS</h4>
                
                {album && album.tracks ? 
                    (
                        <UploadedTracks 
                            album={album}
                            tracksData={tracksData}
                            setTracksData={setTracksData}
                            currentIdx={currentIdx}
                            setCurrentIdx={setCurrentIdx}
                            setCurrentTrackId={setCurrentTrackId}
                            // uploadedTrackClicked={uploadedTrackClicked}
                            // setUploadedTrackClicked={setUploadedTrackClicked}
                            handleDeleteTrackBtn={handleDeleteTrackBtn}
                        />
                    ) : null
                }

                {album ?

                    <AddTrackSection 
                        currentIdx={currentIdx}
                        setCurrentIdx={setCurrentIdx}
                        addTrackIdx={addTrackIdx}
                        tracksData={tracksData}
                        trackIsLoading={trackIsLoading}/> :
                    null
                }
        
                {album && album.isPublished ?
                    <>
                        <span className="album-edit-page__publish-message">
                            Your album is LIVE! Take a look 
                            <NavLink exact to={`/albums/${album.id}`}> here</NavLink>
                        </span>
                        <button className="album-edit-page__publish-btn" onClick={handlePublishBtn}>
                            Published <CheckIcon style={{ fontSize: 14 }}/>
                        </button> 
                    </> :
                    <>
                        <span className="album-edit-page__publish-message">Album will be saved as a draft until it's published</span>
                        <button className="album-edit-page__publish-btn" onClick={handlePublishBtn}>
                            Publish
                        </button>
                    </>
                }

            </div>

            <div className="album-edit-page__right-col">
                {
                    (currentIdx === albumDetailSelectIdx) ? 
                        (
                            <AlbumForm 
                                album={album}
                                updateProperty={updateProperty}
                                albumTitle={albumTitle}
                                setAlbumTitle={setAlbumTitle}
                                setImg={setImg}
                                description={description}
                                setDescription={setDescription}
                                credits={credits}
                                setCredits={setCredits}
                                // handleCreateAlbumSubmitBtn={handleCreateAlbumSubmitBtn}
                                handleEditAlbumBtn={handleEditAlbumBtn}
                                albumFormErrors={albumFormErrors} />
                        ) : null
                }
                {
                    (currentIdx >= addTrackIdx) ? 
                    (
                        <TrackForm 
                            album={album}
                            currentIdx={currentIdx}
                            handleUploadTrackBtn={handleUploadTrackBtn}
                            // trackTitle={trackTitle}
                            // setTrackTitle={setTrackTitle}
                            // setTrack={setTrack}
                            // updateProperty={updateProperty}
                            // addTrackIdx={addTrackIdx}
                            tracksData={tracksData}
                            setTracksData={setTracksData}
                            updateTrackFormProperty={updateTrackFormProperty}
                            // trackCount={trackCount}
                            handleEditTrackTitleBtn={handleEditTrackTitleBtn}/>
                    ) : null
                }
            </div>
        </div>
    )
}

export default EditAlbumPage;