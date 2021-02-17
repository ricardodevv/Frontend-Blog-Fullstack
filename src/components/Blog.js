import React, { useState } from 'react'

const Blog = ({ blog, updateBlog, delBlog }) => {
  const [visible, setVisible] = useState(false)

  const showDetails = { display: visible ? '' : 'none' }
  const hideDetails = { display: visible ? 'none' : '' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const like = (id) => {
    updateBlog(id)
  }

  const deletBlog = (id) => {
    delBlog(id)
  }

  return (
    <div style={blogStyle}>
      <div style={hideDetails} className="blog-preview">
        <b>Title: </b> {blog.title} <b>Likes: </b> {blog.likes}
        <hr></hr>
        <button id="likeButton" onClick={() => like(blog.id, blog.title, blog.author, blog.content, blog.likes)}>Like</button>
        <br></br>
        <button onClick={() => setVisible(!visible)}>
          { visible ? 'Hide' : 'More' }
        </button>
      </div>
      <div style={showDetails} className="blog-full">
        <b>Title: </b> {blog.title}
        <br></br>
        <b>Author: </b> {blog.author}
        <br></br>
        <b>Content: </b> {blog.content}
        <br></br>
        <b>Likes: </b> {blog.likes}
        <button onClick={() => like(blog.id, blog.title, blog.author, blog.content, blog.likes)}>Like</button>
        <br></br>
        <button onClick={() => setVisible(!visible)}>
          { visible ? 'Hide' : 'More' }
        </button>
        <button onClick={() => deletBlog(blog.id)}>Delete</button>
      </div>
    </div>
  )
}

export default Blog