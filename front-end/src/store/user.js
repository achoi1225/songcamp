
import { fetch } from './csrf';
import { loadUser } from './session';
// export const LOAD_GENRES = "songcamp/genres/LOAD_GENRES";

// export const loadGenres = (list) => ({
//     type: LOAD_GENRES,
//     list
// })


// ==============================================================
// EDIT BIO
// ==============================================================
export const editBio = (data) => async (dispatch, getState) => {

    const {
        session: { user: { id } }
    } = getState();

    console.log("DATA!! ", data);
    const res = await fetch(`/api/users/${id}`,
            {
                method: "PATCH",
                body: JSON.stringify(data),
            }   
        );

        await dispatch(loadUser(res.data.updatedUser));
        console.log("EDITED BIO! ", res.data.updatedUser);
        return res.data.updatedUser;
}


// ========================================================================================
// EDIT USER
// ========================================================================================
export const editUser = (data) => async (dispatch, getState) => {
    const {
        session: { user: { id } }
    } = getState();

    const res = await fetch(`/api/users/${id}`, {
        method: "PATCH",
        body: data
    })

    // if(response.status === 401) {
    //     window.location.href = "/log-in";
    //     return;
    // }

    console.log("RES.DATA.UPDATEDUSER", res.data.updatedUser);
    await dispatch(loadUser(res.data.updatedUser));

    return res;
}

// ========================================================================================
// DELETE PHOTO ONLY!
// ========================================================================================
export const deletePhoto = (data) => async (dispatch, getState) => {
    const {
        session: { user: { id } }
    } = getState();

    const res = await fetch(`/api/users/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
    })

    console.log("USER PHOTO DELETED! ", res.data.updatedUser);
    await dispatch(loadUser(res.data.updatedUser));

    return res;
}