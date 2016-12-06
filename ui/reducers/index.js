// Redux.
import { combineReducers } from 'redux';

// Reducers.
import jwtReducer from './reducer_jwt';

// Combine all reducers into one state object.
const reducers = combineReducers({
  jwt: jwtReducer
});

// Export the global state.
export default reducers;
