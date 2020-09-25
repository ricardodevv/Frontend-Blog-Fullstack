import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return ''
  }

  return (
    <div>
      {message}
    </div>
  )
}

export default Notification