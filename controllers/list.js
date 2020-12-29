const listRouter = require('express').Router()
const Blog = require('../models/blog-list')
const User = require('../models/users')
const jwt = require('jsonwebtoken')

listRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
    
    response.json(blogs)
})

listRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

listRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  console.log(decodedToken)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    content: body.content,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
})

listRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  console.log(blog)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (blog.user.toString() === decodedToken.id.toString()) {  
    await Blog.findByIdAndRemove(request.params.id)
    console.log(decodedToken)
    response.status(204).end()
  } else {
    response.send({
      error: 'error'
    })
  }
})

listRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    content: body.content,
    likes: body.likes 
  }

  const upd = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true})
  response.json(upd)
})  


module.exports = listRouter
