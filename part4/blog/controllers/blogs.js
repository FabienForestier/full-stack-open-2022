const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const token = getTokenFrom(request)
  if (!token) {
    return response.status(401).json({ error: 'token missing' })
  }
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const blog = new Blog({ ...request.body, user: user._id })

  const savedBlog =  await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  const blogId = request.params.id
  await Blog.findByIdAndRemove(blogId)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const blogId = request.params.id

  if (!request.body.likes) {
    return response.status(400).send({ error: 'Invalid blog value, missing likes' })
  }

  const propertiesToUpdate = {
    likes: request.body.likes,
  }

  const updatedPerson =  await Blog.findByIdAndUpdate(blogId, propertiesToUpdate, { new: true, runValidators: true, context: 'query' })
  response.json(updatedPerson)
})

const getTokenFrom = request => {
  const authorization = request.get('Authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

module.exports = blogRouter
