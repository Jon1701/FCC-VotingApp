// React.
import React from 'react';

// External libraries.
import axios from 'axios';  // AJAX Request library.

// Redux dependencies.
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions.
import { storeToken } from 'actions/index';

// Component definition.
class LoginPage extends React.Component {

  // Constructor.
  constructor(props) {
    super(props);

    // Bind form submission handler to component instance.
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Handle form submission.
  handleSubmit(e) {

    // Prevent default form submit action.
    e.preventDefault();

    // Disable the submit button.
    this.refs.submitButton.disabled = true;

    // Get username and password from input fields.
    let username = this.refs.usernameField.value;
    let password = this.refs.passwordField.value;

    // Send login info to server.
    axios({
      method: 'post',
      url: '/api/auth/login',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        username: username,
        password: password
      },

    }).then((res) => {

      // Store token in state.
      this.props.storeToken(res.data.token);

    }).catch((err) => {
      console.log(err)
    })

  }

  // Render.
  render() {
    return (
      <div className="text-center">

        <h1 className="title">Sign in to create and vote in polls!</h1>

        <div className="box">
          <form onSubmit={this.handleSubmit}>

            <label className="label">Username</label>
            <p className="control">
              <input className="input" ref="usernameField" type="text" value="username1"/>
            </p>

            <label className="label">Password</label>
            <p className="control">
              <input className="input" ref="passwordField" type="password" value="password"/>
            </p>

            <p class="control">
              <button className="button is-primary" ref="submitButton">Submit</button>
            </p>

          </form>
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
