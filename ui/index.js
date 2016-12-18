////////////////////////////////////////////////////////////////////////////////
// React
////////////////////////////////////////////////////////////////////////////////
import React from 'react';
import ReactDOM from 'react-dom';

// Containers
import Dummy from 'containers/Dummy'; // Dummy container/component
import App from 'containers/App';     // UI Container
import LoginPage from 'containers/LoginPage'; // Login page

////////////////////////////////////////////////////////////////////////////////
// React Router
////////////////////////////////////////////////////////////////////////////////
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

////////////////////////////////////////////////////////////////////////////////
// Redux
////////////////////////////////////////////////////////////////////////////////
import { Provider } from 'react-redux';
import { createStore } from 'redux';

// Reducers and store.
import reducers from 'reducers/index.js';
let store = createStore(reducers);

// Subscribe to state changes.
store.subscribe(() => {
  console.log(store.getState());
});

// Include stylesheets.
require("stylesheets/stylesheet.scss");

// Application Container.
// Contains redux store, and client routes.
const ApplicationUIContainer = (
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path='/' component={App}>
        <Route path='/login' component={LoginPage}/>
        <Route path='/create_poll' component={Dummy}/>
        <Route path='/signup' component={Dummy}/>
        <Route path='/auth/dashboard' component={Dummy}/>
      </Route>
    </Router>
  </Provider>
)

// Render to DOM.
ReactDOM.render(ApplicationUIContainer, document.getElementById('react-target'));
