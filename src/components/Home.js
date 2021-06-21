import React from 'react'
import { Link } from 'react-router-dom'

const Home = ({
  user,
  blogs,
  showAll,
  setShowAll,
  Blog,
  blogForm,
  updateBlog,
  delBlog,
  logOut
}) => {

  return (
    <div>
      {user === null ?
        <div>
          <h2>Blog app</h2>
          <button><Link to="/login">Login</Link></button>
          <button><Link to="/register">Register</Link></button>
        </div> :
        <div>
          <h2>Blogs</h2>
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
      <ul>
        {showAll === true ?
          blogs.map((blog, i) =>
            <Blog
              key={i}
              blog={blog}
              updateBlog={updateBlog}
              delBlog={delBlog} />
          )
          : ''
        }
      </ul>
    </div>
  )
}

export default Home