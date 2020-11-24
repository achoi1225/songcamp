import React from 'react';

const Following = ({ followers }) => {
    return(
        <>
        {
            followers.map((follower) => {
                return(
                    <div key={follower.id} className="following__photo-holder">
                        <div className="following__photo" style={{backgroundImage: `url(${follower.imgUrl})`}}>
                        </div>
                        {follower.userName}
                    </div>
                )
            })

        }
        </>
    )
}

export default Following;