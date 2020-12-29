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
      <div style={hideDetails}> 
        <b>Title: </b> {blog.title} <b>Likes: </b> {blog.likes} 
        <hr></hr>
      </div>
      <div style={showDetails}>
        <b>Title: </b> {blog.title}
        <br></br> 
        <b>Author: </b> {blog.author}
        <br></br>
        <b>Content: </b> {blog.content}
        <br></br>
        <b>Likes: </b> {blog.likes}
        <button onClick={() => like(blog.id, blog.title, blog.author, blog.content, blog.likes)}>Like</button>
        <br></br>
      </div>
      <button onClick={() => setVisible(!visible)}>
        { visible ? 'Hide' : 'More' }
      </button>
      <button onClick={() => deletBlog(blog.id)}>Delete</button>   
    </div>
  )
}

export default Blog