import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs' 
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglabe'
import BlogForm from './components/BlogForm'
import './App.css'
import Blog from './components/Blog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [showAll, setShowAll] = useState(false)

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

  // ----- Handlers ------ 
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

  // ----- Update Blog -----
  const updateBlog = async (id) => {
    const blog = blogs.find(blog => blog.id === id)
    const toUpdate = { ...blog, likes: blog.likes + 1 }
    const updateo = blogService.update(id, toUpdate)
    const returned = await updateo
    setBlogs(blogs.map(blog => blog.id !== id ? toUpdate : returned))
  }

  // ----- Delete Blog -----
  const delBlog = async (id) => {
    const blogToDelete = blogService.deleteBlog(id)
    const deleted = await blogToDelete 
    return deleted
  }

  // ----- Forms -------
  const loginForm = () => (
    <Togglable buttonLabel="login">
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
      
      {showAll === true ? 
        blogs.map(blog => 
          <Blog blog={blog} updateBlog={updateBlog} delBlog={delBlog} ></Blog>
        ) 
        : null
      }
    </div>
  );
}

export default App
