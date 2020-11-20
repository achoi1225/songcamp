
import { fetch } from './csrf';

export const LOAD_GENRES = "songcamp/genres/LOAD_GENRES";

export const loadGenres = (list) => ({
    type: LOAD_GENRES,
    list
})


// GET list of all artists the user is following
export const getGenres = () => async (dispatch) => {
 
    const res = await fetch(`/api/genres`);

    console.log("GENRES!!", res.data.genres);
    dispatch(loadGenres(res.data.genres));
    // return genres;
} 


export function genresReducer(state={}, action){
    switch (action.type) {
        case LOAD_GENRES: {
            return {
                ...state,
                list: action.list
            }
        }

        default:
            return state;
    }
}

export default genresReducer;