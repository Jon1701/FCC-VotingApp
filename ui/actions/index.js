// Action to set Json web tokens.
export const storeToken = (jwt) => {
  return {
    type: 'STORE_TOKEN',
    payload: jwt
  }
}

// Action to clear Json web tokens.
export const removeToken = () => {
  return {
    type: 'REMOVE_TOKEN'
  }
}
