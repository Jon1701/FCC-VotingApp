////////////////////////////////////////////////////////////////////////////////
// React
////////////////////////////////////////////////////////////////////////////////
import React from 'react';
import ReactDOM from 'react-dom';

// Containers
import Dummy from 'containers/Dummy'; // Dummy container/component
import App from 'containers/App';     // UI Container
import LoginPage from 'containers/LoginPage'; // Login page
import LogoutPage from 'containers/LogoutPage'; // Logout page
import SignupPage from 'containers/SignupPage'; // Signup page
import HomePage from 'containers/HomePage'; // Homepage for / route.
import CreatePollPage from 'containers/CreatePollPage'; // Homepage for / route.
import ViewPollPage from 'containers/ViewPollPage'; // Homepage for /view/poll/:pollID route.

////////////////////////////////////////////////////////////////////////////////
// React Router
////////////////////////////////////////////////////////////////////////////////
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

////////////////////////////////////////////////////////////////////////////////
// Redux
////////////////////////////////////////////////////////////////////////////////
import { Provider } from 'react-redux';
import { createStore } from 'redux';

// Reducers and store.
import reducers from 'reducers/index.js';
let store = createStore(reducers);

// Function to require authentication when accessing a route.
const requireAuth = (nextState, replace) => {

  // Get token from the redux state.
  const token = store.getState().token;

  // If no token is in the redux state, redirect to the login page.
  // When done authenticating, proceed to original route accessed.
  if (!token) {
    replace({
      pathname: '/login',
      state: {nextPathname: nextState.location.pathname}
    });
  }

}

// Subscribe to state changes.
store.subscribe(() => {
  console.log(store.getState());
});

// Application stylesheet.
require("stylesheets/stylesheet.scss");

// Application Container.
// Contains redux store, and client routes.
const ApplicationUIContainer = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={HomePage}/>
        <Route path='/login' component={LoginPage}/>
        <Route path='/logout' component={LogoutPage}/>
        <Route path='/signup' component={SignupPage}/>
        <Route path='/create_poll' onEnter={requireAuth} component={CreatePollPage}/>
        <Route path='/view/poll/:pollID' component={ViewPollPage}/>
        <Route path='/dashboard' component={Dummy}/>
      </Route>
    </Router>
  </Provider>
)

// Render to DOM.
ReactDOM.render(ApplicationUIContainer, document.getElementById('react-target'));
