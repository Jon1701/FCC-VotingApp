////////////////////////////////////////////////////////////////////////////////
// React
////////////////////////////////////////////////////////////////////////////////
import React from 'react';

import { Link } from 'react-router';

////////////////////////////////////////////////////////////////////////////////
// Component definition
////////////////////////////////////////////////////////////////////////////////
export default class Dashboard extends React.Component {

  // Constructor.
  constructor(props) {
    super(props);
  }

  // Render.
  render() {

    return (
      <div className="has-text-centered columns is-mobile">
        <div className="column is-8 is-offset-2">
          <div className="box">
            Dashboard

            <Link to="/auth/create_poll">Create Poll</Link>
          </div>
        </div>
      </div>
    )
  }

}
