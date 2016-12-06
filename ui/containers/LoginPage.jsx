// React.
import React from 'react';

// External libraries.
import axios from 'axios';  // AJAX Request library.

// Redux dependencies.
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions.
import { setJwt } from 'actions/index';

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

    // Get username and password from input fields.
    let username = this.refs.usernameField.value;
    let password = this.refs.passwordField.value;

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
      this.props.setJwt(res.data.token);

    }).catch((err) => {
      console.log(err)
    })

  }

  // Render.
  render() {
    return (
      <div>
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
    )
  }
}

// Maps state to props.
const mapStateToProps = (state) => {
  return {
    jwt: state.jwt
  }
}

// Allow access of dispatch actions as props.
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setJwt: setJwt
  }, dispatch);
}

// Allow component access to Redux store.
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
