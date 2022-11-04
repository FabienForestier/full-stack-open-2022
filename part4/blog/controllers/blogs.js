const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogsQuery = Blog.find({})
  const sort = request.query.sort
  if(sort && Object.keys(Blog.schema.paths).includes(sort)) {
    blogsQuery.sort({ [sort]: -1 })
  }
  const blogs = await blogsQuery.populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const user = await User.findById(request.user.id)
  if(!user) {
    return response.status(401).send({ error: 'User not registered' })
  }
  const blog = new Blog({ ...request.body, user: user._id })

  const savedBlog =  await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  const blogId = request.params.id
  const blog = await Blog.findById(blogId)
  if(!blog) {
    return response.status(400).send({ error: 'No matching block found.' })
  }
  if(blog.user.toString() !== request.user.id) {
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

  const updatedBlog =  await Blog.findByIdAndUpdate(blogId, propertiesToUpdate, { new: true, runValidators: true, context: 'query' })
  response.json(updatedBlog)
})

module.exports = blogRouter
