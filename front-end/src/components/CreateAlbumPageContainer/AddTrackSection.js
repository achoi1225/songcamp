import React from 'react'

export const AddTrackSection = ({ 
    currentIdx,
    setCurrentIdx,
    addTrackIdx,
    tracksData }) => {

    return (
        <div onClick={() => setCurrentIdx(1)}
            className={
                (currentIdx === addTrackIdx) ?
                ("album-edit-page__track-select active") : 
                ("album-edit-page__track-select")
            }
        >
            <div className="album-edit-page__track-title"> 
                {/* {tracksData.title1} */}
                <div className="album-edit-page__add-track-text">
                    add track
                </div>
            </div>
        </div>
    )
}

export default AddTrackSection;