
import { fetch } from './csrf';
import errorNotifications from '../errorNotifications';

export const LOAD_USER = "songcamp/session/LOAD_USER";
export const REMOVE_USER = "songcamp/session/REMOVE_USER";

export const loadUser = (user) => ({
    type: LOAD_USER,
    user
})

export const removeUser = (user) => ({
    type: REMOVE_USER,
})


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