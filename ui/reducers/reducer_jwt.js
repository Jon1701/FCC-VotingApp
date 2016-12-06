// Reducer definition.
const jwt = (state=null, action) => {

  switch(action.type) {

    // Store JSON web token in state.
    case 'SET_JSON_WEB_TOKEN':

      // Get token, and username.
      const token = action.payload;
      const username = JSON.parse(atob(action.payload.split('.')[1])).username;

      // Store token and username in state.
      return {token: token, username: username};

    // Clear JSON web token from state.
    case 'CLEAR_JSON_WEB_TOKEN':
      return null;

  }

  // Return default state if no cases match.
  return state;

}

// Export reducer.
export default jwt;
