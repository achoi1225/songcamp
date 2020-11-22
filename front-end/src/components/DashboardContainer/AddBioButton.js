import React from 'react';
import BioForm from './BioForm'; 

export const AddBioButton = ({ 
    bioFormVisible,
    setBioFormVisible,
    bio,
    setBio,
    handleSubmitBioBtn,
    updateBio,
    user,
    errors }) => {
    return (
        <>
        {
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
                <button 
                    onClick={() => setBioFormVisible(true)}
                    className="artist-info__add-bio-btn">
                        add artist bio
                </button>
        }
        </>
    )
}

export default AddBioButton;
