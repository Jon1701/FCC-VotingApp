////////////////////////////////////////////////////////////////////////////////
// React
////////////////////////////////////////////////////////////////////////////////
import React from 'react';

// Components.
import AlertBox from 'components/AlertBox';

////////////////////////////////////////////////////////////////////////////////
// Redux
////////////////////////////////////////////////////////////////////////////////
import { connect } from 'react-redux';

////////////////////////////////////////////////////////////////////////////////
// Other modules
////////////////////////////////////////////////////////////////////////////////

// External libraries.
import axios from 'axios';  // AJAX Request library.
import classNames from 'classnames';
const CONFIG_AXIOS = require('config/axios.json');  // Axios configuration file.
const serialize = require('form-serialize'); // Form serialization library.

////////////////////////////////////////////////////////////////////////////////
// Component definition
////////////////////////////////////////////////////////////////////////////////
class CreatePoll extends React.Component {

  // Constructor.
  constructor(props) {
    super(props);

    // Local state.
    this.state = {
      alertBoxMessage: null,  // Alertbox message.
      alertBoxType: null,  // Alertbox type.

      pollID: null,  // Newly created poll id.
      pollCreated: null,  // Boolean to flag whether or not the poll has successfully created
      numPollOptions: 2 // Default number of poll options.
    }

    // Bind methods to component instance.
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddPollOption = this.handleAddPollOption.bind(this);
    this.handleRemovePollOption = this.handleRemovePollOption.bind(this);
    this.updateAlertBox = this.updateAlertBox.bind(this);
  }

  // Function to update Alert Box.
  updateAlertBox(alertBoxMessage, alertBoxType) {
    this.setState({
      alertBoxMessage: alertBoxMessage,
      alertBoxType: alertBoxType
    })
  }

  // Handle form submission.
  handleSubmit(e) {

    // Prevent default form submit action.
    e.preventDefault();

    // Create axios instance.
    // Send JSON Web Token in the header.
    const request = axios.create({
      headers: {
        'x-access-token': this.props.token
      }
    });

    // Serialize the form data.
    const formData = serialize(document.querySelector('#formCreatePoll'), {hash:true});

    // Send POST request to the API.
    request.post('/api/auth/create_poll', formData, CONFIG_AXIOS)
      .then((res) => {

      // Hide standard alertbox.
      this.updateAlertBox(null, null);

      // When request is successful, store newly created poll id into state.
      // Set pollCreated to true.
      this.setState({
        pollID: res.data.poll_id,
        pollCreated: true
      })

    }).catch((err) => {

      // Hide poll creation alertbox.
      this.setState({
        pollID: null,
        pollCreated: null
      })

      // Display error message.
      this.updateAlertBox(err.response.data.message, 'DANGER');

    });

  }

  // Function to add new <PollOption/> component.
  handleAddPollOption(e) {

    // Clear Alert Box.
    this.updateAlertBox(null, null);

    // Check to see if we have reached the maximum number of Poll options.
    if (this.state.numPollOptions == 10) {

      // We have reached the maximum number of poll options.
      // Display an error message.
      this.updateAlertBox('Maximum number of poll options reached.', 'WARNING');

    } else {

      // Store updated poll options array into state.
      this.setState({
        numPollOptions: this.state.numPollOptions + 1
      });

    }

  }

  // Function to remove poll options.
  handleRemovePollOption(e) {

    // Clear Alert Box.
    this.updateAlertBox(null, null);

    // Check to see if we have the minimum number of poll options.
    if (this.state.numPollOptions == 2) {

      // Return an error since we cannot have fewer than two poll options.
      this.updateAlertBox('At least two poll options are required.', 'WARNING');

    } else {

      // Update state.
      this.setState({
        numPollOptions: this.state.numPollOptions - 1
      })

    }

  }

  // Render.
  render() {

    // Function to dynamically generate input boxes to accept poll input choices.
    const generatePollChoiceInputs = () => {

      // Create an array of integers from 0 to this.state.numPollOptions.
      const sequence = Array.from(Array(this.state.numPollOptions).keys());

      // Using that array of integers, create an input box field for each integer.
      return sequence.map((val, idx, arr) => {
        return (
          <p className="control" key={'pollOption-' + idx}>
            <input className="input" type="text" name="choices[]" placeholder="Poll Option"/>
          </p>
        )
      });

    }

    return (
      <div className="text-center columns is-mobile">

        <div className="column is-8 is-offset-2">

          <h1 className="title">Create a new poll</h1>

          <div className="box">

            <AlertBox message={this.state.alertBoxMessage} boxType={this.state.alertBoxType}/>

            {/* If the poll is created, show SUCCESS alertbox, else return blank. */}
            {this.state.pollCreated ? <AlertBoxPollCreated pollID={this.state.pollID}/> : <span></span>}

            <form onSubmit={this.handleSubmit} id="formCreatePoll">

              <label className="label">Enter your question:</label>
              <p className="control">
                <input className="input" name="title" type="text"/>
              </p>

              <label className="label">Poll options:</label>

              <p className="control width-100 has-addons">
                <a className="button width-50" onClick={this.handleAddPollOption}>Add</a>
                <a className="button width-50" onClick={this.handleRemovePollOption}>Remove</a>
              </p>

              {/* Generate Poll Choice <input/> boxes */}
              {generatePollChoiceInputs()}

              <p className="control">
                <button className="button is-primary">Submit</button>
              </p>

            </form>

          </div>

        </div>

      </div>
    )
  }

}

// Maps state to props.
const mapStateToProps = (state) => {
  return {
    token: state.token
  }
}

// Allow component access to Redux store.
export default connect(mapStateToProps, null)(CreatePoll);

////////////////////////////////////////////////////////////////////////////////
// Presentational Components.
////////////////////////////////////////////////////////////////////////////////

// Custom Alertbox for when a poll is successfully created.
import { Link } from 'react-router';  // React Router Link tag.
const AlertBoxPollCreated = (props) => (
  <article className="message is-success">
    <div className="message-body">
      <div>
        Poll successfully created!
      </div>
      <div>
        <Link to={'/view/poll/' + props.pollID}>Click here to view your poll.</Link>
      </div>
    </div>
  </article>
)
