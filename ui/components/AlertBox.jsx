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

    // Classes to toggle visibility of this component.
    const toggleHiddenClass = classNames({
      'hidden': this.props.message == null
    });

    // Classes to toggle danger/success/warning
    const boxType = classNames({
      'message': true,
      'is-info': true,
      'is-danger': this.props.boxType == 'DANGER',
      'is-success': this.props.boxType == 'SUCCESS',
      'is-warning': this.props.boxType == 'WARNING',
    });

    return (
      <div className={toggleHiddenClass}>
        <article className={boxType}>
          <div className="message-body">
            {this.props.message}
          </div>
        </article>
      </div>
    )
  }
}
