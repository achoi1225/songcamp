import { fetch } from './csrf';

export const LOAD_FOLLOWING = "songcamp/following/LOAD_FOLLOWING";
export const LOAD_FOLLOWERS = "songcamp/followers/LOAD_FOLLOWERS";


// =============================================================================================
// FOLLOWS ACTIONS
// =============================================================================================
export const loadFollowing = (list) => ({
    type: LOAD_FOLLOWING,
    list
})

export const loadFollowers = (list) => ({
    type: LOAD_FOLLOWERS,
    list
})


// =============================================================================================
// GET LIST OF ALL ARTISTS USER IS FOLLOWING
// =============================================================================================
export const getFollowing = (id) => async (dispatch) => {
        const res = await fetch(`/api/follows/following/${id}`);

        console.log("FOLLOWING LIST!!!! ", res.data.following);

        dispatch(loadFollowing(res.data.following));
        return res;
} 


// =============================================================================================
// GET LIST OF ALL FANS FOLLOWING ARTIST
// =============================================================================================
export const getFollowers = (id) => async (dispatch) => {
        const res = await fetch(`/api/follows/followers/${id}`);
        dispatch(loadFollowers(res.data.followers));
        return res;
} 


// ==============================================================
// CREATE A FOLLOWING
// ==============================================================
export const follow = (followingId) => async (dispatch, getState) => {
    
    // const body = { followingId } ;
    const {
        session: { user: { id } }
    } = getState();

    const res = await fetch(`/api/follows/${followingId}`, {
        method: "POST",
    });

    console.log("add follow successful!!!! ", res.data.newFollow);
    dispatch(getFollowing(id));
    return res;
} 


// ==============================================================
// DELETE A FOLLOWING
// ==============================================================
export const deleteFollow = (followingId) => async (dispatch, getState) => {

    const {
        session: { user: { id } }
    } = getState();

    console.log("INSIDE DELETE FOLLOW!!", followingId)

        const res = await fetch(`/api/follows/${followingId}`, {
            method: "DELETE",
        });
    
        if(res.status === 401) {
            window.location.href = "/log-in";
            return;
        }

        dispatch(getFollowing(id));
        return res;
}


// ==============================================================
// HELPER FUNCTION - Filters to followers of an artist
// ==============================================================
const filterToFollowers = (list) => {
    return list.map(follower => {
        return follower.user;
    })
}

const filterToFollowing = (list) => {
    return list.map(fol => {
        return fol.following;
    })
}


// ==============================================================
// FOLLOWS REDUCER
// ==============================================================
export function followsReducer(state={}, action){
    switch (action.type) {
        case LOAD_FOLLOWING: {
            return {
                ...state,
                followingList: filterToFollowing(action.list)
            }
        }

        case LOAD_FOLLOWERS: {
            return {
                ...state,
                followersList: filterToFollowers(action.list)
            }
        }

        default:
            return state;
    }
}

export default followsReducer;

// ERRORS NOTIFICATIONS =============================================================================================
// if(err.status >= 400 && err.status < 600) {
        //     const errorJSON = await err.json();
            // const errorsContainer = document.querySelector(".errors-container");

            // const errorsHtml = [
            //     `<div class="alert alert-danger">
            //         Something went wrong. Please try again.
            //     </div>`
            // 

            // const { errors } = errorJSON;

            // if(errors && Array.isArray(errors)) {
                // errorsHtml = errors.map(
                //     (message) => 
                //     `<div class="alert alert-danger">
                //         ${ message }
                //     </div>`
                // )

                // console.log("ERRORS!!", errors)
            // }

            // errorsContainer.innerHTML = errorsHtml.join("");
        // } else {
        //     alert(
        //         "Something went wrong. Please check your internet connection and try again!"
        //     )
        // }