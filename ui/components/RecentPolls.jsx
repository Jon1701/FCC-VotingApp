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

    // Local state.
    this.state = {
      polls: null // Array of polls
    }
  }

  // Get poll data.
  getPollData() {

    // GET request to batch retrieve recent polls.
    axios.get('/api/view/recent_polls/1', CONFIG_AXIOS).then((res) => {

      // Store poll data in state.
      this.setState({
        pollData: res.data.payload.polls
      });

    }).catch((err) => {

      // No error checking needed.
      // Errors will result in a different view.

    })

  }

  // Component Lifecycle method.
  // Block will run once component has been rendered.
  componentDidMount() {

    // Store poll data in local state.
    this.getPollData();

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
        <RecentlyCreatedPolls html={pollsHtml}/>
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
