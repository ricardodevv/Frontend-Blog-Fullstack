const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/users')

usersRouter.post('/', async (request, response) => {
  const body = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs')
    
  response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
  const user = await User
    .findById(request.params.id)
  
  response.json(user)
})

usersRouter.delete('/:id', async (request, response) =>{
  const user = await User
    .findById(request.params.id)
  
  if (user) {
    await User.findByIdAndRemove(request.params.id)
  } else {
    response.status(404).send({ error: 'user not found'})  
  }
})

module.exports = usersRouter