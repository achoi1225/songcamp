// import { baseUrl } from '../../config';
// import { TOKEN_KEY, USER_ID } from './authentication';

// const userId = localStorage.getItem(USER_ID);
// const token = localStorage.getItem(TOKEN_KEY);

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
export const getFollowing = () => async (dispatch) => {
        const res = await fetch(`/api/follows/following`);

        console.log("FOLLOWING LIST!!!! ", res.data.following);

        dispatch(loadFollowing(res.data.following));
} 


// =============================================================================================
// GET LIST OF ALL FANS FOLLOWING ARTIST
// =============================================================================================
export const getFollowers = () => async (dispatch) => {
        const res = await fetch(`/api/follows/followers`);

        console.log("FOLLOWING LIST!!!! ", res.data.followers);

        dispatch(loadFollowers(res.data.followers));
} 


// ==============================================================
// CREATE A FOLLOWING
// ==============================================================
export const follow = (followingId) => async (dispatch, getState) => {
    
    const body = { followingId } ;
    const {
        session: { user: { id } }
    } = getState();

    const res = await fetch(`/api/follows/user/${id}`, {
        method: "POST",
        body: JSON.stringify(body),
    });

    console.log("add follow successful!!!! ", res.data.newFollowing);
    dispatch(getFollowing(id));
    return res;
} 


// ==============================================================
// DELETE A FOLLOWING
// ==============================================================
export const deleteFollow = (id) => async (dispatch, getState) => {

    console.log("INSIDE DELETE FOLLOW!!", id)

        const res = await fetch(`/api/follows/${id}`, {
            method: "DELETE",
        });
    
        // if(response.status === 401) {
        //     window.location.href = "/log-in";
        //     return;
        // }

        dispatch(getFollowing());
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


// ==============================================================
// FOLLOWS REDUCER
// ==============================================================
export function followsReducer(state={}, action){
    switch (action.type) {
        case LOAD_FOLLOWING: {
            return {
                ...state,
                followingList: action.list
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
            // ]

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