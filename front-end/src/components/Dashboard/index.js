import React, {useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as followsActions from '../../store/follows';
import * as albumsActions from '../../store/albums';

import './dashboard.css';
import Albums from './Albums';
import Following from './Following';
import AddBioButton from './AddBioButton';
import BioSection from './BioSection';
import Followers from './Followers';

export const BioFormContext = React.createContext();
// Donec faucibus aliquam mi, et varius dui mattis sit amet. Sed interdum elit vel lacus condimentum, et dapibus augue consectetur. Ut libero ante, dictum sed ex id, dignissim aliquam arcu. Mauris venenatis pellentesque nisl quis bibendum. Fusce gravida, justo in bibendum ullamcorper, dolor justo tempor purus, non facilisis leo lorem eu augue.
const Dashboard = () => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const followers = useSelector((state) => state.follows.followersList);
    const following = useSelector((state) => state.follows.followingList);
    const albums = useSelector((state) => state.albums.oneArtistAlbumsList);

    useEffect(() => {
        dispatch(followsActions.getFollowers(user.id))
            .then(() =>  dispatch(followsActions.getFollowing(user.id)))
            .then(() =>  dispatch(albumsActions.getAllAlbumsForOneArtist(user.id)))
    }, [user.id, dispatch])

    const handleEditAlbumBtn = (albumId) => (e) => {
        console.log("edit button clicked!");
    }
    

    if(!albums) {
        return null;
    }

    return (
        <div className="artist-page__holder">
            <div className="artist-page">
                <div className="left-column__holder">
                    <div className="artist-page__header-holder">
                        <h1 className="artist-page__header">{user.artistName}</h1>
                    </div>
                    <div className="discography">
                        { 
                            albums ? 
                            null : 
                            <div className="discography__add-album-message">
                                Add an album and build your fanbase!
                            </div>
                            
                        }
    
                        <div className="discography__header-holder">
                            <h3>DISCOGRAPHY</h3> 
                            <NavLink exact className="discography__add-link" to="/create-album">
                                + add
                            </NavLink>
                        </div>
    
                        <div className="albums__holder">
                        {
                            albums ? 
                            <Albums albums={albums} handleEditAlbumBtn={handleEditAlbumBtn} /> :
                            (
                                <>
                                <div className="album__placeholder"></div>
                                <div className="album__placeholder"></div>
                                <div className="album__placeholder"></div>
                                <div className="album__placeholder"></div>
                                </>
                            )
                        }
                        </div>
                        
                        {/* <div className="albums__holder">
                            <div className="album__placeholder"></div>
                            <div className="album__placeholder"></div>
                            <div className="album__placeholder"></div>
                            <div className="album__placeholder"></div>
                        </div> */}
                    </div>

                    <div className="follows__header-holder">
                        {/* <h3>FOLLOWING</h3> */}
                        <h3 className="follows__following-header">Following</h3>
                        <h3 className="follows__followers-header">Followers</h3>
                    </div>
                    <div className="follows__holder">
                        <div className="following__holder">
                            {following ?
                                <Following following={following} /> :
                                ( 
                                    <>
                                    <div className="following__placeholder"></div>
                                    <div className="following__placeholder"></div>
                                    <div className="following__placeholder"></div>
                                    <div className="following__placeholder"></div>
                                    </>
                                )
                            }
                        </div>
                        <div className="followers__holder">
                            <Followers followers={followers}/>

                        {/* <div className="followers__photo-holder">
                                <div className="followers__photo">

                                </div>
                                test
                            </div>
                            <div className="followers__photo-holder">
                                <div className="followers__photo">

                                </div>
                                test
                            </div> */}
                        </div>
                    </div>
                </div>

                
                <div className="right-column__holder">
                    { user.imgUrl ?
                            <div className="artist-info__photo" style={{backgroundImage: `url(${user.imgUrl})`}} >
                            </div> :
                            <button className="artist-info__photo-placeholder">add artist photo</button>
                    }
                    <div className="artist-info__name">
                        {user.artistName}
                    </div>

                    <div className="artist-info__bio-holder">
                        {
                            user.bio ? 
                            (
                                <BioSection/>
                            ) :
                            <AddBioButton/>

                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;