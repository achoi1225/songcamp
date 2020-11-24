import React from 'react';

const Following = ({ following }) => {
    return(
        <>
        {
            following.map((fol) => {
                return(
                    <div key={fol.id} className="following__photo-holder">
                        <div className="following__photo" style={{backgroundImage: `url(${fol.imgUrl})`}}>
                        </div>
                        {fol.userName}
                    </div>
                )
            })

        }
        </>
    )
}

export default Following;