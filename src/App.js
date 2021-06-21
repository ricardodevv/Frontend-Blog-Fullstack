/* eslint-disable linebreak-style */
import React, { useState, useEffect, useRef } from 'react'
import Home from './components/Home'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import RegisterForm from './components/RegisterForm'
import Togglable from './components/Togglabe'
import blogService from './services/blogs'
import loginService from './services/login'
import registerService from './services/register'
import { Switch, Route } from 'react-router-dom'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [showAll, setShowAll] = useState(true)
  const [name, setName] = useState('')
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
  const handleLogin = async event => {
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

  const handleRegister = async event => {
    event.preventDefault()
    try {
      await registerService.register({
        username, name, password,
      })
      handleLogin(event)
    } catch (exception) {
      setErrorMessage('An error ocurred')
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
  /*const loginForm = () => (
    <Togglable buttonLabel='login'>
    </Togglable>
  )
*/
  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm
        createBlog={addBlog}
      />
    </Togglable>
  )

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  return (
    <div>
      <Notification message={errorMessage}/>
      <Switch>
        <Route path='/login'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleLogin={handleLogin}
            user={user}
          />
        </Route>
        <Route path='/register'>
          <RegisterForm
            name={name}
            username={username}
            password={password}
            handleNameChange={({ target }) => setName(target.value)}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleRegister={handleRegister}
            user={user}
          />
        </Route>
        <Route path='/'>
          <Home
            user={user}
            blogs={blogs}
            showAll={showAll}
            setShowAll={setShowAll}
            Blog={Blog}
            blogForm={blogForm}
            updateBlog={updateBlog}
            delBlog={delBlog}
            logOut={logOut}
          />
        </Route>
      </Switch>
    </div>
  )
}

export default App
