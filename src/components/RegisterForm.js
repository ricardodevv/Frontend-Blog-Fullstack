import React from 'react'
import { Redirect, useHistory } from 'react-router-dom'

const RegisterForm = ({
  name,
  username,
  password,
  handleNameChange,
  handleUsernameChange,
  handlePasswordChange,
  handleRegister,
  user
}) => {
  let history = useHistory()

  return (
    user === null ?
      <div>
        <h2>Sign Up</h2>
        <form onSubmit={handleRegister}>
          <div>
          Name
            <input
              id="name"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div>
          username
            <input
              id="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div>
          password
            <input
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button id="register-button" type="submit">
          Register
          </button>
        </form>
        <button onClick={() => history.push('/')}>Back to home</button>
      </div>
      :
      <Redirect to='/' />
  )
}

export default RegisterForm