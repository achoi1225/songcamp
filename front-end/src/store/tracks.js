import { fetch } from './csrf';
// import errorNotifications from "../../errorNotifications";
import { getOneAlbum } from "./album";


// ========================================================================================
// CREATE TRACK FOR AN ALBUM
// ========================================================================================
export const createTrack = (payload) => async (dispatch, getState) => {
    console.log("INSIDE CREATE TRACK")

    const res = await fetch(`/api/tracks`, {
        method: "POST",
        body: payload
    })

    // if(res.status === 401) {
    //     window.location.href = "/log-in";
    //     return;
    // }

    console.log(`GETTING ALBUM WITH ID ${res.data.newTrack.albumId}`)
    await dispatch(getOneAlbum(res.data.newTrack.albumId));

    return res;
}


// ========================================================================================
// EDIT TRACK TITLE FOR AN ALBUM
// ========================================================================================
export const editTrackTitle = (payload, trackId) => async (dispatch, getState) => {
    console.log("INSIDE CREATE TRACK")

    const res = await fetch(`/api/tracks/${trackId}`, {
        method: "PATCH",
        body: payload
    })

    console.log(`GETTING ALBUM WITH ID ${res.data.updatedTrack.albumId}`)
    await dispatch(getOneAlbum(res.data.updatedTrack.albumId));

    return res;
}


// ========================================================================================
// DELETE ALBUM TRACK
// ========================================================================================
export const deleteTrack = (trackId) => async (dispatch, getState) => {
    console.log("INSIDE EDIT ALBUM")

    const {
        album: { current: { id } }
    } = getState();

    const res = await fetch(`/api/tracks/${trackId}`, {
        method: "DELETE",
    })

    await dispatch(getOneAlbum(id));

    return res;
}