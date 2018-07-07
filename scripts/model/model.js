let allBlogs = []
let editBlog

function getAll () {
  return axios.get("https://tragically-eh-34409.herokuapp.com/posts")
    .then(response => {
      allBlogs = response.data
      return allBlogs
    })
}

function getOne (id) {
  axios.get(`https://tragically-eh-34409.herokuapp.com/posts/${id}`)
    .then(response => {
      editBlog = response.data
    })
}

function createOne (body) {
  return axios.post(`https://tragically-eh-34409.herokuapp.com/posts`, body)
    .then(response => {
      return response
    })
}

function updateOne (id, body) {
  return axios.put(`https://tragically-eh-34409.herokuapp.com/posts/${id}`, body)
    .then(response => {
      // const localCopy = allBlogs.find(post => post.id === id)
      // localCopy.title = body.title
      // localCopy.content = body.content
      return response
    })
}

function deleteOne (id) {
  return axios.delete(`https://tragically-eh-34409.herokuapp.com/posts/${id}`)
    .then(response => {
      // const localIndex = allBlogs.indexOf(response.data)
      // allBlogs.splice(index, 1)
      return response
    })
}

module.exports = {
  allBlogs,
  editBlog,
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne
}
