const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Having fun',
    author: 'Funny guy',
    url: 'https://havingfun.fr',
    likes: 1
  },
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  }
]

const nonExistingId = async () => {
  const note = new Blog({ content: 'willremovethissoon', date: new Date() })
  await note.save()
  await note.remove()

  return note._id.toString()
}

const blogsInDb = async () => {
  const notes = await Blog.find({})
  return notes.map(note => note.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}