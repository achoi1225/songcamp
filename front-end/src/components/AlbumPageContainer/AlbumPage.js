import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import AudioPlayer from 'react-h5-audio-player';

import 'react-h5-audio-player/lib/styles.css';
import './album-page.css';
import FollowBtn from './FollowBtn';
// import Nav from './Nav';
// import { USER_ID } from '../store/actions/authentication';
// import { getOneAlbum } from '../store/actions/album';

const AlbumPage = ({ 
    user,
    album, 
    followers,
    following,
    getFollowers,
    getFollowing,
    getOneAlbum, 
    follow, 
    deleteFollow,}) => {

    const [currentTrack, setCurrentTrack] = useState('');
    // const userId = localStorage.getItem(USER_ID);
    const { albumId } = useParams();
    console.log("ID!!!", albumId);

    useEffect(() => {
        getOneAlbum(albumId)
            .then(() => getFollowing(user.id))
    }, [albumId]);
    

    if(!album || !following) {
        console.log("NOT LOADED")
        return null;
    }


    const tracks = album.tracks;
    const artist = album.artist;

    const handleFollow = (e) => {
        console.log('button test!!!', e.target.value);
        follow(artist.id);
    }

    const handleDeleteFollowBtn = (e) => {
        console.log("delete button pressed!!");
        console.log("artistId INSIDE HANDLE DELETE!!!", e.target.value);
        deleteFollow(artist.id);
    }

    return (
        <>
            {/* {<Nav />} */}
            <div className="album-page__holder">

                <div className="album-page">
                    <div className="album-page__header-holder">
                    <h1 className="album-page__header">{album.title}</h1>
                    </div>

                    <div className="album-page__content-holder">
                        <div className="album-page__left-content">
                         
                            <div className="artist-name-holder">
                                by {artist.artistName}
                            </div>
                            
                            <div className="audio-player-holder">
                                <AudioPlayer
                                    autoPlay={false}
                                    volume={0.5}
                                    src={currentTrack}
                                    onPlay={e => console.log("onPlay")}
                                    showDownloadProgress={true}
                                />
                            </div>


                            {tracks.map((track, i) => (
                                <div key={track.id} className="track-holder">
                                    <span>{i+1}. </span> 
                                    <button onClick={() => setCurrentTrack(track.trackUrl)} className="track">
                                        {track.title}
                                    </button>
                                </div>
                            ))}

                        </div>

                        <div className="album-page__middle-content">
                            <div className="album-cover-holder">
                                <img className="album-cover" src={album.imgUrl} />
                            </div>
                            <div className="description">
                                {album.description}
                            </div>
                        </div>

                        <div className="album-page__right-content">
                       
                            <img className="artist-photo" src={artist.imgUrl} />
                            
                            <div className="artist-name">
                                {artist.artistName}
                            </div>

                            <FollowBtn 
                                following={following} 
                                handleFollow={handleFollow} 
                                handleDeleteFollowBtn={handleDeleteFollowBtn} 
                                artistId={artist.id}
                            />

                            <div className="bio">
                                {artist.bio}
                            </div>
                        </div>
                </div>
                </div>

            </div>
        </>
    )
}

export default AlbumPage;