// React.
import React from 'react';

// External modules.
import classNames from 'classnames';

// React Router.
import { Link } from 'react-router';

// Component definition.
export default class NewPollCreated extends React.Component {

  // Component constructor.
  constructor(props) {
    super(props);
  }

  // Component render.
  render() {

    // Classes to toggle visibility of this component.
    const toggleHiddenClass = classNames({
      'hidden': this.props.pollId == null
    });

    return (
      <div className={toggleHiddenClass}>
        <article className="message is-success">
          <div className="message-body">
            <div>
              Poll successfully created!
            </div>

            <div>
              <Link to={'/view/poll/' + this.props.pollId}>Click here to view your poll.</Link>
            </div>
          </div>
        </article>
      </div>
    )
  }
}
