import { fetch } from './csrf';

export const LOAD_ALL_ALBUMS = "songcamp/albums/LOAD_ALL_ALBUMS";
export const LOAD_ALL_ALBUMS_FOR_ONE_ARTIST = "songcamp/albums/LOAD_ALL_ALBUMS_FOR_ONE_ARTIST";
export const LOAD_FEATURED_ALBUMS = "songcamp/albums/LOAD_FEATURED_ALBUMS";

export const loadAllAlbums = (list) => ({
    type: LOAD_ALL_ALBUMS,
    list
})

export const loadAllAlbumsForOneArtist = (list) => ({
    type: LOAD_ALL_ALBUMS_FOR_ONE_ARTIST,
    list
})

export const loadFeaturedAlbums = (list) => ({
  type: LOAD_FEATURED_ALBUMS,
  list
})
// export const setCurrent = (current) => ({
//     type: SET_CURRENT,
//     current
// })


// ========================================================================================
// GET ALL PUBLISHED ALBUMS
// ========================================================================================
export const getAllPublishedAlbums = () => async (dispatch, getState) => {
    const res = await fetch(`/api/albums`);
    
    dispatch(loadAllAlbums(res.data.allAlbums));
    return res;
}
 


// ========================================================================================
// GET ALL ALBUMS FOR ONE ARTIST
// ========================================================================================
export const getAllAlbumsForOneArtist = (userId) => async (dispatch, getState) => {
    const {
        session: { user: { id } }
    } = getState();

    const res = await fetch(`/api/albums/artist/${id}/all`);
    
    dispatch(loadAllAlbumsForOneArtist(res.data.albums));
    return res;
}


// ========================================================================================
// GET FEATURED ALBUMS - Random 5 published records
// ========================================================================================
export const getFeaturedAlbums = () => async (dispatch) => {

  const res = await fetch(`/api/albums/featured`);
  
  dispatch(loadFeaturedAlbums(res.data.featuredAlbums));
  return res;
}

// ========================================================================================
// ALBUMS REDUCER
// ========================================================================================
export function albumsReducer(state = {}, action) {
    switch (action.type) {
      case LOAD_ALL_ALBUMS: {
        return {
          ...state,
          list: action.list,
        };
      }
  
      case LOAD_ALL_ALBUMS_FOR_ONE_ARTIST: {
        return {
          ...state,
          oneArtistAlbumsList: action.list,
        };
      }

      case LOAD_FEATURED_ALBUMS: {
        return {
          ...state,
          featuredAlbumsList: action.list,
        };
      }
  
      default:
        return state;
    }
  }

export default albumsReducer;

// // ========================================================================================
// // GET ONE ALBUM
// // ========================================================================================
// export const getOneAlbum = (id) => async (dispatch, getState) => {
//     const {
//         authentication: { token }
//     } = getState();

//     console.log("GET ONE ALBUM");

//     try{
//         const response = await fetch(`${baseUrl}/albums/${id}`, {
//             headers: { Authorization: `Bearer ${token}`},
//         });
        
//         if(!response.ok) {
//             throw response;
//         }
        
//         const { album } = await response.json();
        
//         dispatch(setCurrent(album));

//     } catch(err) {
//         console.error(err);
//         // errorNotifications(err);
//     }
// }


// // ========================================================================================
// // CREATE ALBUM
// // ========================================================================================
// export const createAlbum = (payload) => async (dispatch, getState) => {
//     console.log("INSIDE CREATE ALBUM")
//     const {
//         authentication: { token }
//     } = getState();

//     try {
//         const response = await fetch(`${baseUrl}/albums`, {
//             method: "POST",
//             headers: {
//                 // "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`
//             },
//             body: payload
//         })

//         if(response.status === 401) {
//             window.location.href = "/log-in";
//             return;
//         }

//         if(!response.ok) {
//             throw response;
//         }

//         const { newAlbum } = await response.json();
//         console.log("NEW ALBUM!!!!!", newAlbum);
//         dispatch(setCurrent(newAlbum));
//         console.log("new album created!!!");

//         return newAlbum;

//     } catch(err) {
//         // errorNotifications(err);
//     }
// }


// // ========================================================================================
// // EDIT ALBUM
// // ========================================================================================
// export const editAlbum = (payload, albumId) => async (dispatch, getState) => {
//     console.log("INSIDE EDIT ALBUM")
//     const {
//         authentication: { token }
//     } = getState();

//     try {
//         const response = await fetch(`${baseUrl}/albums/${albumId}`, {
//             method: "PUT",
//             headers: {
//                 // "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`
//             },
//             body: payload
//         })

//         if(response.status === 401) {
//             window.location.href = "/log-in";
//             return;
//         }

//         if(!response.ok) {
//             throw response;
//         }

//         const { updatedAlbum } = await response.json();
//         dispatch(setCurrent(updatedAlbum));
//         console.log("album updated!!!");

//         return updatedAlbum;

//     } catch(err) {
//         // errorNotifications(err);
//     }
// }



// export const uploadPhoto = (data) => async (dispatch, getState) => {
//     const {
//         authentication: { token },
//     } = getState();

//     const userId = localStorage.getItem(USER_ID);

//     try{
//         const response = await fetch(`${baseUrl}/albums/`,
//             {
//                 method: "POST",
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 },
//                 body: data,
//             }   
//         );

//         if(!response) {
//             throw response;
//         }

//         const { updatedUser } = await response.json();
//         dispatch(getUser());
//         return updatedUser.imgUrl;

//     } catch(err) {
//         console.error(err);
//     }

//     console.log("PHOTO UPLOAD SUCCESSFUL!!!");
// }

// export const deletePhoto = () => async (dispatch, getState) => {
//     const {
//         authentication: { token },
//     } = getState();

//     const body = { imgUrl: null };

//     const userId = localStorage.getItem(USER_ID);

//     try{
//         const response = await fetch(`${baseUrl}/users/${userId}`,
//             {
//                 method: "PATCH",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${token}`
//                 },
//                 body: JSON.stringify(body),
//             }   
//         );

//         if(response.status === 401) {
//             window.location.href = "/log-in";
//             return;
//         }

//         if(!response) {
//             throw response;
//         }

//         const { updatedUser } = await response.json();
//         dispatch(getUser());
//         return updatedUser.imgUrl;

//     } catch(err) {
//         console.error(err);
//     }
// }