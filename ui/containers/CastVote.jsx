////////////////////////////////////////////////////////////////////////////////
// React
////////////////////////////////////////////////////////////////////////////////
import React from 'react';

// Components.
import AlertBox from 'components/AlertBox';
import CastVoteForm from 'components/CastVoteForm';
import LoginNotify from 'components/LoginNotify';

////////////////////////////////////////////////////////////////////////////////
// Redux
////////////////////////////////////////////////////////////////////////////////
import { connect } from 'react-redux';

////////////////////////////////////////////////////////////////////////////////
// Other modules
////////////////////////////////////////////////////////////////////////////////

// External libraries.
import axios from 'axios';  // AJAX Request library.
const CONFIG_AXIOS = require('config/axios.json');  // Axios configuration file.

////////////////////////////////////////////////////////////////////////////////
// Component definition
////////////////////////////////////////////////////////////////////////////////
class CastVote extends React.Component {

  // Constructor.
  constructor(props) {
    super(props);

    // Local state.
    this.state = {
      alertBoxMessage: null,  // Alertbox message.
      alertBoxType: null,  // Alertbox type.

      // Poll data.
      data: null
    }

    // Bind methods to component instance.
    this.updateAlertBox = this.updateAlertBox.bind(this);
    this.getPollInformation = this.getPollInformation.bind(this);

  }

  // Function to update Alert Box.
  updateAlertBox(alertBoxMessage, alertBoxType) {
    this.setState({
      alertBoxMessage: alertBoxMessage,
      alertBoxType: alertBoxType
    })
  }

  // Function to get poll information regarding a give Poll ID.
  getPollInformation(pollID) {

    // Send a GET request to the server to get poll information.
    axios.get('/api/view/poll/' + pollID, CONFIG_AXIOS).then((res) => {

      // Get poll title, author, and choices.
      const title = res.data.poll.title;
      const author = res.data.poll.author;
      const choices = Object.keys(res.data.results);

      // Store poll data in local state.
      this.setState({
        data: {
          title: title,
          author: author,
          choices: choices
        }
      });


    }).catch((err) => {

      // No explicit error checking needed.
      // Errors will render a different view.

    });

  }

  // Component Lifecycle: Component Render Complete.
  //
  // This block executes when component is finished rendering.
  componentDidMount() {

    // Get poll data.
    this.getPollInformation(this.props.params.poll_id)

  }

  // Render.
  render() {

    // If a token is provided, show cast vote form.
    // If not, show login form.
    if (this.props.token) {

      return (
        <div className="has-text-centered columns is-mobile">
          <div className="column is-8 is-offset-2">
            <h1 className="title">Cast your vote!</h1>
            <div className="box">

              {this.state.data ? <CastVoteForm pollData={this.state.data} poll_id={this.props.params.poll_id}/> : <div>Not Loaded</div>}

            </div>
          </div>
        </div>
      )

    } else {
      return (
        <div className="has-text-centered columns is-mobile">
          <div className="column is-8 is-offset-2">
            <LoginNotify customMessage={'You must be logged in to vote on a poll.'}/>
          </div>
        </div>
      )
    }


  }

}

// Maps state to props.
const mapStateToProps = (state) => {
  return {
    token: state.token
  }
}

// Allow component access to Redux store.
export default connect(mapStateToProps, null)(CastVote);
