const availableColors = ['red', 'green', 'blue']

const leftMouseButton = 1
const rightMouseButton = 3

const container = document.getElementsByClassName('box-container')[0]
const initialBox = document.getElementsByClassName('box')[0]
let boxCounter = 1

const moveHandler = (event) => {
    if (!event.altKey && !event.shiftKey && event.which === leftMouseButton) {
        const centerX = event.clientX - 75
        const centerY = event.clientY - 75
        event.target.zIndex = 5
        event.target.style.left = centerX + 'px'
        event.target.style.top = centerY + 'px'
    }
}

const changeColorHandler = (event) => {
    event.preventDefault()
    if (event.which === rightMouseButton) {
        event.target.style.backgroundColor = availableColors[Math.floor(Math.random() * availableColors.length)];
    }
}

const changeSizeHandler = (event) => {
    if (!event.altKey && event.shiftKey && event.which === leftMouseButton) {
        event.target.classList.toggle('box-large')
    }
}

const newBoxHandler = (event) => {
    if (!event.altKey && !event.shiftKey && event.which === leftMouseButton) {
        const newBox = document.createElement('div')
        newBox.classList.add('box')
        boxCounter++
        const text = document.createTextNode(boxCounter.toString())
        newBox.appendChild(text)
        container.appendChild(newBox)
        addEvents(newBox)
    }
}

const removeBoxHandler = (event) => {
    if (!event.shiftKey && event.altKey && event.which === leftMouseButton) {
        const boxNum = document.getElementsByClassName('box').length
        if (boxNum > 1) {
            event.currentTarget.remove()
        }
    }
}

const addEvents = (box) => {
    box.addEventListener('mousedown', moveHandler)
    box.addEventListener('contextmenu', changeColorHandler)
    box.addEventListener('click', changeSizeHandler)
    box.addEventListener('dblclick', newBoxHandler)
    box.addEventListener('dblclick', removeBoxHandler)
}

container.addEventListener('mousemove', moveHandler)
addEvents(initialBox)
