// React
import React from 'react';

// Components.
import NavBar from 'components/NavBar';

// Component definition.
export default class UserInterface extends React.Component {

  // Component constructor.
  constructor(props) {
    super(props);
  }

  // Component render.
  render() {
    return (
      <div>
        User Interface

        <NavBar/>
      </div>
    )
  }
}
