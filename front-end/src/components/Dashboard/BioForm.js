import React, { useContext } from 'react'
import { BioFormContext } from './';


// export const BioForm = ({ bio, setBio, setBioFormVisible, handleSubmitBioBtn, updateBio, errors }) => {
export const BioForm = () => {
    const { bio, handleCloseBioFormBtn, handleSubmitBioBtn, updateBio} = useContext(BioFormContext);

    return (
        <form>
            {/* <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul> */}
            <textarea onChange={updateBio()} value={bio} className="artist-info__bio-text-field">    
            </textarea>
            <button className="artist-info__submit-form-btn" type="submit" onClick={handleSubmitBioBtn}>Submit</button>
            <button className="artist-info__cancel-btn" onClick={handleCloseBioFormBtn}>Cancel</button>
        </form>
    )
}

export default BioForm;
