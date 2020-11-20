import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import sessionReducer from './session';
import artistSignupReducer from './ui-artist-signup-form';
import fanSignupReducer from './ui-fan-signup-form';
import loginFormReducer from './ui-login-form';
import roleFormReducer from './ui-role-form';
import genresReducer from './genres'; 


const rootReducer = combineReducers({
    session: sessionReducer,
    artistSignupForm: artistSignupReducer,
    fanSignupForm: fanSignupReducer,
    loginForm: loginFormReducer,
    roleForm: roleFormReducer,
    genres: genresReducer,
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
  };
  
  export default configureStore;