const ejs = require('ejs')
const ctrl = require('../controllers/controllers')

const blogList = document.querySelector('.blogList')
const blogPen = document.querySelector('.blogPen')

function renderBlogs () {
  ctrl.refreshBlogs()
    .then(response => {
      const blogData = response.data
      blogData.forEach((post, index) => {
        const listTemplate = `
        <a class="nav-link" href="#item-${index + 1}"><%= title %></a>
        `
        const postTemplate = `
        <h4 id="item-${index + 1}"><%= title %></h4>
        <p class="pb-5"><%= content %></p>
        `
        blogList.innerHTML += ejs.render(listTemplate, post)
        blogPen.innerHTML += ejs.render(postTemplate, post)
      })
    })
}

module.exports = {
  renderBlogs
}
