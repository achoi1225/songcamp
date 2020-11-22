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