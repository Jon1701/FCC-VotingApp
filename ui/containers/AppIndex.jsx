////////////////////////////////////////////////////////////////////////////////
// React
////////////////////////////////////////////////////////////////////////////////
import React from 'react';

////////////////////////////////////////////////////////////////////////////////
// Component definition
////////////////////////////////////////////////////////////////////////////////
export default class AppIndex extends React.Component {

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
