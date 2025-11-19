import { useEffect, useRef } from 'react'

export default function AnimatedBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf

    const DPR = Math.min(window.devicePixelRatio || 1, 2)
    function resize() {
      canvas.width = window.innerWidth * DPR
      canvas.height = window.innerHeight * DPR
    }
    resize()
    window.addEventListener('resize', resize)

    const dots = Array.from({ length: 60 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: 1 + Math.random() * 1.5,
    }))

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // soft gradient background
      const g = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      g.addColorStop(0, 'rgba(15,23,42,0.9)')
      g.addColorStop(1, 'rgba(2,6,23,0.9)')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // glowing dots
      for (const d of dots) {
        d.x += d.vx
        d.y += d.vy
        if (d.x < 0 || d.x > canvas.width) d.vx *= -1
        if (d.y < 0 || d.y > canvas.height) d.vy *= -1

        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r * DPR, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(59,130,246,0.25)'
        ctx.shadowColor = 'rgba(59,130,246,0.5)'
        ctx.shadowBlur = 8
        ctx.fill()
      }

      // connecting lines
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const a = dots[i]
          const b = dots[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < 140 * DPR) {
            const alpha = 1 - dist / (140 * DPR)
            ctx.strokeStyle = `rgba(148,163,184,${0.12 * alpha})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas ref={canvasRef} className="fixed inset-0 -z-10 w-full h-full"/>
  )
}
