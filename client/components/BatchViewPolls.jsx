////////////////////////////////////////////////////////////////////////////////
// React
////////////////////////////////////////////////////////////////////////////////
import React from 'react';

// Components
import Notification from 'components/Notification';

////////////////////////////////////////////////////////////////////////////////
// React Router
////////////////////////////////////////////////////////////////////////////////
import { Link } from 'react-router';

////////////////////////////////////////////////////////////////////////////////
// Other
////////////////////////////////////////////////////////////////////////////////
const request = require('config/request');  // Make HTTP GET/POST requests

////////////////////////////////////////////////////////////////////////////////
// Component definition.
////////////////////////////////////////////////////////////////////////////////
export default class BatchViewPolls extends React.Component {

  // Component constructor.
  constructor(props) {
    super(props);

    // Local state.
    this.state = {
      polls: null,  // Poll data.
    }

    // Bind methods to component instance.
    this.getPollList = this.getPollList.bind(this);
    this.handlePreviousPolls = this.handlePreviousPolls.bind(this);
    this.handleNextPolls = this.handleNextPolls.bind(this);
    this.setNotification = require('common/notifyFunctions').setNotification.bind(this);     // Set notification.
    this.clearNotification = require('common/notifyFunctions').clearNotification.bind(this); // Clear notification.
  }

  // Method to get the previous page of polls.
  handlePreviousPolls() {

    // Deconstruct state.
    const {numResultsPerPage, numResultsThisPage, numResultsTotal, pageNum} = this.state.polls;

    // Desconstruct props.
    const {perPage, order} = this.props;

    // Go to previous page if it is not page 0.
    if (pageNum-1 >= 1) {
      this.getPollList(pageNum-1, perPage, order);
    }

  }

  // Method to get the next page of polls.
  handleNextPolls() {

    // Deconstruct state.
    const {numResultsPerPage, numResultsThisPage, numResultsTotal, pageNum} = this.state.polls;

    // Desconstruct props.
    const {perPage, order} = this.props;

    // Go to next page if the following page will have results.
    if ((pageNum * numResultsPerPage) < numResultsTotal) {
      this.getPollList(pageNum+1, perPage, order);
    }

  }

  // Method to get a list of recently created polls, and store them in local
  // state
  getPollList(pageNum, perPage, order) {

    // Make pageNum and perPage strings.
    pageNum = String(pageNum);
    perPage = String(perPage);

    // Build a query string containing the username parameter.
    const userNameQueryString = (username=this.props.username) => {
      if (username) {
        return '&username=' + username;
      } else {
        return '';
      }
    }

    // Make HTTP GET request to server.
    request.get('/api/batch/get_polls?sort=' + order + '&pageNum=' + pageNum + '&perPage=' + perPage + userNameQueryString())
      .then((res) => {

        // Store poll data in local state.
        this.setState({
          polls: res.data.payload
        });

      })
      .catch((err) => {

        // Display error message.
        this.setNotification('DANGER', err.response.data.message);

      });

  }

  // Component Lifecycle Method
  //
  // Execute this block once component is done loading.
  componentDidMount() {

    // Deconstruct props.
    const { pageNum, perPage, order } = this.props;

    // Get a list of polls.
    this.getPollList(pageNum, perPage, order);

  }

  // Component render.
  render() {

    // Render different views depending if poll data was saved in local state.
    if (this.state.polls) {

      // Deconstruct this.state.polls.
      const { pageNum, numResultsPerPage, numResultsTotal, numResultsThisPage, results } = this.state.polls;

      // Create an array of <Link>s to polls.
      const renderPollList = results.map((poll, idx, arr) => {
        return (
          <Link key={'batch_poll_' + idx} className="panel-block" to={"/view/poll/" + poll['_id']}>{poll['title']}</Link>
        )
      });

      // Display links to recently created polls.
      return (
        <div>

          {/* Display a notification on error */}
          {this.state.notification ? <Notification notification={this.state.notification} handleClose={this.clearNotification}/> : <span/>}

          {/* Links to polls. */}
          <nav className="panel">
            {renderPollList}
          </nav>

          {/* Pagination controls */}
          <p className="control width-100 has-addons">
            <a className="button width-50" onClick={this.handlePreviousPolls}>Previous</a>
            <a className="button width-50" onClick={this.handleNextPolls}>Next</a>
          </p>

        </div>
      )
    } else {

      // Display notification stating no polls are available.
      return (
        <div>
          {/* Display a notification on error */}
          {this.state.notification ? <Notification notification={this.state.notification} handleClose={this.clearNotification}/> : <span/>}

          No recently created polls.
        </div>
      )
    }

  }

}

// Typecheck this.props.
BatchViewPolls.propTypes = {
  pageNum: React.PropTypes.number, // Must be a number.
  perPage: React.PropTypes.number, // Must be a number.
  order: React.PropTypes.oneOf(['ascending', 'descending']),  // Must be a string either ascending or descending.
}
