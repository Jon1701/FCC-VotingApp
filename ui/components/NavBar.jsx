// React.
import React from 'react';

// Redux dependencies.
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class LoggedIn extends React.Component {

  constructor(props) {
    super(props);
  }

  getUsername(token) {
    return JSON.parse(atob(token.split('.')[1])).username;
  }

  render() {
    return (
      <div>
        <div className="nav-center">
          <a className="nav-item" href="#">
            {this.getUsername(this.props.token)}
          </a>
        </div>
      </div>
    )
  }
}

class NotLoggedIn extends React.Component {
  render() {
    return (
      <div>
        <div className="nav-center">
          <a className="nav-item" href="#">
            Sign-up
          </a>

          <a className="nav-item" href="#">
            Login
          </a>
        </div>
      </div>
    )
  }
}

// Component definition.
class NavBar extends React.Component {

  // Component constructor.
  constructor(props) {
    super(props);
  }

  // Component render.
  render() {
    return (
      <div>

        <nav className="nav has-shadow">
          <div className="nav-left">
            <a className="nav-item is-brand" href="#">
              FCC Voting App
            </a>
          </div>

          {this.props.token ? <LoggedIn token={this.props.token}/> : <NotLoggedIn/>}

        </nav>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token
  }
}

export default connect(mapStateToProps, null)(NavBar);
