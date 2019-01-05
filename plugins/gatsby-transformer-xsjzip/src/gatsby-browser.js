exports.onRouteUpdate = () => {
  const imageWrappers = document.querySelectorAll(`.story_image`)

  // https://css-tricks.com/snippets/javascript/loop-queryselectorall-matches/
  // for cross-browser looping through NodeList without polyfills
  for (let i = 0; i < imageWrappers.length; i++) {
    const imageWrapper = imageWrappers[i]

    const backgroundElement = imageWrapper.querySelector(
      `.background_image`
    )
    const imageElement = imageWrapper.querySelector(`.front_image`)

    const onImageLoad = () => {
      backgroundElement.style.transition = `opacity 0.5s 0.5s`
      backgroundElement.style.opacity = 0
      imageElement.style.transition = `opacity 0.5s`
      imageElement.style.opacity = 1
      imageElement.classList.add('loaded')
      imageElement.removeEventListener(`load`, onImageLoad)
    }
    if (imageElement){

      if (imageElement.complete) {
        backgroundElement.style.opacity = 0
      } else {
        imageElement.style.opacity = 0
        imageElement.addEventListener(`load`, onImageLoad)
      }
    }
  }
}

exports.onInitialClientRender = () => {
  $(document).on('click', '.story_block_image .gif_player', (e)=> {
    const target = e.currentTarget
    const img = target.querySelector('img')
    if (img.classList.contains('loaded')){
      if (target.classList.contains('playing')) {
        target.classList.remove('playing')
        const still = img.dataset.still
        img.setAttribute('src', still)
      } else {
        target.classList.add('playing')
        const src = img.dataset.src
        img.setAttribute('src', src)
      }
    }
  })
}
