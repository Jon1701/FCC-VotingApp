// React.
import React from 'react';

// External modules.
import classNames from 'classnames';

// Component definition.
export default class LoggedIn extends React.Component {

  // Component constructor.
  constructor(props) {
    super(props);
  }

  // Component render.
  render() {

    // Classes to toggle visibility of this component.
    const myClasses = classNames({
      'hidden': this.props.message == null
    });

    return (
      <div className={myClasses}>
        <article className="message is-danger">
          <div className="message-body">
            {this.props.message}
          </div>
        </article>
      </div>
    )
  }
}
