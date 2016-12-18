////////////////////////////////////////////////////////////////////////////////
// React
////////////////////////////////////////////////////////////////////////////////
import React from 'react';

// Components.
import SignupWidget from 'components/SignupWidget';

////////////////////////////////////////////////////////////////////////////////
// Component definition
////////////////////////////////////////////////////////////////////////////////
export default class SignupPage extends React.Component {

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

            <h1 className="title has-text-centered">Sign up to create and vote on polls!</h1>

            <div className="has-text-centered">
              <SignupWidget/>
            </div>

          </div>
        </div>
      </div>
    )
  }

}
