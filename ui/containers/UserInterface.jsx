// React
import React from 'react';

// Components.
import NavBar from 'components/NavBar';

// Containers.
import LoginPage from 'containers/LoginPage';
import SignupPage from 'containers/SignupPage';
import CreatePoll from 'containers/CreatePoll';
import ViewPoll from 'containers/ViewPoll';
import CastVote from 'containers/CastVote';
import App from 'containers/App';
import AppIndex from 'containers/AppIndex';
import Dashboard from 'containers/Dashboard';

// React Router
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

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
          <IndexRoute component={AppIndex}/>
          <Route path='/login' component={LoginPage}/>
          <Route path='/signup' component={SignupPage}/>
          <Route path='/view/poll/:poll_id' component={ViewPoll}/>
          <Route path='/auth' component={Dashboard}/>
          <Route path='/auth/create_poll' component={CreatePoll}/>
          <Route path='/auth/vote/poll/:poll_id' component={CastVote}/>
        </Route>
      </Router>
    )
  }
}
