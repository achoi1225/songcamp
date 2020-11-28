
import { fetch } from './csrf';
import errorNotifications from '../errorNotifications';

export const LOAD_USER = "songcamp/session/LOAD_USER";
export const REMOVE_USER = "songcamp/session/REMOVE_USER";


// ==============================================================
// ACTIONS
// ==============================================================
export const loadUser = (user) => ({
    type: LOAD_USER,
    user
})

export const removeUser = (user) => ({
    type: REMOVE_USER,
})


// ==============================================================
// LOGIN USER
// ==============================================================
export const login = ({credential, password}) => async (dispatch) => {
    
        const res = await fetch('/api/session', {
            method: 'POST',
            body: JSON.stringify({ credential, password })
        })
    
        // if(!res.ok) {
        //     throw res;
        // }

        dispatch(loadUser(res.data.user));
        return res;
}


// ==============================================================
// RESTORE USER
// ==============================================================
export const restoreUser = () => async dispatch => {
    const res = await fetch('/api/session');
    dispatch(loadUser(res.data.user));
    return res;
};


// ==============================================================
// FAN SIGN UP
// ==============================================================
export const fanSignup = (user) => async (dispatch) => {
    const { userName, email, password, artistName, genre, isArtist, bio, imgUrl } = user;
    const response = await fetch("/api/users/fans", {
      method: "POST",
      body: JSON.stringify({
        userName,
        email,
        password,
        artistName,
        isArtist,
        bio,
        imgUrl,
        genre
      }),
    });
    dispatch(loadUser(response.data.user));
    return response;
};


// ==============================================================
// ARTIST SIGN UP
// ==============================================================
export const artistSignup = (user) => async (dispatch) => {
    const { userName, email, password, artistName, genre, isArtist, bio, imgUrl } = user;
    const response = await fetch("/api/users/artists", {
      method: "POST",
      body: JSON.stringify({
        userName,
        email,
        password,
        artistName,
        isArtist,
        bio,
        genre,
        imgUrl,
      }),
    });
    dispatch(loadUser(response.data.user));
    return response;
};


// ==============================================================
// LOGOUT USER
// ==============================================================
export const logout = () => async (dispatch) => {
    const response = await fetch('/api/session', {
      method: 'DELETE',
    });
    dispatch(removeUser());
    return response;
  };


// ==============================================================
// SESSION REDUCER
// ==============================================================
const initialState = { user: null };

const sessionReducer = (state= initialState, action)  => {
    switch(action.type) {
        case LOAD_USER: {
            return {
                ...state,
                user: action.user
            }
        }

        case REMOVE_USER: {
            return {
                ...state,
                user: null
            }
        }

        default: 
            return state;
    }
}

export default sessionReducer;