// Method to set the Notification panel.
const setNotification = (type, message) => {
  this.setState({
    notification: {
      type,
      message
    }
  });
}

// Method to clear the Notification panel.
const clearNotification =() => {
  this.setState({
    notification: null
  });
}

// Export the setNotification and clearNotification functions.
module.exports = {
  setNotification,
  clearNotification
}
