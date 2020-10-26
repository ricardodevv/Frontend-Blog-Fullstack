const _ = require('lodash')

const list = [
    {
      _id: "5a422a851b54a676234d17f7", 
      title: "React patterns", 
      author: "Michael Chan", 
      url: "https://reactpatterns.com/", 
      likes: 7, 
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8", 
      title: "Go To Statement Considered Harmful", 
      author: "Edsger W. Dijkstra", 
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", 
      likes: 5, 
      __v: 0
    },
    { 
      _id: "5a422b3a1b54a676234d17f9", 
      title: "Canonical string reduction", 
      author: "Edsger W. Dijkstra", 
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", 
      likes: 12, 
      __v: 0 
    }, 
    { 
      _id: "5a422b891b54a676234d17fa", 
      title: "First class tests", 
      author: "Robert C. Martin", 
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", 
      likes: 10, 
      __v: 0 
    }
  ]
  
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

  const tst = () => {  
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

  const author_with_mostBlogs = {
    author: 'Edsger W. Dijkstra',
    blogs: 2
  }
  
  console.log(tst())
  console.log(author_with_mostBlogs)