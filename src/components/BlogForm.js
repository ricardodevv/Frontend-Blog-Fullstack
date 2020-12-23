import React, { useState } from 'react'
import Blog from './Blog'

const BlogForm = ({ createBlog, blogs }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newContent, setNewContent] = useState('')

  const handleTitle = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthor = (event) => {
    setNewAuthor(event.target.vale)
  }

  const handleContent = (event) => {
    setNewContent(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      content: newContent,
    })
    
    setNewTitle('')
    setNewAuthor('')
    setNewContent('')
  }

  return (
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
}

export default BlogForm