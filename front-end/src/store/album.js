import { fetch } from './csrf';

// import { errorNotifications } from "../error-notifications.js";
export const SET_CURRENT = "songcamp/albums/SET_CURRENT";

export const setCurrent = (current) => ({
    type: SET_CURRENT,
    current
})

// ========================================================================================
// GET ONE ALBUM
// ========================================================================================
export const getOneAlbum = (id) => async (dispatch, getState) => {

    console.log("GET ONE ALBUM");

    const res = await fetch(`/api/albums/${id}`)
    
    console.log("ONE ALBUM!!! ", res.data.album)
    dispatch(setCurrent(res.data.album));
}


// ========================================================================================
// CREATE ALBUM
// ========================================================================================
export const createAlbum = (payload) => async (dispatch, getState) => {
    console.log("INSIDE CREATE ALBUM")
    const res = await fetch(`/api/albums`, {
        method: "POST",
        body: payload
    })

    // if(res.status === 401) {
    //     window.location.href = "/log-in";
    //     return;
    // }

    console.log("NEW ALBUM!!!!!", res.data.newAlbum);
    dispatch(setCurrent(res.data.newAlbum));
    console.log("new album created!!!");

    return res;
}


// ========================================================================================
// EDIT ALBUM
// ========================================================================================
export const editAlbum = (payload, albumId) => async (dispatch, getState) => {
    console.log("INSIDE EDIT ALBUM")

    const res = await fetch(`/api/albums/${albumId}`, {
        method: "PUT",
        body: payload
    })

    // if(response.status === 401) {
    //     window.location.href = "/log-in";
    //     return;
    // }

    console.log("RES.DATA.UPDATEDALBUM!!! ", res.data.updatedAlbum);
    dispatch(setCurrent(res.data.updatedAlbum));

    return res;
}


// ========================================================================================
// ALBUM REDUCER
// ========================================================================================
export function albumReducer(state = {}, action) {
    switch (action.type) {
      case SET_CURRENT: {
        return {
          ...state,
          current: action.current,
        };
      }
  
      default:
        return state;
    }
}

export default albumReducer;