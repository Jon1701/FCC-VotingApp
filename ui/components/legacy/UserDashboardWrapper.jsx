////////////////////////////////////////////////////////////////////////////////
// React
////////////////////////////////////////////////////////////////////////////////
import React from 'react';

// Components
import RecentPolls from 'components/RecentPolls';
import LoginNotify from 'components/LoginNotify';

////////////////////////////////////////////////////////////////////////////////
// Redux
////////////////////////////////////////////////////////////////////////////////
import { connect } from 'react-redux';

class UserDashboardWrapper extends React.Component {

    // Constructor.
    constructor(props) {
      super(props);
    }

    // Render.
    render() {

      // Check if token has been provided.
      // If token has been provided, show dashboard,
      // if not, show login form.
      if (this.props.token) {

        // Get username.
        const username = JSON.parse(atob(this.props.token.split('.')[1])).username;

        return (
          <div className="has-text-centered columns is-mobile">
            <div className="column is-8 is-offset-2">
              <div className="box">

                <h1 className="title">Dashboard</h1>

                <div>
                  <RecentPolls username={username}/>
                </div>

              </div>
            </div>
          </div>
        )

      } else {

        return (
          <div className="has-text-centered columns is-mobile">
            <div className="column is-8 is-offset-2">
              <LoginNotify/>
            </div>
          </div>
        )

      }


    }

}

// Maps state to props.
const mapStateToProps = (state) => {
  return {
    token: state.token
  }
}

// Allow component access to Redux store.
export default connect(mapStateToProps, null)(UserDashboardWrapper);
