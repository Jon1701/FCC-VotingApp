////////////////////////////////////////////////////////////////////////////////
// React
////////////////////////////////////////////////////////////////////////////////
import React from 'react';

// Components.
import LoginWidget from 'components/LoginWidget';
import Notification from 'components/Notification';

////////////////////////////////////////////////////////////////////////////////
// Redux
////////////////////////////////////////////////////////////////////////////////
import { connect } from 'react-redux';

////////////////////////////////////////////////////////////////////////////////
// React Router
////////////////////////////////////////////////////////////////////////////////
import { Link } from 'react-router';

////////////////////////////////////////////////////////////////////////////////
// Other
////////////////////////////////////////////////////////////////////////////////
const request = require('config/request');  // Make HTTP GET/POST requests

import classNames from 'classnames';

////////////////////////////////////////////////////////////////////////////////
// Component definition.
////////////////////////////////////////////////////////////////////////////////
class CastVoteWidget extends React.Component {

  // Component constructor.
  constructor(props) {
    super(props);

    // Local state.
    this.state = {
      poll: null,  // Poll data,
      notification: null,  // Notification data //{type: 'INFO', message: 'Loading'}
      selectedPollChoice: null  // Currently selected poll choice.
    }

    // Bind methods to component instance.
    this.getPollData = this.getPollData.bind(this);
    this.setNotification = this.setNotification.bind(this);     // Set notification.
    this.clearNotification = this.clearNotification.bind(this); // Clear notification.
    this.toggleCurrentPollChoice = this.toggleCurrentPollChoice.bind(this); // Set currently selected poll choice.
    this.handleFormSubmit = this.handleFormSubmit.bind(this);  // Cast vote to server.
  }

  // Method to set the Notification panel.
  setNotification(type, message) {
    this.setState({
      notification: {type, message}
    });
  }

  // Method to clear the Notification panel.
  clearNotification() {
    this.setState({notification: null});
  }

  // Method to store the currently selected poll choice in local state.
  toggleCurrentPollChoice(e) {

    // Toggle the currently selected poll choice.
    if (e.target.getAttribute('value') == this.state.selectedPollChoice) {

      // If the user clicked on the same choice, remove the currently selected
      // choice from the state.
      this.setState({
        selectedPollChoice: null
      })

    } else {

      // If the user chose a different one, store it in the state.
      this.setState({
        selectedPollChoice: e.target.getAttribute('value')
      });

    }

  }

  // Method to cast vote.
  handleFormSubmit(e) {

    // Prevent default action.
    e.preventDefault();

    // Request body to be sent to server.
    const body = {
      poll_id: this.props.pollID,
      choice: this.state.selectedPollChoice
    }

    request.post('/api/auth/cast_vote', body, this.props.token)
      .then((res) => {

        // Display message.
        this.setNotification('SUCCESS', res.data.message);

        // Reload window after 2 seconds.
        setTimeout(window.location.reload.bind(window.location), 2000);

      })
      .catch((err) => {

        // Display error message.
        this.setNotification('DANGER', err.response.data.message);

      });
  }

  // Method to get poll data and results.
  getPollData(pollID) {

    request.get('/api/view/poll/' + pollID)
      .then((res) => {

        // Store poll data in local state.
        this.setState({
          poll: res.data.payload
        });

      })
      .catch((err) => {

        // Display Error message.
        this.setNotification('DANGER', err.response.data.message);

      });

  }

  // Component Lifecycle method
  //
  // Execute this block once component is rendered.
  componentDidMount() {

    // Get poll data from the server, and save it to local state.
    this.getPollData(this.props.pollID);

  }

  // Component render.
  render() {

    // Display different views depending if the user is logged in or not,
    // and if the provided poll ID is valid.
    //
    // Check if logged in.
    if (this.props.token) {

      // Check if valid poll entered.
      if (this.state.poll) {

        //
        // Logged in, valid poll
        //

        // Deconstruct poll data.
        const { author, choices, numChoices, numVotes, pollID, tally, title } = this.state.poll;

        // Renders a list of poll choices the user is able to select.
        const renderChoices = choices.map((choice, idx, arr) => {
          return (
            <a className="panel-block is-fullwidth" key={"choice_" + idx} value={choice} onClick={this.toggleCurrentPollChoice}>{choice}</a>
          )
        });

        // User is logged in, allow them to vote on the poll.
        return (
          <div className="has-text-centered">

            {/* Notification alert box */}
            {this.state.notification ? <Notification notification={this.state.notification} handleClose={this.clearNotification}/> : <span/>}

            <h5 className="title is-5">Cast your vote here!</h5>

            {/* Display poll choices */}
            <nav className="panel">
              {renderChoices}
            </nav>

            <div className={this.state.selectedPollChoice == null ? 'is-hidden' : ''}>
              <a className="button is-fullwidth is-primary" onClick={this.handleFormSubmit}>Click here to submit your vote for: {this.state.selectedPollChoice}</a>
            </div>
          </div>
        )

      } else {

        //
        // Logged in, invalid poll
        //
        return (
          <InvalidPollID/>
        )
      }

    } else {

      // Check for poll.
      if (this.state.poll) {

        //
        // Not logged in, valid poll
        //

        // Display message to the user to log in or sign up.
        return (
          <NotLoggedIn/>
        )
        
      } else {

        //
        // Not logged in, invalid poll
        //

        // Display message to the user that the poll is invalid.
        return (
          <InvalidPollID/>
        )

      }

    }// end if.

  }// end render.

}

// Maps state to props.
const mapStateToProps = (state) => {
  return {
    token: state.token
  }
}

// Allow component access to Redux store.
export default connect(mapStateToProps, null)(CastVoteWidget);

////////////////////////////////////////////////////////////////////////////////
// Presentational components
////////////////////////////////////////////////////////////////////////////////

// Not logged in.
const NotLoggedIn = () => (
  <div className="has-text-centered">
    <h1 className="title">You must be logged in to vote!</h1>
    Click <Link to='/login'>here</Link> to log in, or <Link to='/signup'>sign up</Link>!
  </div>
)

// Invalid poll.
const InvalidPollID = () => (
  <div className="has-text-centered">
    Unable to vote on an invalid poll
  </div>
)
