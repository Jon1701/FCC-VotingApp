////////////////////////////////////////////////////////////////////////////////
// React
////////////////////////////////////////////////////////////////////////////////
import React from 'react';

// Components
import Notification from 'components/Notification'; // Notifications.

import { Link } from 'react-router';

////////////////////////////////////////////////////////////////////////////////
// Other modules
////////////////////////////////////////////////////////////////////////////////

// External libraries.
const request = require('config/request');  // Make HTTP GET/POST requests
const serialize = require('form-serialize'); // Form serialization library.

////////////////////////////////////////////////////////////////////////////////
// Component definition
////////////////////////////////////////////////////////////////////////////////
export default class CreatePollWidget extends React.Component {

  // Constructor.
  constructor(props) {
    super(props);

    // Local state.
    this.state = {
      numPollChoices: 2,  // Number of poll choices. Default 2.
      poll: null,         // Poll data. Of the form:
                          //  {
                          //    pollID: "...",
                          //    creationDate: "...",
                          //    username: "...",
                          //    viewLink: "..."
                          //  }
    }

    // Bind methods to component instance.
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleAddPollOption = this.handleAddPollOption.bind(this);
    this.handleRemovePollOption = this.handleRemovePollOption.bind(this);
    this.setNotification = this.setNotification.bind(this);     // Set notification.
    this.clearNotification = this.clearNotification.bind(this); // Clear notification.
    this.handleFormReset = this.handleFormReset.bind(this);     // Reset form.
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

  // Handle form submission.
  handleFormSubmit(e) {

    // Prevent default form submit action.
    e.preventDefault();

    // Request body.
    // Serialize the form data.
    const body = serialize(document.querySelector('#formCreatePoll'), {hash:true});

    request.post('/api/auth/create_poll', body, sessionStorage.getItem('token'))
      .then((res) => {

        // Display success message.
        this.setNotification('SUCCESS', res.data.message);

        // Store poll data in state.
        this.setState({
          poll: res.data.payload,
          viewLink: '/view/poll/' + String(res.data.payload.pollID)
        });

        // Reset form.
        this.handleFormReset();

      })
      .catch((err) => {

        // Clear existing notifications.
        this.clearNotification();

        // Set error message.
        this.setNotification('DANGER', err.response.data.message);

      })

  }

  // Method to clear the form.
  handleFormReset(e) {

    if (e) {e.preventDefault();}

    // Clear poll title.
    this.refs.inputTitle.value = '';

    // Clear poll choices.
    for(let i=0; i<this.state.numPollChoices; i++) {
      this.refs['inputChoice' + String(i)].value = '';
    }

  }

  // Function to add new <PollOption/> component.
  handleAddPollOption(e) {

    // Check to see if we have reached the maximum number of poll choices.
    if (this.state.numPollChoices == 10) {

      // Notify the user that at most 10 poll choices are allowed.
      this.setNotification('WARNING', 'At most 10 poll choices are allowed.');

    } else {

      // Store updated poll choices array into state.
      this.setState({
        numPollChoices: this.state.numPollChoices + 1
      });

    }

  }

  // Function to remove poll choices.
  handleRemovePollOption(e) {

    // Check to see if we have the minimum number of poll choices.
    if (this.state.numPollChoices == 2) {

      // Notify the user that at least 2 poll choices are needed.
      this.setNotification('WARNING', 'At least 2 poll choices are needed.');

    } else {

      // Update state.
      this.setState({
        numPollChoices: this.state.numPollChoices - 1
      })

    }

  }

  // Render.
  render() {

    // Function to dynamically generate input text fields based on the number
    // of poll choices wanted.
    const generatePollChoiceInputs = () => {

      // Create a sequence of integers from 0 to this.state.numPollChoices.
      const sequence = Array.from(Array(this.state.numPollChoices).keys());

      // For each integer in that sequence, create an input text field.
      return sequence.map((val, idx, arr) => {
        return (
          <p className="control" key={'pollChoice-' + idx}>
            <input className="input" type="text" name="choices[]" ref={"inputChoice" + idx} placeholder="Poll Choice"/>
          </p>
        )
      });

    }

    return (
      <form id="formCreatePoll">

        {/* Display a notification on warning/error. */}
        {this.state.notification && (this.state.notification.type == 'DANGER' || this.state.notification.type == 'WARNING') ? <Notification notification={this.state.notification} handleClose={this.clearNotification}/> : <span/>}

        {/* Display a notification on success. */}
        {this.state.notification && this.state.notification.type == 'SUCCESS' ? <Notification notification={this.state.notification} link={<Link to={this.state.viewLink}>Click Here to View Poll</Link>} handleClose={this.clearNotification}/> : <span/>}

        <label className="label">Enter your question:</label>
        <p className="control">
          <input className="input" name="title" ref="inputTitle" type="text"/>
        </p>

        <label className="label">Poll Choices:</label>

        <p className="control width-100 has-addons">
          <a className="button width-50" onClick={this.handleAddPollOption}>Add</a>
          <a className="button width-50" onClick={this.handleRemovePollOption}>Remove</a>
        </p>

        {/* Generate Poll Choice <input/> boxes */}
        {generatePollChoiceInputs()}

        <br/>

        <p className="control">
          <a className="button is-primary is-medium has-text-centered is-fullwidth"  onClick={this.handleFormSubmit}>Submit</a>
        </p>
      </form>
    )
  }

}
