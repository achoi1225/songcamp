import React from "react";

import '../SignupPage/modal-form.css'

const UploadPhotoForm = ({setIsUploadPhotoFormVisible, handlePhotoSubmit, setImage}) => {

    const handleClose = (e) => {
        console.log('close');
        setIsUploadPhotoFormVisible(false);
    }

    return (
        <div className="form-holder">
            <div className="form-content">
                <div className="form-header-container">
                    <h3 className="form-header">Choose image to upload</h3>
                    <span onClick={handleClose} className=".form-close-btn ">x</span>
                </div>

                <form onSubmit={handlePhotoSubmit} className="form">
                    <input
                        className="upload-input"
                        type="file"
                        placeholder="Upload an image"
                        required
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                    <button type="submit">submit</button>
                </form>
            </div>
        </div>
    )
}

export default UploadPhotoForm;