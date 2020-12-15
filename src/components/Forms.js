import React, { useState } from 'react'
import loginService from '../services/login'
import Notification from '../components/Notification'

const Forms = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  
  const loginForm = () => {
      <form onSubmit={handleLogin}>
          <div>
            username
              <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
              />
          </div>
          <div>
            password
              <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
              />
          </div>
          <button type="submit">login</button>
        </form>
    }
  
    const blogForm = () => {
      <form onSubmit={props.addBlog}>
        <div>
          <div>
            Title:  
            <input
            type="text"
            value={props.newTitle}
            onChange={props.handleTitle}
            />
          </div>
          
          <div>
            Author:
            <input
            type="text"
            value={props.newAuthor}
            onChange={props.handleAuthor}
            />
          </div>
          
          <div>
            Content:
            <input
            type="text"
            value={props.newContent}
            onChange={props.handleContent}
            />
          </div>
        </div>
        <button type="submit">Add</button>
        </form>
    }

  return (
    <div>
      <Notification errorMessage={errorMessage}/>

      {user === null 
        ? loginForm() 
        : blogForm()
      }
    </div> 
  )
}

export default Forms