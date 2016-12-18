////////////////////////////////////////////////////////////////////////////////
// React
////////////////////////////////////////////////////////////////////////////////
import React from 'react';

////////////////////////////////////////////////////////////////////////////////
// React Router
////////////////////////////////////////////////////////////////////////////////
import { Link } from 'react-router';

////////////////////////////////////////////////////////////////////////////////
// Redux
////////////////////////////////////////////////////////////////////////////////
import { connect } from 'react-redux';

////////////////////////////////////////////////////////////////////////////////
// Component definition
////////////////////////////////////////////////////////////////////////////////
class NavigationBar extends React.Component {

  // Constructor.
  constructor(props) {
    super(props);

    // Bind methods to component instance.
    this.getUsername = this.getUsername.bind(this);
  }

  // Method to extract the username from a JSON Web Token.
  getUsername(token) {

    // Split token into three, to get the HEADER, PAYLOAD, SIGNATURE.
    const parts = token.split('.');

    // Get just the PAYLOAD, decode from base64, parse into JSON.
    // Decode from base64.
    // Parse into JSON.
    const PAYLOAD = JSON.parse(atob(parts[1]));

    // Return the username.
    return PAYLOAD['username'];
  }

  // Render.
  render() {
    return (
      <nav className="nav">
        <div className="nav-left">
          <Link to='/' className="nav-item is-brand">Voteify</Link>
        </div>

        {/* Different navigation buttons for authenticated and unauthenticated users. */}
        {this.props.token ? <LoggedIn username={this.getUsername(this.props.token)}/> : <NotLoggedIn/>}
      </nav>
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
export default connect(mapStateToProps, null)(NavigationBar);

////////////////////////////////////////////////////////////////////////////////
// Presentational Components
////////////////////////////////////////////////////////////////////////////////

// Navigation Bar buttons for unauthenticated users.
const NotLoggedIn = (props) => (
  <div className="nav-center">
    <Link to="/signup" className="nav-item">Sign up</Link>
    <Link to="/login" className="nav-item">Log In</Link>
  </div>
)

// Navigation Bar buttons for authenticated users.
const LoggedIn = (props) => (
  <div className="nav-center">
    <Link to="/create_poll" className="nav-item">Create Poll</Link>
    <Link to="/auth/dashboard" className="nav-item">{props.username}</Link>
  </div>
)
