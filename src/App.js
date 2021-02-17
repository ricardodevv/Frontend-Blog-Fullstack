/* eslint-disable linebreak-style */
import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglabe'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [showAll, setShowAll] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // ----- Handlers ------
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
  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .createBlog(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
  }

  // ----- Update Blog -----
  const updateBlog = async (id) => {
    const blog = blogs.find(blog => blog.id === id)
    const toUpdate = { ...blog, likes: blog.likes + 1 }
    const updateo = await blogService.update(id, toUpdate)
    setBlogs(blogs.map(blog => blog.id !== id ? blog : updateo))
  }

  // ----- Delete Blog -----
  const delBlog = async (id) => {
    await blogService.deleteBlog(id)
    setBlogs(blogs.filter(blog => blog.id !== id))
  }

  // ----- Forms -------
  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleLogin ={handleLogin}
      />
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm
        createBlog={addBlog}
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

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          {showAll ? 'hide' : 'show'}
        </button>
      </div>

      <ul>
        {showAll === true ?
          blogs.map((blog, i) =>
            <Blog
              key={i}
              blog={blog}
              updateBlog={updateBlog}
              delBlog={delBlog} />
          )
          : ''
        }
      </ul>
    </div>
  )
}

export default App
