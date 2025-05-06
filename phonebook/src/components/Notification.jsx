const Notification = ({ message }) => {
    if (message === null) {
        return null
      }

    const notificationStyle = {
      color: message.type === 'error' ? 'red' : 'green',
      fontSize: 20,
      fontWeight: 'bold',
    }

  
    return (
      <div style={notificationStyle}>
        {message.text}
      </div>
    )
  }

  export default Notification