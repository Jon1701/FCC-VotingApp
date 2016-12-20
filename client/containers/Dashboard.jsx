////////////////////////////////////////////////////////////////////////////////
// React
////////////////////////////////////////////////////////////////////////////////
import React from 'react';

// Components.
import BatchViewPolls from 'components/BatchViewPolls';

////////////////////////////////////////////////////////////////////////////////
// Redux
////////////////////////////////////////////////////////////////////////////////
import { connect } from 'react-redux';

////////////////////////////////////////////////////////////////////////////////
// Component definition
////////////////////////////////////////////////////////////////////////////////
class Dashboard extends React.Component {

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
      <div className="columns has-text-centered">
        <div className="column is-10 is-offset-1">

          <div className="box">

            <h1 className="title">Welcome to your Voteify Dashboard!</h1>

          </div>

          <div className="box">

            <h5 className="subtitle is-5">My Recently Created Polls</h5>

            <BatchViewPolls pageNum={1} perPage={10} order={'descending'} username={this.getUsername(this.props.token)}/>
          </div>

        </div>
      </div>
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
export default connect(mapStateToProps, null)(Dashboard);
