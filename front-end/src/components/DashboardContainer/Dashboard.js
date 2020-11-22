import React, {useEffect, useState} from 'react';

import './dashboard.css';
import Albums from './Albums';
import Followers from './Followers';
import AddBioButton from './AddBioButton';
import BioForm from './BioForm';
import BioSection from './BioSection';

export const BioFormContext = React.createContext();
// Donec faucibus aliquam mi, et varius dui mattis sit amet. Sed interdum elit vel lacus condimentum, et dapibus augue consectetur. Ut libero ante, dictum sed ex id, dignissim aliquam arcu. Mauris venenatis pellentesque nisl quis bibendum. Fusce gravida, justo in bibendum ullamcorper, dolor justo tempor purus, non facilisis leo lorem eu augue.
const Dashboard = ({ user, followers, albums, getFollowers, getAllAlbumsForOneArtist, editBio }) => {
    const [bio, setBio] = useState("");
    const [bioFormVisible, setBioFormVisible] = useState(false);
    const [bioEditFormVisible, setBioEditFormVisible] = useState(false);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        getFollowers()
            .then(() =>  getAllAlbumsForOneArtist(user.id))
    }, [user.id])

    const updateBio = () => (e) => {
        setBio(e.target.value);
        console.log("BIO ", bio);
    }   

    const handleEditAlbumBtn = (albumId) => (e) => {
        console.log("edit button clicked!");
    }
    
    const handleEditBioBtn = (e) => {
        setBioFormVisible(true);
    }
    
    const handleCloseBioFormBtn = (e) => {
        setBioFormVisible(false);
        setBioEditFormVisible(false);

    }

    const handleSubmitBioBtn = (e) => {
        e.preventDefault();
        const data = { bio }
        return editBio(data)
            .then((res) => {
                handleCloseBioFormBtn();
            })
            .catch((res) => {
                if(res.data && res.data.errors) setErrors(res.data.errors);
            })
        // editBio(data)
    }
    

    if(!followers || !albums) {
        return null;
    }

    return (
        <BioFormContext.Provider 
            value={{user, 
                bio, 
                setBioEditFormVisible, 
                handleSubmitBioBtn, 
                handleCloseBioFormBtn,
                updateBio, 
                errors}} 
             >
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
                                <h3>DISCOGRAPHY</h3> <button className="discography__add-btn">+ add</button>
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

                        <div className="followers__header-holder">
                            <h3>FOLLOWERS</h3>
                        </div>
                        <div className="followers__holder">
                            {
                                followers ? 
                                <Followers followers={followers} /> :
                                ( 
                                    <>
                                    <div className="follower__placeholder"></div>
                                    <div className="follower__placeholder"></div>
                                    <div className="follower__placeholder"></div>
                                    <div className="follower__placeholder"></div>
                                    </>
                                )
                            }
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
                                    <BioSection 
                                        user={user} 
                                        bioEditFormVisible={bioEditFormVisible}
                                        setBioEditFormVisible={setBioEditFormVisible}
                                    />
                                    // <>
                                    // <div className="artist-info__bio-header">
                                    //     Bio 
                                    //     <button>edit</button>
                                    // </div>
                                    // {user.bio}
                                    // </>
                                ) :
                                <AddBioButton 
                                    handleEditBioBtn={handleEditBioBtn} 
                                    setBioFormVisible={setBioFormVisible}
                                    bioFormVisible={bioFormVisible}
                                    handleSubmitBioBtn={handleSubmitBioBtn}
                                    updateBio={updateBio}
                                    bio={bio}
                                    setBio={setBio}
                                    user={user}
                                    errors={errors}
                                />

                            }
                        </div>
                        {/* {
                            bioFormVisible ?
                            <BioForm 
                                user={user} 
                                bio={bio}
                                setBio={setBio}
                                setBioFormVisible={setBioFormVisible}
                                handleSubmitBioBtn={handleSubmitBioBtn}
                                updateBio={updateBio}
                                errors={errors}
                            /> :
                            <AddBioButton 
                                handleEditBioBtn={handleEditBioBtn} 
                                setBioFormVisible={setBioFormVisible}
                            />
                        } */}
                    </div>
                </div>
            </div>
        </BioFormContext.Provider>
    )
}

export default Dashboard;