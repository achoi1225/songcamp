import React, { useContext, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { BioFormContext } from './';

import * as userActions from '../../store/user';


// export const BioForm = ({ bio, setBio, setBioFormVisible, handleSubmitBioBtn, updateBio, errors }) => {
    // const { bio, handleCloseBioFormBtn, handleSubmitBioBtn, updateBio} = useContext(BioFormContext);
    export const BioForm = ({ 
        bioFormVisible,
        setBioFormVisible,
        bioEditFormVisible,
        setBioEditFormVisible }) => {

        const dispatch = useDispatch();
        const [bio, setBio] = useState("");
        const [errors, setErrors] = useState([]);

        const updateBio = () => (e) => {
            setBio(e.target.value);
            console.log("BIO ", bio);
        }   
        
        const handleCloseBioFormBtn = (e) => {
            if(bioEditFormVisible) setBioEditFormVisible(false)
            else setBioFormVisible(false)
        }
        
        const handleSubmitBioBtn = (e) => {
            e.preventDefault();
            const data = { bio }
            return dispatch(userActions.editBio(data))
                .then((res) => handleCloseBioFormBtn())
                .catch((res) => {
                    if(res.data && res.data.errors) setErrors(res.data.errors);
                })
        }

    return (
        <form>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <textarea onChange={updateBio()} value={bio} className="artist-info__bio-text-field">    
            </textarea>
            <button className="artist-info__submit-form-btn" type="submit" onClick={handleSubmitBioBtn}>Submit</button>
            <button className="artist-info__cancel-btn" onClick={handleCloseBioFormBtn}>Cancel</button>
        </form>
    )
}

export default BioForm;
