// Action to set Json web tokens.
export const setJwt = (jwt) => {
  return {
    type: 'SET_JSON_WEB_TOKEN',
    payload: kwt
  }
}

// Action to clear Json web tokens.
export const clearJwt = () => {
  return {
    type: 'CLEAR_JSON_WEB_TOKEN'
  }
}
