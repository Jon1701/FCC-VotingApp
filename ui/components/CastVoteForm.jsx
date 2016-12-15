////////////////////////////////////////////////////////////////////////////////
// React
////////////////////////////////////////////////////////////////////////////////
import React from 'react';

// Components
import AlertBox from 'components/AlertBox';

////////////////////////////////////////////////////////////////////////////////
// React Router
////////////////////////////////////////////////////////////////////////////////
import { Link } from 'react-router';

////////////////////////////////////////////////////////////////////////////////
// Redux
////////////////////////////////////////////////////////////////////////////////
import { connect } from 'react-redux';

////////////////////////////////////////////////////////////////////////////////
// Other modules
////////////////////////////////////////////////////////////////////////////////

// External libraries.
import classNames from 'classnames';
import axios from 'axios';  // AJAX Request library.
const CONFIG_AXIOS = require('config/axios.json');  // Axios configuration file.

////////////////////////////////////////////////////////////////////////////////
// Component definition
////////////////////////////////////////////////////////////////////////////////
class CastVoteForm extends React.Component {

  // Component constructor.
  constructor(props) {
    super(props)

    // Component state.
    this.state = {
      selectedChoice: null, // Currently selected choice.
    }

    // Bind methods to component instance.
    this.handleSelectedChoice = this.handleSelectedChoice.bind(this);
    this.updateAlertBox = this.updateAlertBox.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  // Method to store the currently selected poll choice in state.
  handleSelectedChoice(e) {
    this.setState({
      selectedChoice: e.target.getAttribute('value')
    })
  }

  // Function to update Alert Box.
  updateAlertBox(alertBoxMessage, alertBoxType) {
    this.setState({
      alertBoxMessage: alertBoxMessage,
      alertBoxType: alertBoxType
    })
  }

  // Function to handle form submit (cast vote).
  handleFormSubmit(e) {

    // Prevent default form submit action.
    e.preventDefault();

    // Hide standard alertbox.
    this.updateAlertBox(null, null);

    // Create axios instance.
    // Send JSON Web Token in the header.
    const request = axios.create({
      headers: {
        'x-access-token': this.props.token
      }
    });

    // Send Poll ID and choice with the request.
    const data = {
      choice: this.state.selectedChoice,
      poll_id: this.props.poll_id
    }

    // Send a GET request to the server to get poll information.
    request.post('/api/auth/cast_vote', data, CONFIG_AXIOS)
    .then((res) => {

      // Set alert box to type SUCCESS.
      // A custom alert box with success message will be displayed.
      this.setState({
        alertBoxType: 'SUCCESS'
      })

    }).catch((err) => {

      // Display error message.
      this.updateAlertBox(err.response.data.message, 'DANGER');

    });

  }

  // Component render.
  render() {

    // Build HTML containing poll choices.
    const choices = this.props.pollData.choices.map((choice, idx, arr) => {

      // Classes to control style and visibility of currently clicked choice.
      let myClasses = classNames({
        'button width-50': true,
        'is-primary': choice == this.state.selectedChoice
      })

      // Return a styled <div> for each choice.
      return (
        <div key={'choice_'+idx} className="width-100">
          <a className={myClasses} value={choice} onClick={this.handleSelectedChoice}>{choice}</a>
        </div>
      )
    });

    // Component render.
    return (
      <div>

        <AlertBox message={this.state.alertBoxMessage} boxType={this.state.alertBoxType}/>
        <VoteCastSuccess pollId={this.props.poll_id} boxType={this.state.alertBoxType}/>

        <h1 className='title'>{this.props.pollData.title}</h1>

        <form>
          <div>
            {choices}
          </div>

          <br/>

          <div className="width-100 text-center">
            <a className="width-50 button is-primary" ref="submitButton" onClick={this.handleFormSubmit}>Cast Vote</a>
          </div>
        </form>

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
export default connect(mapStateToProps, null)(CastVoteForm);



// Custom success message alertbox.
class VoteCastSuccess extends React.Component {

  // Component constructor.
  constructor(props) {
    super(props);
  }

  // Component render.
  render() {

    // Classes to toggle visibility of this component.
    const toggleHiddenClass = classNames({
      'hidden': this.props.boxType != 'SUCCESS' || this.props.boxType == null
    });

    return (
      <div className={toggleHiddenClass}>
        <article className="message is-success">
          <div className="message-body">
            <div>
              Vote successfully cast.
            </div>

            <div>
              <Link to={'/view/poll/' + this.props.pollId}>Click here to view poll results.</Link>
            </div>
          </div>
        </article>
      </div>
    )
  }
}
