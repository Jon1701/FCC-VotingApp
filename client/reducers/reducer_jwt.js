// Reducer definition.
const jwt = (state=null, action) => {

  switch(action.type) {

    // Store JSON web token in state.
    case 'STORE_TOKEN':

      // Safari private mode workaround.
      try {

        // Store token in session storage.
        sessionStorage.setItem('token', action.payload);

      } catch(e) {

        // Don't use session storage for tokens in Safari when in private mode.
        // Only use redux state for tokens.

      }

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
