import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newContent, setNewContent] = useState('')

  const handleTitle = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthor = (event) => {
    setNewAuthor(event.target.value)
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
      likes: 0
    })

    setNewTitle('')
    setNewAuthor('')
    setNewContent('')
  }

  return (
    <div className="formDiv">
      <form onSubmit={addBlog}>
        <div>
          <div>
            Title:
            <input
              id="title"
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
      </form>
    </div>
  )
}

export default BlogForm