////////////////////////////////////////////////////////////////////////////////
// React
////////////////////////////////////////////////////////////////////////////////
import React from 'react';

// Components
import NavigationBar from 'components/NavigationBar'; // Navigation Bar.

////////////////////////////////////////////////////////////////////////////////
// Redux
////////////////////////////////////////////////////////////////////////////////
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions.
import { storeToken } from 'actions/index';

////////////////////////////////////////////////////////////////////////////////
// Component definition
////////////////////////////////////////////////////////////////////////////////
class App extends React.Component {

  // Constructor.
  constructor(props) {
    super(props);
  }

  // Component Lifecycle Method.
  //
  // Execute this block when component is about to perform initial render.
  componentWillMount() {

    // Read token from session storage, store in application state.
    this.props.storeToken(sessionStorage.getItem('token'));
    
  }

  // Render.
  render() {
    return (
      <div>

        <NavigationBar/>

        {/* Render child components. */}
        {this.props.children}

      </div>
    )
  }

}

// Allow access of dispatch actions as props.
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    storeToken: storeToken
  }, dispatch);
}

// Allow component access to Redux store.
export default connect(null, mapDispatchToProps)(App);
