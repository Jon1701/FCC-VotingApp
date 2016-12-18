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
// Component definition.
////////////////////////////////////////////////////////////////////////////////
class NavBar extends React.Component {

  // Component constructor.
  constructor(props) {
    super(props);

    // Bind methods to component instance.
    this.getUsername = this.getUsername.bind(this);
  }

  // Method to extract username from the JSON Web Token.
  getUsername(token) {
    return JSON.parse(atob(token.split('.')[1])).username;
  }

  // Component render.
  render() {
    return (
      <nav className="nav">

        <div className="nav-left">
          <Link to='/' className="nav-item is-brand">Voteify</Link>
        </div>

        {this.props.token ? <Authenticated username={this.getUsername(this.props.token)}/>  : <NotAuthenticated/>}

      </nav>
    )
  }
}

// Map global state to props.
const mapStateToProps = (state) => {
  return {
    token: state.token
  }
}

// Export <NavBar/> but allow connection to Redux store.
export default connect(mapStateToProps, null)(NavBar);

////////////////////////////////////////////////////////////////////////////////
// Presentational Components.
////////////////////////////////////////////////////////////////////////////////

// Navigation buttons for non-authenticated users.
const NotAuthenticated = (props) => (
  <div className="nav-right">
    <Link to="/login" className="nav-item">Login</Link>
    <Link to="/signup" className="nav-item">Signup</Link>
  </div>
)

// Navigation buttons for authenticated users.
const Authenticated = (props) => (
  <div className="nav-center">
    <Link to='/auth/create_poll' className="nav-item">Create Poll</Link>
    <Link to='/auth' className="nav-item">Dashboard</Link>
    <Link to='/auth' className="nav-item">{props.username}</Link>
  </div>
)
