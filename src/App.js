import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LoginFormPage from './components/LoginFormPage/index';

const App = () => {
  const user = useSelector((state) => state.session.user);

  return (
    <BrowserRouter>
      <Route path="/login" 
        render={() => <LoginFormPage /> } 
      />
    </BrowserRouter>
  );
}

export default App;
