function getAll () {
  return axios.get("https://tragically-eh-34409.herokuapp.com/posts")
    .then(response => {
      return response
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
      return response
    })
}

function deleteOne (id) {
  return axios.delete(`https://tragically-eh-34409.herokuapp.com/posts/${id}`)
    .then(response => {
      return response
    })
}

module.exports = {
  getAll,
  createOne,
  updateOne,
  deleteOne
}
