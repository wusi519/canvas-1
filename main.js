let canvas = document.getElementById('canvas')
let eraser = document.getElementById('eraser')
let brush = document.getElementById('brush')
let actions = document.getElementById('actions')

let context = canvas.getContext('2d')

let autoSetCanvas = (canvas) => {
  let setCanvasSize = () => {
    canvas.width = document.documentElement.clientWidth
    canvas.height = document.documentElement.clientHeight
  }
  setCanvasSize()
}
autoSetCanvas(canvas)


let listenToMouse = (canvas) => {
  let functionToggle = false
  let isTouchDevice = 'ontouchstart' in document.documentElement
  let eraserToggle = false

  let lastPainting = []

  context.fillStyle = 'black'
  context.fillStyle = 'none'
  context.lineWidth = 10
  context.lineCap = "round"


  if (isTouchDevice) {
    let x = e.touches[0].clientX
    let y = e.touches[0].clientY
    canvas.ontouchstart = (e) => {
      lastPainting = [x, y]
    }
    canvas.ontouchmove = (e) => {
      drawLine(lastPainting[0], lastPainting[1], x, y)
      lastPainting = [x, y]
    }
  } else {
    canvas.onmousedown = (e) => {
      let x = e.clientX
      let y = e.clientY
      if (eraserToggle) {
        functionToggle = true
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        functionToggle = true
        lastPainting = [x, y]
      }
    }
    canvas.onmousemove = (e) => {
      let x = e.clientX
      let y = e.clientY
      if (functionToggle) {
        if (eraserToggle) {
          context.clearRect(x - 5, y - 5, 10, 10)
        } else {
          drawLine(lastPainting[0], lastPainting[1], e.clientX, e.clientY)
          lastPainting = [e.clientX, e.clientY]
        }
      }
    }
    canvas.onmouseup = () => {
      functionToggle = false
    }
  }

  let drawLine = (x1, y1, x2, y2) => {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
  }

  eraser.onclick = () => {
    eraserToggle = true
    actions.className = 'actions checked'
  }
  brush.onclick = () => {
    eraserToggle = false
    actions.className = 'actions'
  }
}
listenToMouse(canvas)






