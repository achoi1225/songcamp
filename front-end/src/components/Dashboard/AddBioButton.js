import React, { useState } from 'react'
import BioForm from './BioForm'; 

export const AddBioButton = () => {
    
    const [bioFormVisible, setBioFormVisible] = useState(false);

    return (
        <>
        {
            bioFormVisible ?
            <BioForm 
                bioFormVisible={bioFormVisible}
                setBioFormVisible={setBioFormVisible} /> : 
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
