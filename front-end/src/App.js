import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import SignupPage from "./components/SignupPage";
import LoginFormPage from "./components/LoginFormPage/index";
// import SignupFormPage from "./components/SignupFormPage";
import Navigation from './components/Navigation';
import DashboardContainer from './components/DashboardContainer';
import CreateAlbumPage from './components/CreateAlbumPage';
import EditAlbumPageContainer from './components/EditAlbumPageContainer';
import AlbumPage from './components/AlbumPage';
import * as sessionActions from "./store/session";

const App = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser())
      .then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <>
      <Navigation isLoaded={isLoaded}/>
      <Switch>
        <Route exact={true} path="/signup" 
          render = {() => <SignupPage /> }
        />
        <Route exact path="/login">
          <LoginFormPage/>
        </Route>
        <Route exact path="/albums/:albumId">
          <AlbumPage />
        </Route>
        <Route exact path="/dashboard">
          <DashboardContainer/>
        </Route>
        <Route exact path="/create-album">
          <CreateAlbumPage />
        </Route>
        <Route exact path="/edit-album/:albumId">
          <EditAlbumPageContainer/>
        </Route>
        {/* <Route exact path="/signup">
          <SignupFormPage />
        </Route> */}
      </Switch>
    </>
  );
}

export default App;
