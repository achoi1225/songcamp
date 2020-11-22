import React from 'react';

const Followers = ({ followers }) => {
    return(
        <>
        {
            followers.map((follower) => {
                return(
                    <div key={follower.id} className="follower__photo-holder">
                        <div className="follower__photo" style={{backgroundImage: `url(${follower.imgUrl})`}}>
                        </div>
                        {follower.userName}
                    </div>
                )
            })

        }
        </>
    )
}

export default Followers;