const listRouter = require('express').Router()
const Blog = require('../models/blog-list')

listRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs.map(el => el.toJSON()))
    })
})

listRouter.get('/info', (request, response) => {
  response.write('something')
  response.end()
})

listRouter.post('/', (request, response, next) => {
  const body = request.body
    
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  blog
    .save()
    .then(savedPerson => savedPerson.toJSON())
    .then(savedAndFormattedNote => {
      response.json(savedAndFormattedNote)
    })
    .catch(error => next(error))
})

module.exports = listRouter
