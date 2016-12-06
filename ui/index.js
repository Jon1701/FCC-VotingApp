// React.
import React from 'react';
import ReactDOM from 'react-dom';

// Redux.
import { Provider } from 'react-redux';
import { createStore } from 'redux';

// Reducers and store.
import reducers from 'reducers/index.js';
let store = createStore(reducers);

// Display state changes.
store.subscribe(() => {
  console.log(store.getState())
});

// React container.
import UserInterface from 'containers/UserInterface.jsx';

// Add stylesheets.
require("stylesheets/stylesheet.scss");

ReactDOM.render(<Provider store={store}><UserInterface/></Provider>, document.getElementById('react-target'));
