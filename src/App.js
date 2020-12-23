import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs' 
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglabe'
import BlogForm from './components/BlogForm'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
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

  const handleLogin = (user) => {
    try {
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  // ----- Add blog function ------
  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const blog = blogService.createBlog(blogObject)
    const returned = await blog
    setBlogs(blogs.concat(returned))
  }

  console.log(user)

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm 
        handleLogin ={handleLogin}
        />
    </Togglable>
  )

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel="new note" ref={blogFormRef}>
      <BlogForm
        createBlog={addBlog}
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
