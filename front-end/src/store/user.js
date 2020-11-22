
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
