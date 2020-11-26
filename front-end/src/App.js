import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";

import SignupPage from "./components/SignupPage";
import LoginFormPage from "./components/LoginFormPage/index";
// import SignupFormPage from "./components/SignupFormPage";
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import CreateAlbumPage from './components/CreateAlbumPage';
import EditAlbumPage from './components/EditAlbumPage';
import AlbumPage from './components/AlbumPage';
import * as sessionActions from "./store/session";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user)
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser())
      .then(() => setIsLoaded(true))
  }, [dispatch]);

  return isLoaded && (
    <>
      <Navigation/>
      <Switch>
        <Route exact={true} path="/signup" 
          render = {() => <SignupPage /> }
        />
        {user ? 
          <>
          <Route exact path="/login">
            <LoginFormPage/>
          </Route>
          <Route exact path="/albums/:albumId">
            <AlbumPage />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard/>
          </Route>
          <Route exact path="/create-album">
            <CreateAlbumPage />
          </Route>
          <Route exact path="/edit-album/:albumId">
            <EditAlbumPage/>
          </Route>
          {/* <Route exact path="/signup">
            <SignupFormPage />
          </Route> */} 
          </> :
          <Redirect to="/signup" />
        }
      </Switch>
    </>
  );
}

export default App;
