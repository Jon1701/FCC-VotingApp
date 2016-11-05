// React.
import React from 'react';
import ReactDOM from 'react-dom';

// React Components.
import HelloWorld from 'components/HelloWorld.jsx';

// Add stylesheets.
require("stylesheets/stylesheet.scss");

ReactDOM.render(<HelloWorld/>, document.getElementById('react-target'));
