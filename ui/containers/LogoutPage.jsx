////////////////////////////////////////////////////////////////////////////////
// React
////////////////////////////////////////////////////////////////////////////////
import React from 'react';

////////////////////////////////////////////////////////////////////////////////
// Redux
////////////////////////////////////////////////////////////////////////////////
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions.
import { removeToken } from 'actions/index';

////////////////////////////////////////////////////////////////////////////////
// Component definition
////////////////////////////////////////////////////////////////////////////////
class LogoutPage extends React.Component {

  // Constructor.
  constructor(props) {
    super(props);
  }

  // Lifecycle method.
  // Execute this block when component is done loading.
  componentDidMount() {

    // Remove the token from application state.
    this.props.removeToken();

  }

  // Render.
  render() {
    return (
      <div className="columns">
        <div className="column is-10 is-offset-1">
          <div className="box has-text-centered">

            You are now logged out!

          </div>
        </div>
      </div>
    )
  }

}

// Allow access of dispatch actions as props.
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    removeToken: removeToken
  }, dispatch);
}

// Allow component access to Redux store.
export default connect(null, mapDispatchToProps)(LogoutPage);
