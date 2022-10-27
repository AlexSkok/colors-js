const cols = document.querySelectorAll('.col')

document.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    setRandomColors()
  }
})
document.addEventListener('click', (event) => {
  const type = event.target.dataset.type

  if (type === 'lock') {
    event.preventDefault()
    const node =
      event.target.tagName.toLowerCase() === 'i'
        ? event.target
        : event.target.children[0]
    node.classList.toggle('fa-lock-open')
    node.classList.toggle('fa-lock')
  } else if (type === 'copy') {
    copyOnClick(event.target.textContent)
  }
})

function genRandomColor() {
  const hexCodes = '0123456789ABCDEF'
  let color = ''
  for (let i = 0; i < 6; i++) {
    color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
  }
  return '#' + color
}

function setTextColor(text, color) {
  const luminance = chroma(color).luminance()
  if (luminance > 0.3) {
    text.style.color = 'black'
  } else text.style.color = 'white'
}
function setRandomColors() {
  const colors = []
  cols.forEach((col) => {
    const isLocked = col.querySelector('i').classList.contains('fa-lock')
    const color = genRandomColor()
    if (isLocked) {
      return
    }
    const text = col.querySelector('h1')
    const button = col.querySelector('button')
    text.textContent = color
    col.style.backgroundColor = color

    setTextColor(text, color)
    setTextColor(button, color)
  })
}
function copyOnClick(text) {
  return navigator.clipboard.writeText(text)
}
function updateColorsHash(colors = []) {
  document.location.hash = colors.toString()
}

setRandomColors()
