import React, { useRef, useEffect } from 'react'

const Whiteboard = () => {
  const canvasRef = useRef()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let drawing = false

    const start = e => {
      drawing = true
      draw(e)
    }

    const stop = () => {
      drawing = false
      ctx.beginPath()
    }

    const draw = e => {
      if (!drawing) return
      ctx.lineWidth = 2
      ctx.lineCap = 'round'
      ctx.strokeStyle = 'black'
      ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop)
    }

    canvas.addEventListener('mousedown', start)
    canvas.addEventListener('mouseup', stop)
    canvas.addEventListener('mousemove', draw)
  }, [])

  return <canvas ref={canvasRef} width={800} height={500} className="border border-gray-400 rounded mx-auto mt-5" />
}

export default Whiteboard
