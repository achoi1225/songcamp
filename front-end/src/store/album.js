import { fetch } from './csrf';

// import { errorNotifications } from "../error-notifications.js";
export const SET_CURRENT = "songcamp/album/SET_CURRENT";

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

    return res;
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

    if(res.status === 401) {
        window.location.href = "/log-in";
        return;
    }

    const albumId = res.data.newAlbum.id;
    await dispatch(getOneAlbum(albumId));
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

    console.log("RES.DATA.UPDATEDALBUM!!! ", res.data.album);
    await dispatch(getOneAlbum(albumId));

    return res;
}


// ========================================================================================
// DELETE ALBUM ARTWORK ONLY!
// ========================================================================================
export const deleteAlbumArtwork = (payload, albumId) => async (dispatch) => {
    console.log("INSIDE EDIT ALBUM")

    const res = await fetch(`/api/albums/${albumId}/delete-album-art`, {
        method: "PATCH",
        body: JSON.stringify(payload),
    })

    console.log("ALBUM WITH ARTWORK DELETED! ", res.data.album);
    await dispatch(getOneAlbum(albumId));

    return res;
}


// ========================================================================================
// PUBLISH ALBUM
// ========================================================================================
export const publishAlbum = (payload, albumId) => async (dispatch) => {
    console.log("PUBLISH ALBUM!!")
    const res = await fetch(`/api/albums/${albumId}/publish`, {
        method: "PATCH",
        body: JSON.stringify(payload),
    })

    await dispatch(getOneAlbum(albumId));

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