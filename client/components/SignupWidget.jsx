////////////////////////////////////////////////////////////////////////////////
// React
////////////////////////////////////////////////////////////////////////////////
import React from 'react';

// Components.
import Notification from 'components/Notification';

////////////////////////////////////////////////////////////////////////////////
// React Router
////////////////////////////////////////////////////////////////////////////////
import { withRouter, Link } from 'react-router';  // Allows component to be aware of React Router

////////////////////////////////////////////////////////////////////////////////
// Other
////////////////////////////////////////////////////////////////////////////////
const request = require('config/request');  // Make HTTP GET/POST requests

////////////////////////////////////////////////////////////////////////////////
// Component definition
////////////////////////////////////////////////////////////////////////////////
export default class SignupWidget extends React.Component {

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
    this.setNotification = require('common/notifyFunctions').setNotification.bind(this);     // Set notification.
    this.clearNotification = require('common/notifyFunctions').clearNotification.bind(this); // Clear notification.
  }

  // Method to handle form submission.
  handleFormSubmit(e) {

    // Prevent default form action.
    e.preventDefault();

    // Get username and password from input boxes.
    let username = this.refs.inputUsername.value.trim();
    let password1 = this.refs.inputPassword1.value.trim();
    let password2 = this.refs.inputPassword2.value.trim();

    // Response body object.
    const body = {username, password1, password2};

    // Send an HTTP POST request to the server.
    // Sends username and passwords in the request body.
    request.post('/api/signup', body)
      .then((res) => {

        // Request successful and user account created.
        // Display notification.
        this.setNotification('SUCCESS', 'Your account has been created!');

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
    this.refs.inputPassword1.value = '';
    this.refs.inputPassword2.value = '';

    // Clear all notifications.
    this.clearNotification();

  }

  // Render.
  render() {

    return (
      <form>

        {/* Display a notification on error */}
        {this.state.notification && this.state.notification.type == 'DANGER' ? <Notification notification={this.state.notification} handleClose={this.clearNotification}/> : <span/>}

        {/* Display a notification on success */}
        {this.state.notification && this.state.notification.type == 'SUCCESS' ? <Notification notification={this.state.notification} handleClose={this.clearNotification} link={<Link to="/login">Click here to log in.</Link>}/> : <span/>}

        <label className="label">Username:</label>
        <p className="control">
          <input className="input" ref="inputUsername" type="text" minLength="8" maxLength="25"/>
        </p>

        <label className="label">Password:</label>
        <p className="control">
          <input className="input" ref="inputPassword1" type="password" minLength="8" maxLength="50"/>
        </p>

        <label className="label">Confirm Password:</label>
        <p className="control">
          <input className="input" ref="inputPassword2" type="password" minLength="8" maxLength="50"/>
        </p>

        <br/>

        <p className="control">
          <a className="button is-primary is-medium has-text-centered is-fullwidth" onClick={this.handleFormSubmit}>Submit</a>
        </p>

      </form>
    )
  }

}
