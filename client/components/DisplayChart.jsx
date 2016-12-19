////////////////////////////////////////////////////////////////////////////////
// React
////////////////////////////////////////////////////////////////////////////////

// React
import React from 'react';

////////////////////////////////////////////////////////////////////////////////
// Other
////////////////////////////////////////////////////////////////////////////////

// Charting Library
import {PieChart, Pie, Cell, Legend, ResponsiveContainer} from 'recharts';

// Chart colours
const COLOURS = require('config/colours');

////////////////////////////////////////////////////////////////////////////////
// Component definition
////////////////////////////////////////////////////////////////////////////////
export default class DisplayChart extends React.Component {

  // Component render.
  render() {

    // Restructure data.
    // Original: {'A': 1, 'B': 2, 'C': 3}
    // New: [{'name': 'A', 'value': 1}, {'name': 'B', 'value': 2}, ...]
    const data = Object.keys(this.props.data).map((choice, idx, arr) => (
       { name: choice, value: this.props.data[choice] }
    ));

    // Colourize each slice of the graph
    const Slices = data.map((val, idx, arr) => (<Cell fill={COLOURS[idx]} key={'pie' + idx}/>));

    // Display chart.
    return (
      <ResponsiveContainer minWidth={300} minHeight={400}>
        <PieChart>
          <Pie data={data} innerRadius={70} outerRadius={145} labelLine={false} label>
            {Slices}
          </Pie>
          <Legend/>
        </PieChart>
      </ResponsiveContainer>
    )
  }

}
