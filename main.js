

let canvas = document.getElementById('canvas')
let eraser = document.getElementById('eraser')
let brush = document.getElementById('brush')
let clear = document.getElementById('clear')
let red = document.getElementById('red')
let blue = document.getElementById('blue')
let green = document.getElementById('green')
let thick = document.getElementById('thick')
let thin = document.getElementById('thin')

let context = canvas.getContext('2d')
let width = document.documentElement.clientWidth
let height = document.documentElement.clientHeight

let autoSetCanvas = (canvas) => {
  let setCanvasSize = () => {
    canvas.width = width
    canvas.height = height
  }
  setCanvasSize()
}
autoSetCanvas(canvas)
let lineWidth = 10


let listenToMouse = (canvas) => {
  let functionToggle = false
  let isTouchDevice = 'ontouchstart' in document.documentElement
  let eraserToggle = false

  brush.onclick = () => {
    eraserToggle = false
    brush.classList.add('active')
    eraser.classList.remove('active')
  }
  eraser.onclick = () => {
    eraserToggle = true
    eraser.classList.add('active')
    brush.classList.remove('active')
  }
  red.onclick = () => {
    red.classList.add('active')
    blue.classList.remove('active')
    green.classList.remove('active')
    context.strokeStyle = '#ed1c24'
  }
  blue.onclick = () => {
    blue.classList.add('active')
    red.classList.remove('active')
    green.classList.remove('active')
    context.strokeStyle = '#4bb0dc'
  }
  green.onclick = () => {
    green.classList.add('active')
    blue.classList.remove('active')
    red.classList.remove('active')
    context.strokeStyle = '#1fb288'
  }
  thin.onclick = () => {
    lineWidth = 10
    thin.classList.add('active')
    thick.classList.remove('active')
  }
  thick.onclick = () => {
    lineWidth = 20
    thick.classList.add('active')
    thin.classList.remove('active')
  }
  clear.onclick = () => {
    context.clearRect(0, 0, width,height)
  }
  let lastPainting = []

  context.lineCap = "round"


  let startDrawing = (x, y) => {
    if (eraserToggle) {
      functionToggle = true
      context.clearRect(x - 5, y - 5, 10, 10)
    } else {
      functionToggle = true
      lastPainting = [x, y]
    }
  }
  let drawing = (x, y) => {
    if (functionToggle) {
      if (eraserToggle) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        drawLine(lastPainting[0], lastPainting[1], x, y)
        lastPainting = [x, y]
      }
    }
  }

  if (isTouchDevice) {
    canvas.ontouchstart = (e) => {
      let x = e.touches[0].clientX
      let y = e.touches[0].clientY
      startDrawing(x, y)
    }
    canvas.ontouchmove = (e) => {
      let x = e.touches[0].clientX
      let y = e.touches[0].clientY
      drawing(x, y)
    }
    clear.ontouchstart = () => {
      clear.classList.add('checked')
    }

    clear.ontouchend = () => {
      clear.classList.remove('checked')
    }
  } else {
    canvas.onmousedown = (e) => {
      let x = e.clientX
      let y = e.clientY
      startDrawing(x, y)
    }
    canvas.onmousemove = (e) => {
      let x = e.clientX
      let y = e.clientY
      drawing(x, y)
    }
    canvas.onmouseup = () => {
      functionToggle = false
    }

    clear.onmousedown = () => {
      clear.classList.add('checked')
    }

    clear.onmouseup = () => {
      clear.classList.remove('checked')
    }
  }
  context.strokeStyle = '#ed1c24'

  let drawLine = (x1, y1, x2, y2) => {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineWidth = lineWidth
    context.stroke();
  }
}
listenToMouse(canvas)






