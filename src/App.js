import React from 'react';
import { BrowserRouter, Switch, Route, useHistory } from 'react-router-dom';

import LoginFormPage from './components/LoginFormPage/index';

const App = () => {
  return (
    <BrowserRouter>
      <Route path="/login" render={() => <LoginFormPage />} />
    </BrowserRouter>
  );
}

export default App;
