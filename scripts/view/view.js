const ejs = require('ejs')
const ctrl = require('../controllers/controllers')

const blogList = document.querySelector('.blogList')
const blogPen = document.querySelector('.blogPen')

// Render Functions:

function renderBlogs () {
  ctrl.refreshBlogs()
    .then(response => {
      blogList.innerHTML = ''
      blogPen.innerHTML = ''
      const blogData = response.data.data
      blogData.forEach((post, index) => {
        const listTemplate = `
        <a class="nav-link" href="#item-${index + 1}"><%= title %></a>
        `
        const postTemplate = `
        <div id="item-${index + 1}" class="<%= id %>">
          <a class="edit" href="#">Edit</a>
          <a class="delete" href="#">Delete</a>
          <h4><%= title %></h4>
          <p class="pb-5"><%= content %></p>
        </div>
        `
        blogList.innerHTML += ejs.render(listTemplate, post)
        blogPen.innerHTML += ejs.render(postTemplate, post)
        addEditListener()
        addDeleteListener()
      })
    })
}

function renderUpdateForm (blogGroup, title, content) {
  const formTemplate = `
  <form>
    <div class="form-group row">
      <label for="blogTitle" class="col-sm-2 col-form-label">Title</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" id="updateTitle" value="${title}">
      </div>
    </div>
    <div class="form-group row">
      <label for="blogContent" class="col-sm-2 col-form-label">Content</label>
      <div class="col-sm-10">
        <textarea class="form-control" id="updateContent" rows="3">${content}</textarea>
      </div>
    </div>
    <div class="form-group row justify-content-end">
      <button type="submit" id="update" class="btn btn-primary py-2">Update</button>
    </div>
  </form>
  `
  console.log(title)
  blogGroup.innerHTML += formTemplate
  const updateButton = document.querySelector('#update')
  addUpdateListener(updateButton, blogGroup)
}

function removeForm(blogGroup) {
  const form = blogGroup.querySelector('form')
  blogGroup.removeChild(form)
}

// Event Listener Functions:

function addSubmitListener() {
  document.querySelector('#submit').addEventListener('click', function(event) {
    event.preventDefault()
    const title = document.querySelector('#blogTitle').value
    const content = document.querySelector('#blogContent').value
    ctrl.createBlog(title, content)
      .then(response => {
        successMsg()
        renderBlogs()
      })
      .catch(error => {
        failureMsg()
      })
      document.querySelector('form').reset()
  })
}

function addDeleteListener () {
  const deletes = Array.from(document.querySelectorAll('.delete'))
  deletes.forEach(ele => ele.addEventListener('click', (event) => {
    event.preventDefault()
    const id = event.target.parentNode.classList[0]
    ctrl.deletePost(id)
      .then(response => renderBlogs())
  }))
}

function addEditListener () {
  const edits = Array.from(document.querySelectorAll('.edit'))
  edits.forEach(ele => ele.addEventListener('click', (event) => {
    event.preventDefault()
    const blogGroup = event.target.parentNode
    const id = event.target.parentNode.classList[0]
    const blogTitle = blogGroup.querySelector('h4').textContent
    const blogContent = blogGroup.querySelector('p').textContent
    renderUpdateForm(blogGroup, blogTitle, blogContent)
  }))
}

function addUpdateListener(button, blogGroup) {
  button.addEventListener('click', (event) => {
    event.preventDefault()
    const blogTitle = blogGroup.querySelector('form input').value
    const blogContent = blogGroup.querySelector('form textarea').value
    const id = Array.from(blogGroup.classList)[0]
    ctrl.updatePost(id, blogTitle, blogContent)
      .then(response => renderBlogs())
    removeForm(blogGroup)
  })
}

// Form Error Messages:

function successMsg () {
  const errPara = document.querySelector('.errPara')
  errPara.innerHTML = "Success"
  setTimeout(() => {
    errPara.style.opacity = 1
    setTimeout(() => {
      errPara.style.opacity = 0
    }, 2000)
  }, 500)
}

function failureMsg () {
  const errPara = document.querySelector('.errPara')
  errPara.innerHTML = "Not Quite"
  setTimeout(() => {
    errPara.style.opacity = 1
    setTimeout(() => {
      errPara.style.opacity = 0
    }, 2000)
  }, 500)
}

module.exports = {
  renderBlogs,
  addSubmitListener
}
