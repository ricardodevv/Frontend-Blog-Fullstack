import React, { useState } from 'react'
import loginService from '../services/login'

const LoginForm = ({
  handleLogin,
}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const logIn = async (event) => {
    event.preventDefault()
    const user = await loginService.login({
      username, password,
    })

    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(user)
    )

    handleLogin(user)
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={logIn}>
          <div>
            username
              <input
              type="text"
              value={username}
              name="Username"
              onChange={handleUsernameChange}
              />
          </div>
          <div>
            password
              <input
              type="password"
              value={password}
              name="Password"
              onChange={handlePasswordChange}
              />
          </div>
          <button type="submit">login</button>
        </form>
    </div>
  )
}

export default LoginForm