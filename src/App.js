import React, { useState, useEffect } from 'react'
import blogService from './services/blogs' 
import loginService from './services/login'
import Notification from './components/Notification'
import './App.css'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglabe'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newContent, setNewContent] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    const getBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
      }
    getBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // Handlers 
  const handleTitle = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthor = (event) => {
    setNewAuthor(event.target.vale)
  }

  const handleContent = (event) => {
    setNewContent(event.target.value)
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.vale)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
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

  // ----- Add blog function ------
  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      content: newContent,
      }
    const blog = blogService.createBlog(blogObject)
    const returned = await blog
    setBlogs(blogs.concat(returned))

    setNewTitle('')
    setNewAuthor('')
    setNewContent('')
  }

  console.log(user)

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm 
        handleSubmit={handleLogin}
        handleUsernameChange={handleUsernameChange}
        handlePasswordChange={handlePasswordChange}
        username={username}
        password={password}
        />
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel="new note">
      <BlogForm
        addBlog={addBlog}
        newTitle={newTitle}
        handleTitle={handleTitle}
        newAuthor={newAuthor}
        handleAuthor={handleAuthor}
        newContent={newContent}
        handleContent={handleContent}
        blogs={blogs}
      />   
    </Togglable>
  )  

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
  }
    

  return (
    <div className="App">
      <h2>Blogs</h2>

      <Notification message={errorMessage}/>

      {user === null ? 
        loginForm() :
        <div>
          <p>
            {user.name} logged-in
            <button onClick={(() => logOut())}>Log out</button>
          </p>
          {blogForm()}
        </div> 
      }
    </div>
  );
}

export default App
