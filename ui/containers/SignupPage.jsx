////////////////////////////////////////////////////////////////////////////////
// React
////////////////////////////////////////////////////////////////////////////////
import React from 'react';

// Components.
import AlertBox from 'components/AlertBox';

////////////////////////////////////////////////////////////////////////////////
// Redux
////////////////////////////////////////////////////////////////////////////////
import { connect } from 'react-redux';

////////////////////////////////////////////////////////////////////////////////
// Other modules
////////////////////////////////////////////////////////////////////////////////

// External libraries.
import axios from 'axios';  // AJAX Request library.

// Axios configuration file.
const CONFIG_AXIOS = require('config/axios.json');

////////////////////////////////////////////////////////////////////////////////
// Component definition
////////////////////////////////////////////////////////////////////////////////
class SignupPage extends React.Component {

  // Constructor.
  constructor(props) {
    super(props);

    // Local state.
    this.state = {
      userCreated: null,  // Boolean flag to signify whether or not a user was created.
      alertBoxMessage: null,  // Store error message.
      alertBoxType: null
    }

    // Bind form submission handler to component instance.
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateAlertBox = this.updateAlertBox.bind(this);
  }

  // Handle form submission.
  handleSubmit(e) {

    // Prevent default form submit action.
    e.preventDefault();

    // Clear existing alert box.
    this.updateAlertBox(null, null);

    // Disable the submit button immediately once form is submitted.
    this.refs.submitButton.disabled = true;

    // Get username and password from input fields.
    const data = {
      username: this.refs.usernameField.value,
      password: this.refs.passwordField.value
    }

    // Send a POST request to the API, send username and password.
    axios.post('/api/signup', data, CONFIG_AXIOS).then((res) => {

      // Store error message into state.
      this.setState({
        userCreated: true
      });

    }).catch((err) => {

      // Re-enable submit button.
      this.refs.submitButton.disabled = false;

      // Store error message into state.
      this.updateAlertBox(err.response.data.message, 'DANGER');

    })

  }

  // Function to update Alert Box.
  updateAlertBox(alertBoxMessage, alertBoxType) {
    this.setState({
      alertBoxMessage: alertBoxMessage,
      alertBoxType: alertBoxType
    })
  }

  // Render.
  render() {
    return (
      <div className="text-center columns is-mobile">

        <div className="column is-8 is-offset-2">

          <h1 className="title">Create an account to create and vote in polls!</h1>

          <div className="box">

            <AlertBox message={this.state.alertBoxMessage} boxType={this.state.alertBoxType}/>

            {this.state.userCreated ? <AlertBoxUserCreated/> : <span/>}

            <form onSubmit={this.handleSubmit}>

              <label className="label">Username</label>
              <p className="control">
                <input className="input" ref="usernameField" type="text"/>
              </p>

              <label className="label">Password</label>
              <p className="control">
                <input className="input" ref="passwordField" type="password"/>
              </p>

              <p className="control">
                <button className="button is-primary" ref="submitButton">Submit</button>
              </p>

            </form>

          </div>

        </div>

      </div>
    )
  }

  // Component lifecycle method.
  componentDidMount() {

    // Enable submit button.
    this.refs.submitButton.disabled = false;

  }
}

// Maps state to props.
const mapStateToProps = (state) => {
  return {
    token: state.token
  }
}

// Allow component access to Redux store.
export default connect(mapStateToProps, null)(SignupPage);

////////////////////////////////////////////////////////////////////////////////
// Presentational components
////////////////////////////////////////////////////////////////////////////////

// Alertbox to show that the user has been successfully created.
import { Link } from 'react-router';
const AlertBoxUserCreated = (props) => (
  <article className="message is-success">
    <div className="message-body">
      <div>
        User successfully created!
      </div>
      <div>
        <Link to={'/login'}>Click here to login.</Link>
      </div>
    </div>
  </article>
)
