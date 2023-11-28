export function transitionImage(image: HTMLImageElement) {
  if (image.complete) {
    image.classList.remove('transition-opacity')
    image.classList.remove('opacity-0')
    image.classList.add('opacity-100')
  } else {
    image.addEventListener('load', () => {
      image.classList.add('opacity-100')
      image.classList.remove('opacity-0')
    })
  }
}
