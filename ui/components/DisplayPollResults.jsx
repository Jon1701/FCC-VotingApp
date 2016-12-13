////////////////////////////////////////////////////////////////////////////////
// React
////////////////////////////////////////////////////////////////////////////////
import React from 'react';

////////////////////////////////////////////////////////////////////////////////
// Other modules
////////////////////////////////////////////////////////////////////////////////

// External libraries.
import axios from 'axios';  // AJAX Request library.
import { Chart } from 'react-google-charts';  // Google Charts.

// Configuration options.
const COLOURS = require('config/colours');  // Chart colours.
const CONFIG_AXIOS = require('config/axios.json');  // Axios configuration.

////////////////////////////////////////////////////////////////////////////////
// Component definition
////////////////////////////////////////////////////////////////////////////////
export default class DisplayPollResults extends React.Component {

  // Constructor.
  constructor(props) {
    super(props);

    // Local state.
    this.state = {
      chart: null // Chart information.
    }

    // Bind methods to component instance.
    this.getPollInformation = this.getPollInformation.bind(this);
  }

  // Function to get poll information regarding a give Poll ID.
  getPollInformation(pollID) {

    // Send a GET request to the server to get poll information.
    axios.get('/api/view/poll/' + pollID, CONFIG_AXIOS).then((res) => {

      // Get a tally of results.
      const tally = res.data.results;

      // Get poll title and author.
      const title = res.data.poll.title;
      const author = res.data.poll.author;

      // Calculate total number of votes.
      let totalVoteCount = 0;

      // Array of choices and counts.
      // But first element should be axis labels.
      const data = [['', 'Number of Votes']];

      // Convert tally object to an array of arrays.
      // Each array should consists of a choice and a count.
      for (let i=0; i<Object.keys(tally).length; i++) {

        // Extract a choice and count from the tally object.
        let choice = Object.keys(tally)[i];
        let count = tally[choice];

        // Update number of votes.
        totalVoteCount += count;

        // Store the choice and count.
        data.push([choice, count]);
      }

      // Store chart data into local state.
      this.setState({
        chart: {
          title: title,
          author: author,
          data: data,
          totalVoteCount: totalVoteCount,
          choices: Object.keys(tally)
        }
      })

    }).catch((err) => {

      // No explicit error checking needed.
      // Errors will render a different view.

    });

  }

  // Component lifecycle.
  // Execute this block when component has finished rendering.
  componentDidMount() {

    // Look up poll information with the given Poll ID.
    this.getPollInformation(this.props.poll_id);

  }

  // Render.
  render() {

    // Function to generate a different view of the poll depending if it has
    // votes or not, or if the poll does not exist.
    const GenerateView = () => {

      // Display different view based on certain conditions.
      if(this.state.chart) {

        if (this.state.chart.totalVoteCount == 0) {

          // Poll exists, but has no votes.
          //
          // Display list of choices.
          const choices = this.state.chart.choices.map((choice, idx, arr) => {
            return ( <div className='button' key={'choice_'+choice+'_'+idx}>{choice}</div> )
          });

          return (
            <DisplayNoVotes title={this.state.chart.title} choices={choices}/>
          )
        } else {

          // Poll exists, display results in a Google Chart.
          return (
            <DisplayGoogleChart title={this.state.chart.title} data={this.state.chart.data}/>
          )
        }

      } else {

        // Poll does not exist.
        return (
          <DisplayNone/>
        )
      }

    }

    return (
      <div className="text-center columns is-mobile">
        <div className="column is-8 is-offset-2">
          <h1 className="title">View Poll</h1>
          <div className="box">
            <GenerateView/>
          </div>
        </div>
      </div>
    )

  }

}

////////////////////////////////////////////////////////////////////////////////
// Presentational Components.
////////////////////////////////////////////////////////////////////////////////

// View when a poll does not exist.
const DisplayNone = (props) => (
  <div>
    Poll not found.
  </div>
)

// View when a poll has received no votes.
const DisplayNoVotes = (props) => (
  <div>
    <h1 className='title'>{props.title}</h1>
    <h2 className='subtitle'>This poll has not been voted on yet!</h2>
    <div>
      <p>Here are the poll choices:</p>
      {props.choices}
    </div>
  </div>
)

// View when a poll has votes.
const DisplayGoogleChart = (props) => (
  <div className='googlechart'>
    <h1 className='title'>{props.title}</h1>
    <Chart
      chartType='PieChart'
      data={props.data}
      options={{
        pieHole: 0.4,
        colors: COLOURS
      }}
    />
  </div>
)
