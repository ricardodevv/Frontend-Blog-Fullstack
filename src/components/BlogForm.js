import React from 'react'
import Blog from './Blog'

const BlogForm = ({ addBlog, newTitle, handleTitle, newAuthor, handleAuthor, newContent, handleContent, blogs }) => {
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
}

export default BlogForm