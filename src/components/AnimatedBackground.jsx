import { useEffect, useRef } from 'react'

function getSeason(date = new Date()) {
  const m = date.getMonth() + 1
  if (m === 12 || m <= 2) return 'winter'
  if (m >= 3 && m <= 5) return 'spring'
  if (m >= 6 && m <= 8) return 'summer'
  return 'autumn'
}

export default function AnimatedBackground({ season: controlledSeason }) {
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

    const season = controlledSeason || getSeason()

    // Particles per season
    let particles = []
    const W = () => canvas.width
    const H = () => canvas.height

    function rand(min, max) { return Math.random() * (max - min) + min }

    function initParticles() {
      if (season === 'winter') {
        const count = Math.floor(140 * (W() / 1440))
        particles = Array.from({ length: count }).map(() => ({
          x: Math.random() * W(),
          y: Math.random() * H(),
          r: rand(0.8, 2.4) * DPR,
          vy: rand(0.25, 0.8) * DPR,
          vx: rand(-0.25, 0.25) * DPR,
          angle: Math.random() * Math.PI * 2,
          swing: rand(0.2, 0.5) * DPR,
          alpha: rand(0.6, 0.95),
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
        const colors = [
          '#fbcfe8', '#f9a8d4', '#f472b6', '#fda4af',
          '#a7f3d0', '#86efac', '#bef264', '#fde68a',
          '#93c5fd', '#c4b5fd', '#e9d5ff'
        ]
        const count = Math.floor(120 * (W() / 1440))
        particles = Array.from({ length: count }).map(() => ({
          x: Math.random() * W(),
          y: Math.random() * H(),
          w: rand(7, 14) * DPR,
          h: rand(3, 7) * DPR,
          vy: rand(0.25, 0.8) * DPR,
          vx: rand(-0.35, 0.35) * DPR,
          rot: rand(0, Math.PI * 2),
          rotSpeed: rand(-0.02, 0.02),
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: rand(0.7, 1),
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
        // frostier, icier blues
        g.addColorStop(0, 'rgba(30, 58, 138, 1)') // blue-800
        g.addColorStop(1, 'rgba(15, 23, 42, 1)') // slate-900
      } else if (season === 'autumn') {
        g.addColorStop(0, 'rgba(30,27,75,1)') // indigo-950
        g.addColorStop(1, 'rgba(88,28,135,1)') // purple-900
      } else if (season === 'spring') {
        // brighter, colorful spring gradient
        g.addColorStop(0, 'rgba(16,185,129,1)')   // emerald-500
        g.addColorStop(0.5, 'rgba(56,189,248,1)') // sky-400
        g.addColorStop(1, 'rgba(244,114,182,1)')  // pink-400
      } else {
        g.addColorStop(0, 'rgba(7,89,133,1)') // cyan-800
        g.addColorStop(1, 'rgba(2,44,34,1)') // emerald-950
      }
      ctx.fillStyle = g
      ctx.fillRect(0, 0, w, h)

      if (season === 'winter') {
        // subtle frosty vignette
        const radial = ctx.createRadialGradient(w/2, h/2, Math.min(w,h)*0.2, w/2, h/2, Math.max(w,h)*0.7)
        radial.addColorStop(0, 'rgba(255,255,255,0)')
        radial.addColorStop(1, 'rgba(148,163,184,0.15)')
        ctx.fillStyle = radial
        ctx.fillRect(0, 0, w, h)

        // cold haze
        const haze = ctx.createLinearGradient(0, 0, 0, h)
        haze.addColorStop(0, 'rgba(255,255,255,0.08)')
        haze.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.fillStyle = haze
        ctx.fillRect(0, 0, w, h)
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W(), H())
      drawBackground()

      if (season === 'winter') {
        // shimmering snow
        for (const p of particles) {
          p.angle += 0.01
          p.x += p.vx + Math.cos(p.angle) * p.swing * 0.2
          p.y += p.vy
          if (p.y > H()) { p.y = -10; p.x = Math.random() * W() }
          if (p.x < -10) p.x = W() + 10
          if (p.x > W() + 10) p.x = -10
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(240, 249, 255, ${p.alpha})` // icy white-blue
          ctx.shadowColor = 'rgba(191, 219, 254, 0.8)'
          ctx.shadowBlur = 8
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
          grd.addColorStop(1, 'rgba(255,255,255,0.9)')
          ctx.fillStyle = grd
          ctx.globalAlpha = p.alpha
          ctx.beginPath()
          ctx.ellipse(0, 0, p.w, p.h, 0, 0, Math.PI * 2)
          ctx.shadowColor = 'rgba(255,255,255,0.35)'
          ctx.shadowBlur = 6
          ctx.fill()
          ctx.restore()
        }
      } else {
        for (const p of particles) {
          p.x += p.vx
          p.y += p.vy
          if (p.x < 0 || p.x > W()) p.vx *= -1
          if (p.y < 0 || p.y > H()) p.vy *= -1
          p.t += 0.02
          const a = 0.4 + Math.sin(p.t) * 0.4
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(250, 204, 21, ${a})`
          ctx.shadowColor = 'rgba(250, 204, 21, 0.8)'
          ctx.shadowBlur = 12
          ctx.fill()
        }
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
  }, [controlledSeason])

  return (
    <canvas ref={canvasRef} className="fixed inset-0 -z-10 w-full h-full"/>
  )
}
