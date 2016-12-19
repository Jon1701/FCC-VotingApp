////////////////////////////////////////////////////////////////////////////////
// React
////////////////////////////////////////////////////////////////////////////////
import React from 'react';

// Components.
import ViewPollWidget from 'components/ViewPollWidget';
import CastVoteWidget from 'components/CastVoteWidget';

////////////////////////////////////////////////////////////////////////////////
// Component definition
////////////////////////////////////////////////////////////////////////////////
export default class ViewPollPage extends React.Component {

  // Constructor.
  constructor(props) {
    super(props);
  }

  // Render.
  render() {

    return (
      <div className="columns">
        <div className="column is-10 is-offset-1">

          <div className="box">
            <ViewPollWidget pollID={this.props.params.pollID}/>
          </div>

          <div className="box">
            <CastVoteWidget pollID={this.props.params.pollID}/>
          </div>

        </div>
      </div>
    )
  }

}
