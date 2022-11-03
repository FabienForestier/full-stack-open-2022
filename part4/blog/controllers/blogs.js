const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  const result =  await blog.save()
  response.status(201).json(result)
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

module.exports = blogRouter
