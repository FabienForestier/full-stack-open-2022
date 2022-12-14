const listHelper = require('../utils/list_helper')

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]
const authorWithMostLikes = {
  author: 'Edsger W. Dijkstra',
  likes: 17
}

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of empty list is 0', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes([blogs[0]])
    expect(result).toBe(7)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {
  test('of a list of blogs equals to the blog that has more likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(blogs[2])
  })

  test('of a list of blogs with more than one blog having the max number of likes equals to the first blog found with the most number of likes', () => {
    const result = listHelper.favoriteBlog([...blogs, {
      _id: '5a422b3a1b54a676234d1a4r',
      title: 'Fake blog',
      author: 'James Bond',
      url: 'http://www.james.bond.uk',
      likes: 12,
      __v: 0
    }])
    expect(result).toEqual(blogs[2])
  })

  test('of an empty list should return undefined', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toBe(undefined)
  })
})

describe('most blog',() => {
  test('return the author that wrote the most blogs with the number of written blogs', () => {
    const authorWithMostBlogs = {
      author: 'Robert C. Martin',
      blogs: 3
    }
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual(authorWithMostBlogs)
  })

  test('when two authors have the same number of blog returns the first one found', () => {
    const authorWithMostBlogs = {
      author: 'Edsger W. Dijkstra',
      blogs: 3
    }
    const result = listHelper.mostBlogs([{
      _id: '5a422aa71b54a676234d17az',
      title: 'Fake blog',
      author: 'Edsger W. Dijkstra',
      url: 'http://fake.com',
      likes: 5,
      __v: 0
    }, ...blogs])
    expect(result).toEqual(authorWithMostBlogs)
  })

  test('of an empty list should return undefined', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toBe(undefined)
  })
})

describe('most likes',() => {
  test('return the author that has the most likes across all its blogs', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual(authorWithMostLikes)
  })

  test('when two authors have the same number of likes returns the first one found', () => {
    const result = listHelper.mostLikes([...blogs,{
      _id: '5a422bc61b54a676234d17ze',
      title: 'Fake',
      author: 'Robert C. Martin',
      url: 'http://fake.com',
      likes: 5,
      __v: 0
    }])
    expect(result).toEqual(authorWithMostLikes)
  })

  test('of an empty list should return undefined', () => {
    const result = listHelper.mostLikes([])
    expect(result).toBe(undefined)
  })
})