import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import BioForm from './BioForm';

export const BioSection = () => {
    const user = useSelector(state => state.session.user);
    const [bioEditFormVisible, setBioEditFormVisible] = useState(false);

    return (
        <>
        {
            bioEditFormVisible ?
                <BioForm 
                    bioEditFormVisible={bioEditFormVisible}
                    setBioEditFormVisible={setBioEditFormVisible}
                /> :
                <>
                    <div className="artist-info__bio-header">
                        Bio 
                        <button className="artist-info__bio-edit-btn" onClick={() => setBioEditFormVisible(true)}>
                            edit
                        </button>
                    </div>
                    {user.bio}
                </>
        }
        </>
    )
}

export default BioSection;
