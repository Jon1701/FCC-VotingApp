////////////////////////////////////////////////////////////////////////////////
// React
////////////////////////////////////////////////////////////////////////////////
import React from 'react';

// Components.
import AlertBox from 'components/AlertBox';
import DisplayPollResults from 'components/DisplayPollResults';

import { Link } from 'react-router';

////////////////////////////////////////////////////////////////////////////////
// Redux
////////////////////////////////////////////////////////////////////////////////
import { connect } from 'react-redux';

////////////////////////////////////////////////////////////////////////////////
// Component definition
////////////////////////////////////////////////////////////////////////////////
class ViewPoll extends React.Component {

  // Component constructor.
  constructor(props) {
    super(props);
  }

  // Component render.
  render() {
    return (
      <div>
        <DisplayPollResults poll_id={this.props.params.poll_id}/>
        <VoteLink poll_id={this.props.params.poll_id}/>
      </div>
    )
  }

}

const VoteLink = (props) => (
  <div className="has-text-centered columns is-mobile">
    <div className="column is-8 is-offset-2">
      <div className="box">
        <Link to={'/auth/vote/poll/' + props.poll_id}>Click here to vote on this poll.</Link>
      </div>
    </div>
  </div>
)

// Maps state to props.
const mapStateToProps = (state) => {
  return {
    token: state.token
  }
}

// Allow component access to Redux store.
export default connect(mapStateToProps, null)(ViewPoll);
