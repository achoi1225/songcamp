
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
// RESTOR USER
// ==============================================================
export const restoreUser = () => async dispatch => {
    const res = await fetch('/api/session');
    dispatch(loadUser(res.data.user));
    return res;
};


// ==============================================================
// USER SIGN UP
// ==============================================================
export const signup = (user) => async (dispatch) => {
    const { username, email, password } = user;
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
    dispatch(loadUser(response.data.user));
    return response;
};


// ==============================================================
// SESSION REDUCER
// ==============================================================
const initialState = { user: null };

const sessionReducer = (state= initialState, action)  => {
    console.log("action!", action);
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