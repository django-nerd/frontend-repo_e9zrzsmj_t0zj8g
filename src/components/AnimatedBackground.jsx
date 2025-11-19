import { useEffect, useRef } from 'react'

function getSeason(date = new Date()) {
  const m = date.getMonth() + 1
  if (m === 12 || m <= 2) return 'winter'
  if (m >= 3 && m <= 5) return 'spring'
  if (m >= 6 && m <= 8) return 'summer'
  return 'autumn'
}

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

    const season = getSeason()

    // Particles per season
    let particles = []
    const W = () => canvas.width
    const H = () => canvas.height

    function rand(min, max) { return Math.random() * (max - min) + min }

    function initParticles() {
      if (season === 'winter') {
        const count = Math.floor(120 * (W() / 1440))
        particles = Array.from({ length: count }).map(() => ({
          x: Math.random() * W(),
          y: Math.random() * H(),
          r: rand(1, 3) * DPR,
          vy: rand(0.3, 0.9) * DPR,
          vx: rand(-0.3, 0.3) * DPR,
          angle: Math.random() * Math.PI * 2,
          swing: rand(0.2, 0.6) * DPR,
        }))
      } else if (season === 'autumn') {
        const colors = ['#f97316', '#ea580c', '#d97706', '#b45309']
        const count = Math.floor(60 * (W() / 1440))
        particles = Array.from({ length: count }).map(() => ({
          x: Math.random() * W(),
          y: Math.random() * H(),
          size: rand(6, 12) * DPR,
          vy: rand(0.5, 1.2) * DPR,
          vx: rand(-0.4, 0.4) * DPR,
          rot: rand(0, Math.PI * 2),
          rotSpeed: rand(-0.02, 0.02),
          color: colors[Math.floor(Math.random() * colors.length)],
        }))
      } else if (season === 'spring') {
        const colors = ['#fbcfe8', '#f9a8d4', '#f472b6', '#fda4af']
        const count = Math.floor(80 * (W() / 1440))
        particles = Array.from({ length: count }).map(() => ({
          x: Math.random() * W(),
          y: Math.random() * H(),
          w: rand(6, 12) * DPR,
          h: rand(3, 6) * DPR,
          vy: rand(0.2, 0.7) * DPR,
          vx: rand(-0.3, 0.3) * DPR,
          rot: rand(0, Math.PI * 2),
          rotSpeed: rand(-0.015, 0.015),
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: rand(0.6, 0.95),
        }))
      } else {
        // summer: fireflies
        const count = Math.floor(70 * (W() / 1440))
        particles = Array.from({ length: count }).map(() => ({
          x: Math.random() * W(),
          y: Math.random() * H(),
          vx: rand(-0.25, 0.25) * DPR,
          vy: rand(-0.25, 0.25) * DPR,
          r: rand(1.2, 2.2) * DPR,
          glow: rand(0.5, 1),
          t: Math.random() * 1000,
        }))
      }
    }

    initParticles()

    function drawBackground() {
      const w = W(), h = H()
      const g = ctx.createLinearGradient(0, 0, 0, h)
      if (season === 'winter') {
        g.addColorStop(0, 'rgba(15,23,42,1)') // slate-900
        g.addColorStop(1, 'rgba(2,6,23,1)') // slate-950
      } else if (season === 'autumn') {
        g.addColorStop(0, 'rgba(30,27,75,1)') // indigo-950
        g.addColorStop(1, 'rgba(88,28,135,1)') // purple-900
      } else if (season === 'spring') {
        g.addColorStop(0, 'rgba(12,74,110,1)') // sky-900
        g.addColorStop(1, 'rgba(8,47,73,1)') // sky-950
      } else {
        g.addColorStop(0, 'rgba(7,89,133,1)') // cyan-800
        g.addColorStop(1, 'rgba(2,44,34,1)') // emerald-950
      }
      ctx.fillStyle = g
      ctx.fillRect(0, 0, w, h)
    }

    function draw() {
      ctx.clearRect(0, 0, W(), H())
      drawBackground()

      if (season === 'winter') {
        // light sparkle stars in the back
        ctx.fillStyle = 'rgba(203,213,225,0.08)'
        for (let i = 0; i < 40; i++) {
          const x = (i * 97) % W()
          const y = (i * 53) % H()
          ctx.beginPath(); ctx.arc(x, y, 1 * DPR, 0, Math.PI * 2); ctx.fill()
        }
        // snowflakes
        for (const p of particles) {
          p.angle += 0.01
          p.x += p.vx + Math.cos(p.angle) * p.swing * 0.2
          p.y += p.vy
          if (p.y > H()) { p.y = -10; p.x = Math.random() * W() }
          if (p.x < -10) p.x = W() + 10
          if (p.x > W() + 10) p.x = -10
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(255,255,255,0.9)'
          ctx.shadowColor = 'rgba(255,255,255,0.7)'
          ctx.shadowBlur = 6
          ctx.fill()
        }
      } else if (season === 'autumn') {
        for (const p of particles) {
          p.rot += p.rotSpeed
          p.x += p.vx + Math.sin(p.rot) * 0.2
          p.y += p.vy
          if (p.y > H() + 20) { p.y = -20; p.x = Math.random() * W() }
          if (p.x < -30) p.x = W() + 30
          if (p.x > W() + 30) p.x = -30
          ctx.save()
          ctx.translate(p.x, p.y)
          ctx.rotate(p.rot)
          ctx.fillStyle = p.color
          // simple leaf shape: diamond
          ctx.beginPath()
          ctx.moveTo(0, -p.size)
          ctx.lineTo(p.size * 0.7, 0)
          ctx.lineTo(0, p.size)
          ctx.lineTo(-p.size * 0.7, 0)
          ctx.closePath()
          ctx.globalAlpha = 0.9
          ctx.shadowColor = 'rgba(0,0,0,0.2)'
          ctx.shadowBlur = 6
          ctx.fill()
          ctx.restore()
        }
      } else if (season === 'spring') {
        for (const p of particles) {
          p.rot += p.rotSpeed
          p.x += p.vx + Math.cos(p.rot) * 0.15
          p.y += p.vy
          if (p.y > H() + 10) { p.y = -10; p.x = Math.random() * W() }
          if (p.x < -20) p.x = W() + 20
          if (p.x > W() + 20) p.x = -20
          ctx.save()
          ctx.translate(p.x, p.y)
          ctx.rotate(p.rot)
          const grd = ctx.createLinearGradient(-p.w, -p.h, p.w, p.h)
          grd.addColorStop(0, `${p.color}`)
          grd.addColorStop(1, 'rgba(255,255,255,0.8)')
          ctx.fillStyle = grd
          ctx.globalAlpha = p.alpha
          // petal (oval)
          ctx.beginPath()
          ctx.ellipse(0, 0, p.w, p.h, 0, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        }
      } else {
        // summer fireflies + subtle lines
        for (const p of particles) {
          p.x += p.vx
          p.y += p.vy
          if (p.x < 0 || p.x > W()) p.vx *= -1
          if (p.y < 0 || p.y > H()) p.vy *= -1
          p.t += 0.02
          const a = 0.4 + Math.sin(p.t) * 0.4
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(250, 204, 21, ${a})` // amber
          ctx.shadowColor = 'rgba(250, 204, 21, 0.8)'
          ctx.shadowBlur = 12
          ctx.fill()
        }
        // soft diagonal beams
        ctx.save()
        ctx.globalCompositeOperation = 'lighter'
        const beam = ctx.createLinearGradient(0, 0, W(), H())
        beam.addColorStop(0, 'rgba(255,255,255,0.02)')
        beam.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.fillStyle = beam
        ctx.fillRect(0, 0, W(), H())
        ctx.restore()
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
