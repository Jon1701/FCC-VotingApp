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

            <img id="brand-homepage" src={require("images/brand.png")}/>

            <h5 className="subtitle is-5">A FreeCodeCamp project</h5>

            <p>
              Voteify is a web-based application which enables you to create custom polls with live results.
            </p>

          </div>

          <div className="box">

            <h5 className="subtitle is-5">Recently Created Polls</h5>

            <BatchViewPolls pageNum={1} perPage={10} order={'descending'}/>
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
