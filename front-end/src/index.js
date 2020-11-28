import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import configureStore from './store';
import { restoreCSRF, fetch } from './store/csrf';
import * as sessionActions from './store/session';
import * as followsActions from './store/follows';
import * as albumsActions from './store/albums';
// import * as albumActions from './store/album';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();

  window.csrfFetch = fetch;
  window.store = store;
  window.sessionActions = sessionActions;
  window.followsActions = followsActions;
  window.albumsActions = albumsActions;

  // window.store.dispatch(window.albumsActions.getFeaturedAlbums())
  // window.store.dispatch(window.sessionActions.signup({
  //   username: 'NewUser',
  //   email: 'new@user.io',
  //   password: 'password',
  //   artistName: 'newArtist',
  //   isArtist: true,
  //   bio: 'new bio!',
  //   imgUrl: null,
  //   genre: 'Rock'
  // }));


  // window.store.dispatch(window.followsActions.getFollowing());
  // window.store.dispatch(window.albumsActions.getAllAlbumsForOneArtist(21));
  // window.store.dispatch(window.albumsActions.getNewAlbums());

}

function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
