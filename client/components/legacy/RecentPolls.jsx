////////////////////////////////////////////////////////////////////////////////
// React
////////////////////////////////////////////////////////////////////////////////
import React from 'react';

////////////////////////////////////////////////////////////////////////////////
// React Router
////////////////////////////////////////////////////////////////////////////////
import { Link } from 'react-router';

////////////////////////////////////////////////////////////////////////////////
// Other modules
////////////////////////////////////////////////////////////////////////////////

// External libraries.
import axios from 'axios';  // AJAX Request library.

// Configuration options.
const CONFIG_AXIOS = require('config/axios.json');  // Axios configuration.

////////////////////////////////////////////////////////////////////////////////
// Component definition
////////////////////////////////////////////////////////////////////////////////
export default class RecentPolls extends React.Component {

  // Constructor.
  constructor(props) {
    super(props);

    // Bind methods to component instance.
    this.getPollData = this.getPollData.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);

    // Local state.
    this.state = {
      polls: null, // Array of polls
      currentPage: 1,  // Current page of results.
    }
  }

  // Get poll data.
  getPollData(pageNum) {

    // Switch API endpoints depending if username was provided or now.
    let endpoint = null;

    // Call correct endpoint.
    if (this.props.username) {
      endpoint = '/api/view/recent_user_polls/' + this.props.username + '/' + pageNum;
    } else {
      endpoint = '/api/view/recent_polls/' + pageNum;
    }

    // GET request to batch retrieve recent polls.
    axios.get(endpoint, CONFIG_AXIOS).then((res) => {

      // Store poll data in state.
      this.setState({
        pollData: res.data.payload.polls
      });

    }).catch((err) => {

      // No error checking needed.
      // Errors will result in a different view.

    })

  }

  // Function to get previous page of results.
  previousPage() {

    // Get current page number.
    let currentPage = this.state.currentPage;

    // Only go to previous page if current page is greater than 1.
    if (currentPage > 1) {

      // Go back one page.
      this.setState({
        currentPage: currentPage - 1
      });

      // Get paginated results.
      this.getPollData(currentPage - 1);

    }

  }

  // Function to get next page of results.
  nextPage() {

    // Get current page number.
    let currentPage = this.state.currentPage;

    // Go forward one page.
    this.setState({
      currentPage: currentPage + 1
    });

    // Get paginated results.
    this.getPollData(currentPage + 1);


  }

  // Component Lifecycle method.
  // Block will run once component has been rendered.
  componentDidMount() {

    // Store poll data in local state.
    this.getPollData(this.state.currentPage);

  }

  // Component Render.
  render() {

    // If no poll data was retrieved, display message.
    if (this.state.pollData) {

      // Create links to each poll.
      const pollsHtml = this.state.pollData.map((poll, idx, arr) => {
        return (
          <Link key={'batch_retrieve_poll' + idx} to={'/view/poll/' + poll._id} className='panel-block'>
            {poll.title}
          </Link>
        )
      });

      // Return a widget showing links to recently created polls.
      return (
        <div>
          <RecentlyCreatedPolls html={pollsHtml}/>
          <div className="control width-100">
            <div className="button width-50" onClick={this.previousPage}>Previous</div>
            <div className="button width-50" onClick={this.nextPage}>Next</div>
          </div>
        </div>
      )

    } else {

      // Return blank if no polls were retrieved.
      return (
        <div>
        </div>
      )
    }

  }

}

////////////////////////////////////////////////////////////////////////////////
// Presentational Components
////////////////////////////////////////////////////////////////////////////////

// Widget to display recently created polls.
const RecentlyCreatedPolls = (props) => (
  <div id="home-recently-created-polls">
    <nav className="panel">
      <p className="panel-heading">
        Recently Created Polls
      </p>
      {props.html}
    </nav>
  </div>
)
