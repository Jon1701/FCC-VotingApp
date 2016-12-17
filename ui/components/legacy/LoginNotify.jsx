////////////////////////////////////////////////////////////////////////////////
// React
////////////////////////////////////////////////////////////////////////////////
import React from 'react';

// Components.
import LoginPage from 'containers/LoginPage';

import { Link } from 'react-router';

////////////////////////////////////////////////////////////////////////////////
// Redux
////////////////////////////////////////////////////////////////////////////////
import { connect } from 'react-redux';

class LoginNotify extends React.Component {

  // Constructor
  constructor(props) {
    super(props);

    // Local state.
    this.state = {
      showLoginForm: false, // Flag to toggle visibility of the login form.
    }

    // Bind methods to component instance.
    this.toggleShowLoginForm = this.toggleShowLoginForm.bind(this);
  }

  toggleShowLoginForm() {
    this.setState({
      showLoginForm: !this.state.showLoginForm
    })
  }

  // Component Render.
  render() {
    return (
      <div className="login-notify box">
        <p>
          {this.props.customMessage ? this.props.customMessage : 'You must be logged in to vote.'}
        </p>

        <p>
          <Link onClick={this.toggleShowLoginForm}>Click here to log in.</Link>
        </p>

        {this.state.showLoginForm ? <LoginPage/> : <span/>}
      </div>
    )
  }
}


// Maps state to props.
const mapStateToProps = (state) => {
  return {
    token: state.token
  }
}

// Allow component access to Redux store.
export default connect(mapStateToProps, null)(LoginNotify);
