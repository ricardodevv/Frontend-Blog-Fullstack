import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, useHistory } from 'react-router-dom'

const LoginForm = ({
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  handleLogin,
  user
}) => {
  let history = useHistory()

  return (
    user === null ?
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
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
          <button id="login-button" type="submit">
          login
          </button>
        </form>
        <button onClick={() => history.push('/')}>Back to home</button>
      </div>
      :
      <Redirect to='/' />
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm