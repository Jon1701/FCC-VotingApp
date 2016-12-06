// React.
import React from 'react';
import ReactDOM from 'react-dom';

// React container.
import UserInterface from 'containers/UserInterface.jsx';

// Add stylesheets.
require("stylesheets/stylesheet.scss");

ReactDOM.render(<UserInterface/>, document.getElementById('react-target'));
