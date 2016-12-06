// React
import React from 'react';

// Components.
import NavBar from 'components/NavBar';

// Containers.
import LoginPage from 'containers/LoginPage';
import SignupPage from 'containers/SignupPage';


// Component definition.
export default class UserInterface extends React.Component {

  // Component constructor.
  constructor(props) {
    super(props);
  }

  // Component render.
  render() {
    return (
      <div>
        <NavBar/>
        <SignupPage/>
        <LoginPage/>
      </div>
    )
  }
}
