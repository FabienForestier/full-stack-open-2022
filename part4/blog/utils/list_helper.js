const dummy = () => {
  return 1
}

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0)

const favoriteBlog = (blogs) =>  {
  if(blogs.length === 0) {
    return undefined
  }
  return blogs.reduce((prev, current) => (prev.likes >= current.likes ? prev : current))
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}