let canvas = document.getElementById('canvas')
let eraser = document.getElementById('eraser')
let brush = document.getElementById('brush')
let bucket = document.getElementById('bucket')
let red = document.getElementById('red')
let blue = document.getElementById('blue')
let green = document.getElementById('green')

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
    context.strokeStyle='#ed1c24'
  }
  blue.onclick = () => {
    blue.classList.add('active')
    red.classList.remove('active')
    green.classList.remove('active')
    context.strokeStyle='#4bb0dc'
  }
  green.onclick = () => {
    green.classList.add('active')
    blue.classList.remove('active')
    red.classList.remove('active')
    context.strokeStyle='#1fb288'
    }
  let lastPainting = []

  context.lineWidth = 10
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
    bucket.ontouchstart = () => {
      bucket.classList.add('checked')
    }

    bucket.ontouchend = () => {
      bucket.classList.remove('checked')
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

    bucket.onmousedown = () => {
      bucket.classList.add('checked')
    }

    bucket.onmouseup = () => {
      bucket.classList.remove('checked')
    }
  }

  let drawLine = (x1, y1, x2, y2) => {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();

  }


}
listenToMouse(canvas)






