// React.
import React from 'react';

// Component definition.
export default class NavBar extends React.Component {

  // Component constructor.
  constructor(props) {
    super(props);
  }

  // Component render.
  render() {
    return (
      <div>

        <nav className="nav">
          <div className="nav-left">
            <a className="nav-item is-brand" href="#">
              FCC Voting App
            </a>
          </div>

          <div className="nav-center">
            <a className="nav-item" href="#">
              Login
            </a>
          </div>

        </nav>

      </div>
    )
  }
}
