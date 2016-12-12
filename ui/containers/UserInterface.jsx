// React
import React from 'react';

// Components.
import NavBar from 'components/NavBar';

// Containers.
import LoginPage from 'containers/LoginPage';
import SignupPage from 'containers/SignupPage';
import CreatePoll from 'containers/CreatePoll';
import ViewPoll from 'containers/ViewPoll';
import App from 'containers/App';

// React Router
import { Router, Route, Link, browserHistory, IndexRoute, hashHistory } from 'react-router';

// Component definition.
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
          <Route path='/signup' component={SignupPage}/>
          <Route path='/create_poll' component={CreatePoll}/>
          <Route path='/view/poll/:poll_id' component={ViewPoll}/>
        </Route>
      </Router>
    )
  }
}

/*
<div>
  <NavBar/>
  <ViewPoll/>
  <LoginPage/>
  <CreatePoll/>
  <SignupPage/>
</div>
*/
