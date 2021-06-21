import React from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import './styledForm.css'

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
      <div className="login-container">
        <div className="align-container">
          <h2>Register</h2>
          <form onSubmit={handleRegister}>
            <div className="inputField">
              <h3>Full Name</h3>
              <input
                id="name"
                autoComplete="off"
                value={name}
                onChange={handleNameChange}
              />
            </div>
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
            Sign up
            </button>
          </form>
          <button className="back-button" onClick={() => history.push('/')}>Back to home</button>
        </div>
      </div>
      :
      <Redirect to='/' />
  )
}

RegisterForm.propTypes = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleNameChange: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  handleRegister: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired
}

export default RegisterForm