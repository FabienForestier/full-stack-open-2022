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

const mostBlogs = (blogs) => {
  if(blogs.length === 0) {
    return undefined
  }
  const blogsByAuthorCounts = blogs.reduce((blogsByAuthors, blog) => ({
    ...blogsByAuthors,
    [blog.author]: (blogsByAuthors[blog.author] || 0) + 1
  }), {})
  return Object.entries(blogsByAuthorCounts).reduce((mostBlogs, [author, count]) => mostBlogs.blogs > count ? mostBlogs : { author, blogs: count }, { blogs: 0 })
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}