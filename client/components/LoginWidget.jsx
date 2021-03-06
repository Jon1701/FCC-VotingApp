////////////////////////////////////////////////////////////////////////////////
// React
////////////////////////////////////////////////////////////////////////////////
import React from 'react';

// Components.
import Notification from 'components/Notification';

////////////////////////////////////////////////////////////////////////////////
// Redux
////////////////////////////////////////////////////////////////////////////////
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions.
import { storeToken } from 'actions/index';

////////////////////////////////////////////////////////////////////////////////
// React Router
////////////////////////////////////////////////////////////////////////////////
import { withRouter } from 'react-router';  // Allows component to be aware of React Router

////////////////////////////////////////////////////////////////////////////////
// Other
////////////////////////////////////////////////////////////////////////////////

const request = require('config/request');  // Make HTTP GET/POST requests

////////////////////////////////////////////////////////////////////////////////
// Component definition
////////////////////////////////////////////////////////////////////////////////
class LoginWidget extends React.Component {

  // Constructor.
  constructor(props) {
    super(props);

    // Local state.
    this.state = {
      notification: null,  // Notification data. Of the form: {'type': '...', 'message': '...'}/
    }

    // Bind methods to component instance.
    this.handleFormSubmit = this.handleFormSubmit.bind(this);   // Submit form.
    this.handleFormReset = this.handleFormReset.bind(this);     // Reset form.
    this.setNotification = this.setNotification.bind(this);     // Set notification.
    this.clearNotification = this.clearNotification.bind(this); // Clear notification.
  }

  // Method to set the Notification panel.
  setNotification(type, message) {
    this.setState({
      notification: {type, message}
    });
  }

  // Method to clear the Notification panel.
  clearNotification() {
    this.setState({notification: null});
  }

  // Method to handle form submission.
  handleFormSubmit(e) {

    // Prevent default form action.
    e.preventDefault();

    // Get username and password from input boxes.
    let username = this.refs.inputUsername.value.trim();
    let password = this.refs.inputPassword.value.trim();

    // Response body object.
    const body = {username, password};

    // Send an HTTP POST request to the server.
    // Sends username and password in the request body.
    request.post('/api/auth/login', body)
      .then((res) => {

        // Get the token from the server response.
        const token = res.data.payload.token;

        // Store token in application state.
        this.props.storeToken(token);

        // Set success message.
        this.setNotification('SUCCESS', 'You have successfully logged in!');

        // Redirect to next route if user tried to access authenticated resource
        // without logging in first.
        const { location } = this.props;
        if (location.state && location.state.nextPathname) {
          this.props.router.replace(location.state.nextPathname);
        } else {
          this.props.router.replace('/');
        }

      })
      .catch((err) => {

        // Display error message if an error was recieved from the server.
        this.setNotification('DANGER', err.response.data.message);

      });

  }

  // Method to handle form reset.
  handleFormReset(e) {

    // Prevent default form action.
    e.preventDefault();

    // Clear all fields.
    this.refs.inputUsername.value = '';
    this.refs.inputPassword.value = '';

    // Clear all notifications.
    this.clearNotification();

  }

  // Render.
  render() {

    return (
      <form>

        {/* Display a notification on error/success. */}
        {this.state.notification ? <Notification notification={this.state.notification} handleClose={this.clearNotification}/> : <span/>}

        <label className="label">Username:</label>
        <p className="control">
          <input className="input" ref="inputUsername" type="text" minLength="8" maxLength="25"/>
        </p>

        <label className="label">Password:</label>
        <p className="control">
          <input className="input" ref="inputPassword" type="password" minLength="8" maxLength="50"/>
        </p>

        <br/>

        <div className="control">
          <a className="button is-primary is-medium has-text-centered is-fullwidth" onClick={this.handleFormSubmit}>Submit</a>
        </div>

      </form>
    )
  }

}

// Maps state to props.
const mapStateToProps = (state) => {
  return {
    token: state.token
  }
}

// Allow access of dispatch actions as props.
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    storeToken: storeToken
  }, dispatch);
}

// Allow component access to Redux store.
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginWidget));
