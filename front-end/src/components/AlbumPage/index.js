import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import AudioPlayer from 'react-h5-audio-player';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import 'react-h5-audio-player/lib/styles.css';
import './album-page.css';
import FollowBtn from './FollowBtn';
import Followers from './Followers';
import * as followsActions from '../../store/follows';
import * as albumActions from '../../store/album';


const AlbumPage = () => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const following = useSelector((state) => state.follows.followingList);
    const album = useSelector((state) => state.album.current);
    const [currentTrack, setCurrentTrack] = useState('');
    const { albumId } = useParams();

    useEffect(() => {
        dispatch(albumActions.getOneAlbum(albumId))
            .then(() => 
                dispatch(followsActions.getFollowing(user.id))
            )
    }, [albumId, dispatch, user.id]) 
    
    if(!album|| !following) {
        return null;
    }

    const tracks = album.tracks;
    const artist = album.artist;

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
                                by  
                                <NavLink className="left-content__artist-link" exact to="">
                                    {artist.artistName}
                                </NavLink>
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
                                    <div className="track-holder__play-btn">
                                        <PlayArrowIcon 
                                            style={{ fontSize: 'medium' }}
                                            onClick={() => setCurrentTrack(track.trackUrl)}/>
                                    </div>
                                    <span>{i+1}. </span>
                                    <button onClick={() => setCurrentTrack(track.trackUrl)} className="track">
                                        {track.title}
                                    </button>
                                </div>
                            ))}
                            <div className="description">
                                <div className="description__header">
                                    About album
                                </div>
                                {album.description}
                            </div>
                            <div className="rights">
                                all rights reserved &copy;
                            </div>
                        </div>

                        <div className="album-page__middle-content">
                            <div className="album-cover-holder">
                                <img alt="album cover" className="album-cover" src={album.imgUrl} />
                            </div>
                            <Followers artistId={artist.id} />
                        </div>

                        <div className="album-page__right-content">
                            <img alt="artist" className="artist-photo" src={artist.imgUrl} />
                            
                            <div className="artist-name">
                                {artist.artistName}
                            </div>

                            <FollowBtn artistId={artist.id} />

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