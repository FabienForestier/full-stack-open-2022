const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const helper =  require('./test_helper')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blogs have a unique identifier property called id', async () => {
  const response = await api.get('/api/blogs')

  response.body.forEach((blog) => {
    expect(blog.id).toBeDefined()
  })
})

test('a valid blog can be added', async () => {
  const newBlog ={
    title: 'Fake blog',
    author: 'Fabien',
    url: 'https://fakeblog.fr',
    likes: 2
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  expect(blogsAtEnd).toContainEqual({ id: expect.any(String), ...newBlog })
})

test('a new blog likes should default to 0 if no value is provided', async () => {
  const newBlog ={
    title: 'Fake blog',
    author: 'Fabien',
    url: 'https://fakeblog.fr',
  }

  const result = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(result.body.likes).toBe(0)
})

test('should not create a blog without a title', async () => {
  const newBlog ={
    author: 'Fabien',
    url: 'https://fakeblog.fr',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('should not create a blog without a url', async () => {
  const newBlog ={
    title: 'fakeBlog',
    author: 'Fabien',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})