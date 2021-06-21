import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, useHistory } from 'react-router-dom'
import './styledForm.css'

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
      <div className="login-container">
        <div className="align-container">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="inputField">
              <h3>Username</h3>
              <input
                id="username"
                autoComplete="off"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            <div className="inputField">
              <h3>Password</h3>
              <input
                id="password"
                type="password"
                autoComplete="off"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <button className="submit-button" type="submit">
            Login
            </button>
          </form>
          <button className="back-button" onClick={() => history.push('/')}>Back to home</button>
        </div>
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