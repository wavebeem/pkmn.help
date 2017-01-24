function preload(images) {
  images.forEach(img => {
    document.createElement("img").src = img
  })
}

module.exports = preload
