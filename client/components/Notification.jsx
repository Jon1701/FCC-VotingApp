////////////////////////////////////////////////////////////////////////////////
// React
////////////////////////////////////////////////////////////////////////////////
import React from 'react';

////////////////////////////////////////////////////////////////////////////////
// Other
////////////////////////////////////////////////////////////////////////////////
import classNames from 'classnames';

////////////////////////////////////////////////////////////////////////////////
// Component definition
////////////////////////////////////////////////////////////////////////////////
export default class Notification extends React.Component {
  render() {

    // Classes to control style of <Notification/>.
    const myStyles = classNames({
      'message': true,
      'has-text-centered': true,
      'is-danger': this.props.notification.type == 'DANGER',
      'is-success': this.props.notification.type == 'SUCCESS',
      'is-info': this.props.notification.type == 'INFO',
      'is-warning': this.props.notification.type == 'WARNING',
    });

    return (
      <article className={myStyles} onClick={this.props.handleClose}>
        <div className="message-body">
          {this.props.notification.message}
          <br/>
          {this.props.link}
        </div>
      </article>
    )

  }
}

// Typecheck this.props.
Notification.propTypes = {
  notification: React.PropTypes.object, // this.props.notification must be an Object.
  handleClose: React.PropTypes.func     // this.props.handleClose must be a Function.
}
