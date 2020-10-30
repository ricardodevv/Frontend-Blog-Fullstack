const Blog = require('../models/blog-list')

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

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb
}