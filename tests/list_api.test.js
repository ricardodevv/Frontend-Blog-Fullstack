const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
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
beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('list are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')
  console.log(response)
  const contents = response.body.map(r => r.title)
  expect(contents).toContain('Second Blog')
})

afterAll(() => {
  mongoose.connection.close()
})
