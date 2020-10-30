const listRouter = require('express').Router()
const Blog = require('../models/blog-list')

listRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    response.json(blogs)
})

listRouter.get('/info', async (request, response) => {
  response.write('something')
  response.end()
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
    const formated = await savedBlog.toJSON() 
    response.json(formated)
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

module.exports = listRouter
