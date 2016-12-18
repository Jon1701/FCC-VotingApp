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
      'notification': true,
      'has-text-centered': true,
      'is-danger': this.props.notification.type == 'DANGER',
      'is-success': this.props.notification.type == 'SUCCESS',
      'is-info': this.props.notification.type == 'INFO',
      'is-warning': this.props.notification.type == 'WARNING',
    });

    return (
      <div className={myStyles}>
        <button className="delete" onClick={this.props.handleClose}/>

        {this.props.notification.message}

        <p>{this.props.link}</p>
      </div>
    )

  }
}

// Typecheck this.props.
Notification.propTypes = {
  notification: React.PropTypes.object, // this.props.notification must be an Object.
  handleClose: React.PropTypes.func     // this.props.handleClose must be a Function.
}
