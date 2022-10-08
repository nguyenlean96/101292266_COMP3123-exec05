module.exports = (title, message) => {
    return `<div class="alert alert-success m-5" role="alert">
      <h4 class="alert-heading">${title}</h4>
      <hr>
      <p>${message}</p>
  </div>`
};