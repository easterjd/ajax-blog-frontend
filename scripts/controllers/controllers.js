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
  return model.createOne(body)
}

function updatePost (id, title, content) {
  const body = {
    title, content
  }
  return model.updateOne(id, body)
}

function deletePost(id) {
  return model.deleteOne(id)
}

module.exports = {
  refreshBlogs,
  updatePost,
  deletePost,
  createBlog
}
