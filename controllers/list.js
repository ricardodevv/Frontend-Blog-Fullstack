const listRouter = require('express').Router()
const Blog = require('../models/blog-list')

listRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    response.json(blogs)
})

listRouter.get('/:id', async (request, response, next) => {
  try{
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
  } catch(exception) {
    next(exception)
  }
})

listRouter.post('/', async (request, response, next) => {
  const body = request.body
    
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  try {
    const savedBlog = await blog.save()
    //const formated = await savedBlog.toJSON() 
    response.json(savedBlog)
  } catch(exception) {
    next(exception)
  }

  /*blog
    .save()
    .then(savedPerson => savedPerson.toJSON())
    .then(savedAndFormattedNote => {
      response.json(savedAndFormattedNote)
    })
  .catch(error => next(error))
  */
})

listRouter.delete('/:id', async (request, response, next) => {
  try{
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

module.exports = listRouter
