const listRouter = require('express').Router()
const Blog = require('../models/blog-list')

listRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
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
    
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  const savedBlog = await blog.save()
  response.json(savedBlog)

  /*blog
    .save()
    .then(savedPerson => savedPerson.toJSON())
    .then(savedAndFormattedNote => {
      response.json(savedAndFormattedNote)
    })
  .catch(error => next(error))
  */
})

listRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

listRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    likes: body.likes 
  }

  const upd = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true})
  response.json(upd)
})  


module.exports = listRouter
