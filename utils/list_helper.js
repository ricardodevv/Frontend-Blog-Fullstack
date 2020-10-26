const _ = require('lodash') 

const dummy = (blogs) => {
  if (blogs.length === 0) {
    return 1
  }
}

const totalLikes = (list) => {
  const reducer = (sum, item) => {
    console.log(sum, item)
    return sum + item
  } 
  const likes = list.map(el => el.likes)
  return likes.reduce(reducer, 0)
}

const favoriteBlog = (list) => {
  const mapped = list.map((el, i) => {
    return {
        title: el.title,
        author: el.author,
        likes: el.likes,
    }
  })

  const sorted = mapped.sort((a,b) => {
    if (a.likes > b.likes) {
        return -1
    }
    if (a.likes < b.likes) {
        return 1
    }
    return 0
  })

  return sorted[0]
}

const mostBlogs = (list) => {
  const red = _.reduce(list, (result, value, key) => {
    result[value.author] = ++result[value.author] || 1
    return result
  }, {}) 

  const mapk = _.mapValues(red, (value, key) => {
    return {
      author: key,
      blogs: value
    }
  })

  const values = Object.values(mapk)
  const sorted = values.sort((a, b) => {
    if (a.blogs > b.blogs) {
      return -1
    }
    if (a.blogs < b.blogs) {
      return 1
    }
    return 0
  })
  return sorted[0]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}