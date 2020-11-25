import React from 'react'

import BioForm from './BioForm';

export const BioSection = ({ user, bioEditFormVisible, setBioEditFormVisible }) => {
    return (
        <>
        {
            bioEditFormVisible ?
                <BioForm /> :
                <>
                    <div className="artist-info__bio-header">
                        Bio 
                        <button className="artist-info__bio-edit-btn" onClick={() => setBioEditFormVisible(true)}>edit</button>
                    </div>
                    {user.bio}
                </>
        }
        </>
    )
}

export default BioSection;
