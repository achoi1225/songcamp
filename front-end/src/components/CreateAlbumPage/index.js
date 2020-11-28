import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import CheckIcon from '@material-ui/icons/Check';

import './album-edit-page.css';
import * as albumActions from '../../store/album';
import AlbumForm from './AlbumForm';
import TrackForm from './TrackForm';
import UploadedTracks from './UploadedTracks';
import AddTrackSection from './AddTrackSection';
import CircularIndeterminate from './CircularIndeterminate';

const CreateAlbumPage = () => {
        
    const dispatch = useDispatch();
    const album = useSelector((state) => state.album.current)
    const [tracksData, setTracksData] = useState({ title1: '', track1Url: '' });
    const [currentIdx, setCurrentIdx] = useState(0);
    const [albumTitle, setAlbumTitle] = useState("");
    const [description, setDescription] = useState("");
    const [credits, setCredits] = useState("");
    const [img, setImg] = useState("");
    const [isPublished, setIsPublished] = useState(false);
    const [uploadedTracksVisible, setUploadedTracksVisible] = useState(false);
    const [trackCount, setTrackCount] = useState(0);
    const [currentTrackId, setCurrentTrackId] = useState(0);
    const [albumIsLoading, setAlbumIsLoading] = useState(false);
    const [trackIsLoading, setTrackIsLoading] = useState(false);
    const albumDetailSelectIdx = 0;
    const addTrackIdx = 1;
 
    //Differs from EditAlbumPage =====================================
    useEffect(() => {
        if(album) {
            dispatch(albumActions.removeAlbum())
        }
    },[dispatch])

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

// HANDLE DELETE ALBUM ARTWORK BUTTON 
    const handleDeleteAlbumArtworkBtn = (e) => {
        e.preventDefault();
        const imgUrl = '';
        const data = { imgUrl };

        (async () => {
            await dispatch(albumActions.deleteAlbumArtwork(data, album.id));
        })()
    }

// HANDLE PUBLISH ALBUM BUTTON
    const handlePublishBtn = (e) => {
        e.preventDefault();

        //ASK ABOUT THIS??????
        // setIsPublished(true);
        const data = {"isPublished": true};
        
        (async () => {
            try{
                await dispatch(albumActions.publishAlbum(data, album.id))
                await setIsPublished(true);
            } catch(res) {
                // if (res.data && res.data.errors) setAlbumFormErrors(res.data.errors);
            }
        })()

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

                {
                    (currentIdx >= addTrackIdx) ? 
                        <h4 className="album-edit-page__tracks-header">
                            TRACKS
                        </h4> :
                        null
                }
                {uploadedTracksVisible && album && album.tracks ? 
                    (
                        <UploadedTracks 
                            tracksData={tracksData}
                            setTracksData={setTracksData}
                            currentIdx={currentIdx}
                            setCurrentIdx={setCurrentIdx}
                            setTrackCount={setTrackCount}
                            setCurrentTrackId={setCurrentTrackId}
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
                    </> : album ?
                    <>
                        <span className="album-edit-page__publish-message">Album will be saved as a draft until it's published</span>
                        <button className="album-edit-page__publish-btn" onClick={handlePublishBtn}>
                            Publish
                        </button>
                    </> :
                    null
                }

            </div>

            <div className="album-edit-page__right-col">
                {
                    (currentIdx === albumDetailSelectIdx) ? 
                        (
                            <AlbumForm 
                                albumTitle={albumTitle}
                                setAlbumTitle={setAlbumTitle}
                                img={img}
                                setImg={setImg}
                                description={description}
                                setDescription={setDescription}
                                credits={credits}
                                setCredits={setCredits}
                                isPublished={isPublished}
                                setAlbumIsLoading={setAlbumIsLoading}
                                setCurrentIdx={setCurrentIdx}
                                />
                        ) : null
                }
                {
                    (currentIdx >= addTrackIdx) ? 
                    (
                        <TrackForm 
                            currentIdx={currentIdx}
                            trackCount={trackCount}
                            tracksData={tracksData}
                            setTracksData={setTracksData}
                            setTrackIsLoading={setTrackIsLoading}
                            setUploadedTracksVisible={setUploadedTracksVisible}
                            setCurrentIdx={setCurrentIdx}
                            setTrackCount={setTrackCount}
                            currentTrackId={currentTrackId}
                            />
                    ) : null
                }
            </div>
        </div>
    )
}

export default CreateAlbumPage;