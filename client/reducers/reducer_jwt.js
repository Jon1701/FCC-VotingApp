// Reducer definition.
const jwt = (state=null, action) => {

  switch(action.type) {

    // Store JSON web token in state.
    case 'STORE_TOKEN':

      // Store token in session storage.
      sessionStorage.setItem('token', action.payload)

      // Store token and username in state.
      return action.payload;

    // Clear JSON web token from state.
    case 'REMOVE_TOKEN':

      // Remove token from session storage.
      sessionStorage.removeItem('token')

      return null;

  }

  // Return default state if no cases match.
  return state;

}

// Export reducer.
export default jwt;
