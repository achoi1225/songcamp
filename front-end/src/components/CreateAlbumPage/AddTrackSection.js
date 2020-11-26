import React from 'react'
import LinearIndeterminate from './LinearIndeterminate';

export const AddTrackSection = ({ 
    currentIdx,
    setCurrentIdx,
    addTrackIdx,
    trackIsLoading, }) => {

    return (
        <div onClick={() => setCurrentIdx(1)}
            className={
                (currentIdx === addTrackIdx) ?
                ("album-edit-page__track-select active") : 
                ("album-edit-page__track-select")
            }
        >
            <div className="album-edit-page__add-track-text">
                add track
            </div>

            {trackIsLoading ?
                <div className="album-edit-page__progress-bar-holder ">
                    <span>Loading...</span>
                    <LinearIndeterminate />
                </div> :
                null
            }
        </div>
    )
}

export default AddTrackSection;