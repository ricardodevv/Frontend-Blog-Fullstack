import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs' 
import loginService from './services/login'
import Notification from './components/Notification'
import './App.css'

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

  const handleTitle = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthor = (event) => {
    setNewAuthor(event.target.vale)
  }

  const handleContent = (event) => {
    setNewContent(event.target.value)
  }

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
  
  console.log(user)

  const loginForm = () => (
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
  )
  
  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        <div>
          Title:  
            <input
            type="text"
            value={newTitle}
            onChange={handleTitle}
            />
        </div>
          
        <div>
          Author:
            <input
            type="text"
            value={newAuthor}
            onChange={handleAuthor}
            />
        </div>
          
        <div>
          Content:
            <input
            type="text"
            value={newContent}
            onChange={handleContent}
            />
        </div>
        <button type="submit">Add</button>
      </div>
      
      <div>
        {blogs.map(blog => 
          <Blog key={blog.id} blog={blog} />
        )}
      </div>  
    </form>
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
