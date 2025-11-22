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

    // Lower DPR cap to reduce fill/blur cost on HiDPI screens
    const DPR = Math.min(window.devicePixelRatio || 1, 1.25)
    function resize() {
      canvas.width = Math.floor(window.innerWidth * DPR)
      canvas.height = Math.floor(window.innerHeight * DPR)
    }
    resize()
    window.addEventListener('resize', resize)

    const season = controlledSeason || getSeason()

    // Particles per season (halved) + slower motion
    let particles = []
    const W = () => canvas.width
    const H = () => canvas.height

    function rand(min, max) { return Math.random() * (max - min) + min }

    function hexToRgba(hex, a = 1) {
      const v = hex.replace('#', '')
      const bigint = parseInt(v, 16)
      const r = (bigint >> 16) & 255
      const g = (bigint >> 8) & 255
      const b = bigint & 255
      return `rgba(${r}, ${g}, ${b}, ${a})`
    }

    function initParticles() {
      if (season === 'winter') {
        const count = Math.floor(70 * (W() / 1440))
        particles = Array.from({ length: count }).map(() => ({
          x: Math.random() * W(),
          y: Math.random() * H(),
          r: rand(0.8, 2.0) * DPR,
          vy: rand(0.15, 0.45) * DPR,
          vx: rand(-0.18, 0.18) * DPR,
          angle: Math.random() * Math.PI * 2,
          swing: rand(0.12, 0.35) * DPR,
          alpha: rand(0.55, 0.85),
        }))
      } else if (season === 'autumn') {
        const colors = ['#f97316', '#ea580c', '#d97706', '#b45309']
        const count = Math.floor(30 * (W() / 1440))
        particles = Array.from({ length: count }).map(() => ({
          x: Math.random() * W(),
          y: Math.random() * H(),
          size: rand(6, 12) * DPR,
          vy: rand(0.35, 0.75) * DPR,
          vx: rand(-0.28, 0.28) * DPR,
          rot: rand(0, Math.PI * 2),
          rotSpeed: rand(-0.012, 0.012),
          color: colors[Math.floor(Math.random() * colors.length)],
        }))
      } else if (season === 'spring') {
        const colors = [
          '#fce7f3', '#fbcfe8', '#fae8ff', '#e9d5ff',
          '#d1fae5', '#bbf7d0', '#fef9c3', '#fde68a',
          '#e0f2fe', '#bfdbfe', '#c7d2fe'
        ]
        const count = Math.floor(60 * (W() / 1440))
        particles = Array.from({ length: count }).map(() => ({
          x: Math.random() * W(),
          y: Math.random() * H(),
          w: rand(7, 14) * DPR,
          h: rand(3, 7) * DPR,
          vy: rand(0.12, 0.35) * DPR,
          vx: rand(-0.2, 0.2) * DPR,
          rot: rand(0, Math.PI * 2),
          rotSpeed: rand(-0.01, 0.01),
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: rand(0.6, 0.8),
          sheen: rand(0.18, 0.32),
        }))
      } else if (season === 'summer') {
        // summer: fireflies (halved + slower flicker)
        const count = Math.floor(35 * (W() / 1440))
        particles = Array.from({ length: count }).map(() => ({
          x: Math.random() * W(),
          y: Math.random() * H(),
          vx: rand(-0.18, 0.18) * DPR,
          vy: rand(-0.18, 0.18) * DPR,
          r: rand(1.1, 2.0) * DPR,
          glow: rand(0.5, 1),
          t: Math.random() * 1000,
        }))
      } else {
        particles = []
      }
    }

    initParticles()

    function drawBackground() {
      const w = W(), h = H()
      const g = ctx.createLinearGradient(0, 0, 0, h)
      if (season === 'winter') {
        g.addColorStop(0, 'rgba(15, 23, 42, 1)')
        g.addColorStop(1, 'rgba(2, 6, 23, 1)')
      } else if (season === 'autumn') {
        g.addColorStop(0, 'rgba(30,27,75,1)')
        g.addColorStop(1, 'rgba(88,28,135,1)')
      } else if (season === 'spring') {
        g.addColorStop(0, 'rgba(2, 6, 23, 1)')
        g.addColorStop(0.6, 'rgba(15, 23, 42, 1)')
        g.addColorStop(1, 'rgba(20, 83, 45, 1)')
      } else if (season === 'summer') {
        g.addColorStop(0, 'rgba(7,89,133,1)')
        g.addColorStop(1, 'rgba(2,44,34,1)')
      } else {
        g.addColorStop(0, 'rgba(2, 6, 23, 1)')
        g.addColorStop(1, 'rgba(15, 23, 42, 1)')
      }
      ctx.fillStyle = g
      ctx.fillRect(0, 0, w, h)

      if (season === 'winter') {
        const radial = ctx.createRadialGradient(w/2, h/2, Math.min(w,h)*0.2, w/2, h/2, Math.max(w,h)*0.7)
        radial.addColorStop(0, 'rgba(255,255,255,0)')
        radial.addColorStop(1, 'rgba(148,163,184,0.12)')
        ctx.fillStyle = radial
        ctx.fillRect(0, 0, w, h)

        const haze = ctx.createLinearGradient(0, 0, 0, h)
        haze.addColorStop(0, 'rgba(255,255,255,0.06)')
        haze.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.fillStyle = haze
        ctx.fillRect(0, 0, w, h)
      }
    }

    let frame = 0 // render every other frame to reduce CPU/GPU

    function draw() {
      // Pause when tab is hidden to save resources
      if (document.visibilityState === 'hidden') {
        raf = requestAnimationFrame(draw)
        return
      }

      frame = (frame + 1) % 2
      if (frame !== 0) {
        raf = requestAnimationFrame(draw)
        return
      }

      ctx.clearRect(0, 0, W(), H())
      drawBackground()

      if (season === 'winter') {
        for (const p of particles) {
          p.angle += 0.007
          p.x += p.vx + Math.cos(p.angle) * p.swing * 0.18
          p.y += p.vy
          if (p.y > H()) { p.y = -10; p.x = Math.random() * W() }
          if (p.x < -10) p.x = W() + 10
          if (p.x > W() + 10) p.x = -10
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(240, 249, 255, ${p.alpha})`
          ctx.shadowColor = 'rgba(191, 219, 254, 0.55)'
          ctx.shadowBlur = 6
          ctx.fill()
        }
      } else if (season === 'autumn') {
        for (const p of particles) {
          p.rot += p.rotSpeed
          p.x += p.vx + Math.sin(p.rot) * 0.15
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
          ctx.globalAlpha = 0.85
          ctx.shadowColor = 'rgba(0,0,0,0.18)'
          ctx.shadowBlur = 5
          ctx.fill()
          ctx.restore()
        }
      } else if (season === 'spring') {
        for (const p of particles) {
          p.rot += p.rotSpeed
          p.x += p.vx + Math.cos(p.rot) * 0.12
          p.y += p.vy
          if (p.y > H() + 10) { p.y = -10; p.x = Math.random() * W() }
          if (p.x < -20) p.x = W() + 20
          if (p.x > W() + 20) p.x = -20
          ctx.save()
          ctx.translate(p.x, p.y)
          ctx.rotate(p.rot)
          const grd = ctx.createLinearGradient(-p.w, -p.h, p.w, p.h)
          grd.addColorStop(0, `${p.color}`)
          grd.addColorStop(1, hexToRgba(p.color, 0.3))
          ctx.fillStyle = grd
          ctx.globalAlpha = p.alpha
          ctx.beginPath()
          ctx.ellipse(0, 0, p.w, p.h, 0, 0, Math.PI * 2)
          ctx.shadowColor = 'rgba(255,255,255,0.16)'
          ctx.shadowBlur = 2
          ctx.fill()
          ctx.restore()
        }
      } else if (season === 'summer') {
        for (const p of particles) {
          p.x += p.vx
          p.y += p.vy
          if (p.x < 0 || p.x > W()) p.vx *= -1
          if (p.y < 0 || p.y > H()) p.vy *= -1
          p.t += 0.012
          const a = 0.35 + Math.sin(p.t) * 0.35
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(250, 204, 21, ${a})`
          ctx.shadowColor = 'rgba(250, 204, 21, 0.7)'
          ctx.shadowBlur = 10
          ctx.fill()
        }
        ctx.save()
        ctx.globalCompositeOperation = 'lighter'
        const beam = ctx.createLinearGradient(0, 0, W(), H())
        beam.addColorStop(0, 'rgba(255,255,255,0.016)')
        beam.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.fillStyle = beam
        ctx.fillRect(0, 0, W(), H())
        ctx.restore()
      } else {
        // static
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
