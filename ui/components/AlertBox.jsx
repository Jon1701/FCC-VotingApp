// React.
import React from 'react';

// External modules.
import classNames from 'classnames';

// Component definition.
export default class AlertBox extends React.Component {

  // Component constructor.
  constructor(props) {
    super(props);
  }

  // Component render.
  render() {

    // Classes to toggle danger/success/warning
    const myClasses = classNames({
      'hidden': this.props.message == null,
      'message': true,
      'is-info': true,
      'is-danger': this.props.boxType == 'DANGER',
      'is-success': this.props.boxType == 'SUCCESS',
      'is-warning': this.props.boxType == 'WARNING',
    });

    return (
      <article className={myClasses}>
        <div className="message-body">
          {this.props.message}
        </div>
      </article>
    )
  }
}
