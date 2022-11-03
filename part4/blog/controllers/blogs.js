const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', middleware.validTokenRequired, async (request, response) => {
  const user = await User.findById(request.userId)
  const blog = new Blog({ ...request.body, user: user._id })

  const savedBlog =  await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', middleware.validTokenRequired, async (request, response) => {
  const blogId = request.params.id
  const blog = await Blog.findById(blogId)
  if(!blog) {
    return response.status(400).send({ error: 'No matching block found.' })
  }
  if(blog.user.toString() !== request.userId) {
    return response.status(403).send({ error: 'You cannot delete blogs which are not yours.' })
  }

  await Blog.deleteOne({ _id: blogId })

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

module.exports = blogRouter
