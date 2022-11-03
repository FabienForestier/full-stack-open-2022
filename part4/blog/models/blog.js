const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: { type:Number, default: 0 }
})

blogSchema.set('toJSON', {
  transform: (_, blog) => {
    blog.id = blog._id.toString()
    delete blog._id
    delete blog.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)