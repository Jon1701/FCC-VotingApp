////////////////////////////////////////////////////////////////////////////////
// React
////////////////////////////////////////////////////////////////////////////////
import React from 'react';

// Components.
import DisplayChart from 'components/DisplayChart';
import Notification from 'components/Notification';

////////////////////////////////////////////////////////////////////////////////
// Other
////////////////////////////////////////////////////////////////////////////////
const request = require('config/request');  // Make HTTP GET/POST requests

////////////////////////////////////////////////////////////////////////////////
// Component definition
////////////////////////////////////////////////////////////////////////////////
export default class ViewPollWidget extends React.Component {

  // Constructor.
  constructor(props) {
    super(props);

    // Local state.
    this.state = {
      poll: null,  // Poll data,
      notification: {type: 'INFO', message: 'Loading'},  // Notification data
    }

    // Bind methods to component instance.
    this.getPollData = this.getPollData.bind(this);
    this.setNotification = this.setNotification.bind(this);     // Set notification.
    this.clearNotification = this.clearNotification.bind(this); // Clear notification.
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

  // Component Lifecycle Method.
  //
  // Execute this block once component is done loading.
  componentDidMount() {

    // Get poll data and store in local state.
    this.getPollData(this.props.pollID);

  }

  // Render.
  render() {

    // Render different views if poll data was successfully retrieved.
    if (this.state.poll) {

      // Deconstruct object properties into individual variables.
      const {title, tally, author, numVotes, choices} = this.state.poll;

      // Different views depending if the poll has been voted on or not.
      if (numVotes == 0) {

        // Render buttons to display poll choices.
        const renderChoices = choices.map((choice, idx, arr) => (
            <div className='button' key={'choice_' + idx}>{choice}</div>
          )
        );

        // No votes, display a message saying so, and show poll title and choice.
        return (
          <div className="has-text-centered">
            <h1 className="title">It looks like this poll hasn't been voted on yet.</h1>
            <br/>
            <h4 className="title is-4">{title}</h4>
            {renderChoices}
          </div>
        )

      } else {

        // Poll has been voted on, display chart.
        return (
          <div className="has-text-centered">
            <h1 className="title">{title}</h1>
            <h5 className="title is-5">by: {author}</h5>
            <DisplayChart data={tally}/>
          </div>
        )

      }

    } else {

      // Render notification.
      // By default it is a loading notification.
      // On error, display error message.
      return (
        <div>
          <Notification notification={this.state.notification}/>
        </div>
      )

    }

  }// end render()

}// end definition
