const view = require('./view/view')
const ctrl = require('./controllers/controllers')

view.renderBlogs()

document.querySelector('form button').addEventListener('submit', function (event) {
  event.preventDefault()
  const title = document.querySelector('#blogTitle')
  const content = document.querySelector('#blogContent')
  ctrl.createBlog(title, content)
  title.value = ''
  content.value = ''
  view.renderBlogs()
})
