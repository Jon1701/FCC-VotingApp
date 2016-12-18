////////////////////////////////////////////////////////////////////////////////
// React
////////////////////////////////////////////////////////////////////////////////
import React from 'react';

// Components.
import CreatePollWidget from 'components/CreatePollWidget';

////////////////////////////////////////////////////////////////////////////////
// Component definition
////////////////////////////////////////////////////////////////////////////////
export default class CreatePollPage extends React.Component {

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

            <h1 className="title has-text-centered">Create a new poll</h1>

            <CreatePollWidget/>

          </div>
        </div>
      </div>
    )
  }

}
