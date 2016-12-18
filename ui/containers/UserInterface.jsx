////////////////////////////////////////////////////////////////////////////////
// React
////////////////////////////////////////////////////////////////////////////////
import React from 'react';

// Containers
import App from 'containers/App';
import LoginPage from 'containers/LoginPage';

////////////////////////////////////////////////////////////////////////////////
// React Router
////////////////////////////////////////////////////////////////////////////////
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

////////////////////////////////////////////////////////////////////////////////
// Component Definition
////////////////////////////////////////////////////////////////////////////////
export default class UserInterface extends React.Component {

  // Component constructor.
  constructor(props) {
    super(props);
  }

  // Component render.
  render() {
    return (
      <Router history={hashHistory}>
        <Route path='/' component={App}>
          <Route path='/login' component={LoginPage}/>
          <Route path='/create_poll' component={Dummy}/>
          <Route path='/signup' component={Dummy}/>
          <Route path='/auth/dashboard' component={Dummy}/>
        </Route>
      </Router>
    )
  }
}

// Dummy component.
const Dummy = () => (
  <div>
    Dummy
  </div>
)
