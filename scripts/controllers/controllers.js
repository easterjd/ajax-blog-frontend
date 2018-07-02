const model = require('../model/model')

function refreshBlogs () {
  return model.getAll()
    .then(response => {
      return response
    })
}

function createBlog (title, content) {
  const body = {
    title: title,
    content: content
  }
  model.createOne(body)
}

module.exports = {
  refreshBlogs
}
