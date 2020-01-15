let memesArray = JSON.parse(localStorage.getItem('memes')) || [];
window.addEventListener('DOMContentLoaded', () => {
  const memes = document.querySelector('.memes')
  if(memesArray.length !== 0) {
    for(meme of memesArray) {
      const item = document.createElement('div')  
      item.classList.add('memeContainer')
      item.setAttribute('data-key', meme.id)
      item.innerHTML = `
        <p class="top">${meme.top}</p>
        <img src="${meme.image}" class="image" />
        <p class="bottom">${meme.bottom}</p>
        <button class="deleteButton">Delete</button>
      `
      memes.append(item)
    }
  }
})

const form = document.querySelector('.memeForm')

const addMeme = (imageInput, topText, bottomText) => {
  const memes = document.querySelector('.memes')
  const meme = {
    id: Date.now(),
    image: imageInput,
    top: topText,
    bottom: bottomText
  }
  memesArray.push(meme)
  localStorage.setItem('memes', JSON.stringify(memesArray))
  const item = document.createElement('div')
  item.classList.add("memeContainer")
  item.setAttribute('data-key', meme.id)
  item.innerHTML = `
    <p class="top">${meme.top}</p>
    <img src="${meme.image}" class="image" />
    <p class="bottom">${meme.bottom}</p>
    <button class="deleteButton">Delete</button>
  `
  memes.append(item)
}

form.addEventListener('submit', (event) => {
  event.preventDefault()
  let image = document.getElementById('imageURL')
  let top = document.getElementById('top')
  let bottom = document.getElementById('bottom')

  if(image.value !== '') {
    addMeme(image.value, top.value, bottom.value)
    image.value = ''
  }
})

const memes = document.querySelector('.memes')
memes.addEventListener('click', (event) => {
  if(event.target.classList.contains('deleteButton')) {
    const memeKey = event.target.parentElement.dataset.key
    deleteMeme(memeKey)
  }
})

const deleteMeme = (key) => {
  memesArray = memesArray.filter(item => item.id !== Number(key))
  localStorage.setItem('memes', JSON.stringify(memesArray))
  const item = document.querySelector(`[data-key='${key}']`)
  item.remove()
}