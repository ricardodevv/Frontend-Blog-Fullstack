import React, { useState } from 'react'

const BlogForm = ({ createBlog, username }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newContent, setNewContent] = useState('')

  console.log(username)
  const handleTitle = event => {
    setNewTitle(event.target.value)
  }

  const handleContent = event => {
    setNewContent(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: username.name,
      content: newContent,
      likes: 0
    })

    setNewTitle('')
    setNewContent('')
  }

  return (
    <div className="formDiv">
      <form onSubmit={addBlog}>
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
            Content:
          <input
            type="text"
            value={newContent}
            onChange={handleContent}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default BlogForm