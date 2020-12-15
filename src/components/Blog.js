import React from 'react'

const Blog = ({ blog }) => { 
  return (
    <div>
      <b>Title: </b> {blog.title} <b>Likes: </b> {blog.likes} 
    <hr></hr>
    </div>
    
  )
}

export default Blog