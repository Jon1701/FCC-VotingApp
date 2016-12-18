////////////////////////////////////////////////////////////////////////////////
// React
////////////////////////////////////////////////////////////////////////////////
import React from 'react';

////////////////////////////////////////////////////////////////////////////////
// Redux
////////////////////////////////////////////////////////////////////////////////
import { connect } from 'react-redux';

////////////////////////////////////////////////////////////////////////////////
// Component definition
////////////////////////////////////////////////////////////////////////////////
class HomePage extends React.Component {

  // Constructor.
  constructor(props) {
    super(props);
  }

  // Render.
  render() {

    return (
      <div className="columns has-text-centered">
        <div className="column is-10 is-offset-1">
          <div className="box">

            <h1 className="title is-1">Voteify</h1>

            <h5 className="subtitle is-5">A FreeCodeCamp project</h5>

            <p>
              Voteify is a web-based application which enables you to create custom polls with live results.
            </p>

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
export default connect(mapStateToProps, null)(HomePage);
