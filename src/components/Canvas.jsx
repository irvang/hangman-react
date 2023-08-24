import React, { useEffect, useRef, useContext } from 'react'
import { Context } from '../Context'

export const Canvas = () => {
  const { remainingTrials } = useContext(Context)
  const canvasRef = useRef(null)

  useEffect(() => {
    drawCanvas(remainingTrials, canvasRef)
  }, [remainingTrials])

  return <canvas ref={canvasRef} className="Canvas" />
}

function drawCanvas(remainingTrials, canvasRef) {
  const canvas = canvasRef.current
  const ctx = canvas.getContext('2d')

  if (canvas.getContext) {
    ctx.strokeStyle = 'blue'
    switch (remainingTrials) {
      case 6:
        // clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        break
      case 5:
        //head
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(105, 65, 10, 0, Math.PI * 2, true) // Outer circle
        ctx.stroke()
        break
      case 4:
        //body
        ctx.beginPath()
        ctx.moveTo(105, 75)
        ctx.lineTo(105, 100)
        ctx.stroke()
        break
      case 3:
        //right arm
        ctx.beginPath()
        ctx.moveTo(105, 75)
        ctx.lineTo(125, 100)
        ctx.stroke()
        break
      case 2:
        ctx.beginPath()
        //left arm
        ctx.moveTo(105, 75)
        ctx.lineTo(85, 100)
        ctx.stroke()
        break
      case 1:
        ctx.beginPath()
        //right leg
        ctx.moveTo(105, 100)
        ctx.lineTo(130, 125)
        ctx.stroke()
        break
      case 0:
        //left leg
        ctx.beginPath()
        ctx.moveTo(105, 100)
        ctx.lineTo(80, 125)
        ctx.stroke()
        break

      default:
        break
    }

    drawPole(ctx)
  }
}

// @desc Draws pole shape
function drawPole(ctx) {
  ctx.beginPath()
  ctx.strokeStyle = 'blue'

  ctx.moveTo(40, 25)
  ctx.lineTo(40, 100)

  ctx.lineTo(10, 145)
  ctx.moveTo(40, 100)

  ctx.lineTo(70, 145)

  ctx.moveTo(40, 25)
  ctx.lineTo(105, 10)

  ctx.lineTo(105, 55)

  ctx.stroke()
}
