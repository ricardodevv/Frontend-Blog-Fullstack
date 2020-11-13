const Blog = require('../models/blog-list')
const User = require('../models/users')

const initialBlogs = [
  {
    title: 'First Blog',
    date: new Date(),
    likes: 2,
  },
  {
    title: 'Second Blog',
    date: new Date(),
    likes: 5,
  }
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'willremovethissoon',
    date: new Date()
  })

  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb
}