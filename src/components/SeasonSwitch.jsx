import React, { useMemo, useRef, useState } from 'react'

const SEASONS = ['winter', 'spring', 'summer', 'autumn']

const DE = {
  winter: 'Winter',
  spring: 'Frühling',
  summer: 'Sommer',
  autumn: 'Herbst',
}

import winterIcon from '../assets/season-winter.svg'
import springIcon from '../assets/season-spring.svg'
import summerIcon from '../assets/season-summer.svg'
import autumnIcon from '../assets/season-autumn.svg'

const ICONS = {
  winter: winterIcon,
  spring: springIcon,
  summer: summerIcon,
  autumn: autumnIcon,
}

export default function SeasonSwitch({ season, onChange }) {
  const wrapperRef = useRef(null)
  const [hover, setHover] = useState(false)
  const [mxy, setMxy] = useState({ x: 0, y: 0 }) // normalized -1..1 relative to center

  const handleMove = (e) => {
    const el = wrapperRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const x = ((e.clientX - cx) / (rect.width / 2))
    const y = ((e.clientY - cy) / (rect.height / 2))
    const clamped = {
      x: Math.max(-1, Math.min(1, x)),
      y: Math.max(-1, Math.min(1, y)),
    }
    setMxy(clamped)
  }

  const step = 360 / SEASONS.length
  const radius = hover ? 76 : 56 // expand on hover

  const ringTransform = {
    transform: `rotateX(${(-mxy.y * 8).toFixed(2)}deg) rotateY(${(mxy.x * 8).toFixed(2)}deg)`
  }

  return (
    <div
      ref={wrapperRef}
      className="relative inline-block w-[220px] h-[220px] select-none"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setMxy({ x: 0, y: 0 }) }}
      onMouseMove={handleMove}
      role="group"
      aria-label={DE[season]}
    >
      {/* Glow backdrop that follows the mouse */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-500"
        style={{
          width: hover ? 200 : 120,
          height: hover ? 200 : 120,
          filter: 'blur(28px)',
          opacity: hover ? 0.35 : 0.18,
          background: `radial-gradient(120px 120px at calc(50% + ${mxy.x * 20}px) calc(50% + ${mxy.y * 20}px), rgba(34,211,238,0.65), rgba(34,211,238,0.05))`,
          borderRadius: '9999px',
        }}
      />

      {/* 3D reactive plate */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] rounded-full border border-cyan-300/30 bg-white/[0.02] shadow-[inset_0_0_30px_rgba(34,211,238,0.12),0_0_30px_rgba(34,211,238,0.18)] [transform-style:preserve-3d] transition-transform duration-500 ease-out"
        style={ringTransform}
      >
        {/* Center button */}
        <button
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center text-slate-900 shadow-[0_0_0_1px_rgba(255,255,255,0.5)] ring-1 ring-cyan-200/60 bg-gradient-to-b from-cyan-300/90 to-cyan-400/90 transition-all duration-400 ${hover ? 'w-16 h-16' : 'w-14 h-14'}`}
          title={DE[season]}
          aria-label={DE[season]}
        >
          <img src={ICONS[season]} alt="" className="w-7 h-7" />
        </button>

        {/* Ring nodes */}
        {SEASONS.map((s, idx) => {
          const angle = (idx * step - 90) * Math.PI / 180
          const bias = hover ? 8 : 4
          const mx = mxy.x * bias
          const my = mxy.y * bias
          const x = Math.cos(angle) * radius + mx
          const y = Math.sin(angle) * radius + my
          const active = s === season
          const delay = `${idx * 60}ms`
          return (
            <button
              key={s}
              onClick={() => onChange(s)}
              className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all ease-out border backdrop-blur-sm ${hover ? 'opacity-100' : 'opacity-80'} ${active ? 'w-12 h-12 bg-gradient-to-b from-cyan-300 to-cyan-400 text-slate-900 border-white/60 shadow-[0_6px_24px_rgba(34,211,238,0.55)]' : 'w-10 h-10 bg-cyan-300/10 text-cyan-100 border-cyan-200/40 hover:bg-cyan-300/20 shadow-[0_4px_18px_rgba(34,211,238,0.35)]'}`}
              style={{
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                transitionProperty: 'transform, opacity, box-shadow, background, border-color',
                transitionDuration: hover ? '500ms' : '350ms',
                transitionDelay: delay,
              }}
              aria-pressed={active}
              aria-label={DE[s]}
              title={DE[s]}
            >
              <img src={ICONS[s]} alt="" className="w-5 h-5" />
            </button>
          )
        })}
      </div>

      {/* Label that subtly tracks the mouse */}
      <div
        className={`absolute left-1/2 top-[calc(50%+70px)] -translate-x-1/2 text-sm font-semibold text-slate-900 rounded-full px-3 py-1 shadow-[0_0_0_1px_rgba(255,255,255,0.5)] ring-1 ring-cyan-200/60 bg-gradient-to-b from-cyan-300/90 to-cyan-400/90 transition-all duration-400 ${hover ? 'opacity-100' : 'opacity-0'}`}
        style={{ transform: `translate(calc(-50% + ${mxy.x * 6}px), calc(${mxy.y * 4}px))` }}
      >
        {DE[season]}
      </div>
    </div>
  )
}
