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
import { bindActionCreators } from 'redux';

// Actions.
import { storeToken } from 'actions/index';

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
class LoginPage extends React.Component {

  // Constructor.
  constructor(props) {
    super(props);

    // Local state.
    this.state = {
      message: null,  // Store error message.
      messageBoxType: null
    }

    // Bind form submission handler to component instance.
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Handle form submission.
  handleSubmit(e) {

    // Prevent default form submit action.
    e.preventDefault();

    // Disable the submit button immediately once form is submitted.
    this.refs.submitButton.disabled = true;

    // Get username and password from input fields.
    const data = {
      username: this.refs.usernameField.value,
      password: this.refs.passwordField.value
    }

    // Send a POST request to the API, send username and password.
    axios.post('/api/auth/login', data, CONFIG_AXIOS).then((res) => {

      // Hide error box.
      this.setState({
        message: null,
        messageBoxType: null
      });

      // Clear form values.
      this.refs.usernameField.value = '';
      this.refs.passwordField.value = '';

      // Re-enable submit button.
      this.refs.submitButton.disabled = false;

      // Store token in state.
      this.props.storeToken(res.data.token);

    }).catch((err) => {

      // Re-enable submit button.
      this.refs.submitButton.disabled = false;

      // Store error message into state.
      this.setState({
        message: err.response.data.message,
        messageBoxType: 'DANGER'
      });

    })

  }

  // Render.
  render() {
    return (
      <div className="has-text-centered columns is-mobile">

        <div className="column is-8 is-offset-2">

          <h1 className="title">Sign in to create and vote in polls!</h1>

          <div className="box">

            <AlertBox message={this.state.message} boxType={this.state.messageBoxType}/>

            <form onSubmit={this.handleSubmit}>

              <label className="label">Username</label>
              <p className="control">
                <input className="input" ref="usernameField" type="text" defaultValue="username1"/>
              </p>

              <label className="label">Password</label>
              <p className="control">
                <input className="input" ref="passwordField" type="password" defaultValue="password"/>
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

// Allow access of dispatch actions as props.
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    storeToken: storeToken
  }, dispatch);
}

// Allow component access to Redux store.
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
