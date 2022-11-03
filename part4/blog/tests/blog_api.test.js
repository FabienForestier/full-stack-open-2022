const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const helper =  require('./test_helper')
const app = require('../app')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)
let user

beforeEach(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})

  const password = 'sekret'
  const passwordHash = await bcrypt.hash(password, 10)
  const newUser = new User({ username: 'root', passwordHash })

  const savedUser = await newUser.save()
  await Blog.insertMany(helper.initialBlogs.map((blog) => ({ ...blog, user: savedUser._id })))
  const response = await api
    .post('/api/login')
    .send({ username: newUser.username, password })
  user = { token: response.body.token, id: savedUser._id }
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .set({ Authorization: `Bearer ${user.token}` })
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs').set({ Authorization: `Bearer ${user.token}` })

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs').set({ Authorization: `Bearer ${user.token}` })

    const contents = response.body.map(r => r.title)

    expect(contents).toContain(
      helper.initialBlogs[0].title
    )
  })

  test('blogs have a unique identifier property called id', async () => {
    const response = await api.get('/api/blogs').set({ Authorization: `Bearer ${user.token}` })

    response.body.forEach((blog) => {
      expect(blog.id).toBeDefined()
    })
  })
})

describe('addition of a new blog', () => {
  test('succeed with valid data', async () => {
    const newBlog ={
      title: 'Fake blog',
      author: 'Fabien',
      url: 'https://fakeblog.fr',
      likes: 2
    }

    await api
      .post('/api/blogs')
      .set({ Authorization: `Bearer ${user.token}` })
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    expect(blogsAtEnd).toContainEqual({ id: expect.any(String), ...newBlog, user: user.id.toString() })
  })

  test('without likes provided should default its likes to 0', async () => {
    const newBlog ={
      title: 'Fake blog',
      author: 'Fabien',
      url: 'https://fakeblog.fr',
    }

    const result = await api
      .post('/api/blogs')
      .set({ Authorization: `Bearer ${user.token}` })
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(result.body.likes).toBe(0)
  })

  test('fails if no valid token is provided', async () => {
    const newBlog ={
      title: 'Fake blog',
      author: 'Fabien',
      url: 'https://fakeblog.fr',
      likes: 2
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })

  test('should fail if no title is provided', async () => {
    const newBlog ={
      author: 'Fabien',
      url: 'https://fakeblog.fr',
    }

    await api
      .post('/api/blogs')
      .set({ Authorization: `Bearer ${user.token}` })
      .send(newBlog)
      .expect(400)
  })

  test('should fail if no url is provided', async () => {
    const newBlog ={
      title: 'fakeBlog',
      author: 'Fabien',
    }

    await api
      .post('/api/blogs')
      .set({ Authorization: `Bearer ${user.token}` })
      .send(newBlog)
      .expect(400)
  })
})

describe('deletion of a note', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set({ Authorization: `Bearer ${user.token}` })
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('update of a note', () => {
  const newLikes = 10
  test('succeeds with status code 200 if id is valid and likes provided', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set({ Authorization: `Bearer ${user.token}` })
      .send({ likes: newLikes })
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    expect(blogsAtEnd).toContainEqual({ ...blogsAtStart[0], likes: newLikes })
  })

  test('return the updated blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const result = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set({ Authorization: `Bearer ${user.token}` })
      .send({ likes: newLikes })

    expect(result.body).toEqual({ ...blogsAtStart[0], likes: newLikes })
  })

  test('fails with 400 if likes is not provided', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set({ Authorization: `Bearer ${user.token}` })
      .send({ })
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})