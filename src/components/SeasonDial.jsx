import React, { useMemo } from 'react'
import winterIcon from '../assets/season-winter.svg'
import springIcon from '../assets/season-spring.svg'
import summerIcon from '../assets/season-summer.svg'
import autumnIcon from '../assets/season-autumn.svg'

const SEASONS = ['winter','spring','summer','autumn']
const META = {
  winter: { de: 'Winter', color: '#60a5fa', color2: '#1e3a8a', icon: winterIcon },
  spring: { de: 'Frühling', color: '#34d399', color2: '#065f46', icon: springIcon },
  summer: { de: 'Sommer', color: '#facc15', color2: '#b45309', icon: summerIcon },
  autumn: { de: 'Herbst', color: '#f59e0b', color2: '#7c2d12', icon: autumnIcon },
}

export default function SeasonDial({ season='winter', onChange }) {
  const size = 240 // px
  const r = size/2
  const innerR = r - 4

  const rotation = useMemo(() => {
    const idx = SEASONS.indexOf(season)
    const map = [0, -90, -180, -270]
    return map[idx] ?? 0
  }, [season])

  // Build 4 wedge paths
  const buildWedge = (startDeg, endDeg) => {
    const start = (startDeg-90) * Math.PI / 180
    const end = (endDeg-90) * Math.PI / 180
    const x1 = r + innerR * Math.cos(start)
    const y1 = r + innerR * Math.sin(start)
    const x2 = r + innerR * Math.cos(end)
    const y2 = r + innerR * Math.sin(end)
    const largeArc = endDeg - startDeg > 180 ? 1 : 0
    return `M ${r} ${r} L ${x1} ${y1} A ${innerR} ${innerR} 0 ${largeArc} 1 ${x2} ${y2} Z`
  }

  const wedges = [
    { k: 'winter', start: 315, end: 45 }, // top
    { k: 'spring', start: 45, end: 135 }, // right
    { k: 'summer', start: 135, end: 225 }, // bottom
    { k: 'autumn', start: 225, end: 315 }, // left
  ]

  return (
    <div className="relative inline-block" style={{width: size, height: size + 28}}>
      {/* Arrow indicator above, pointing down to top center */}
      <div className="absolute left-1/2 -translate-x-1/2 -top-6 select-none" aria-hidden>
        <svg width="24" height="24" viewBox="0 0 24 24" className="drop-shadow" fill="none">
          <path d="M12 4 L6 10 H10 V20 H14 V10 H18 Z" fill="white" opacity="0.95" />
        </svg>
      </div>

      <div className="relative overflow-visible" style={{width: size, height: size}}>
        <svg
          viewBox={`0 0 ${size} ${size}`}
          width={size}
          height={size}
          className="overflow-visible"
        >
          {/* Outer subtle ring */}
          <circle cx={r} cy={r} r={r-1} fill="#0b1220" stroke="rgba(255,255,255,0.08)" />

          {/* Rotating plate */}
          <g style={{ transformOrigin: `${r}px ${r}px`, transform: `rotate(${rotation}deg)`, transition: 'transform 600ms cubic-bezier(.2,.8,.2,1)' }}>
            {wedges.map((w, idx) => {
              const m = META[w.k]
              const d = buildWedge(w.start, w.end)
              return (
                <g key={w.k}>
                  <path d={d} fill={`url(#grad-${w.k})`} stroke="rgba(255,255,255,0.1)" />
                </g>
              )
            })}

            {/* Icons + labels positioned for the top orientation; they rotate with the plate */}
            {SEASONS.map((k, i) => {
              const angle = i * 90 // winter 0, spring 90, etc.
              const m = META[k]
              const grpStyle = { transformOrigin: `${r}px ${r}px`, transform: `rotate(${angle}deg)` }
              const iconSize = 36
              const iconY = r - innerR + 30 // push towards top edge
              const labelY = iconY + 28
              return (
                <g key={`item-${k}`} style={grpStyle}>
                  {/* icon */}
                  <image href={m.icon} x={r - iconSize/2} y={iconY - iconSize/2} width={iconSize} height={iconSize} opacity="0.95" />
                  {/* label */}
                  <text x={r} y={labelY} textAnchor="middle" dominantBaseline="middle" fontSize="14" fill="white" fontWeight="600" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.35)'}}>
                    {m.de}
                  </text>
                </g>
              )
            })}
          </g>

          {/* Gradients for wedges */}
          <defs>
            {SEASONS.map((k) => (
              <radialGradient id={`grad-${k}`} key={k} cx="50%" cy="50%" r="70%">
                <stop offset="0%" stopColor={META[k].color} stopOpacity="0.95" />
                <stop offset="100%" stopColor={META[k].color2} stopOpacity="0.95" />
              </radialGradient>
            ))}
          </defs>

          {/* Invisible hit areas per quadrant to change season on click */}
          <g style={{ transformOrigin: `${r}px ${r}px`, transform: `rotate(${rotation}deg)` }}>
            {wedges.map((w) => (
              <path
                key={`hit-${w.k}`}
                d={buildWedge(w.start, w.end)}
                fill="transparent"
                onClick={() => onChange && onChange(w.k)}
                style={{ cursor: 'pointer' }}
              />
            ))}
          </g>

          {/* Inner ring */}
          <circle cx={r} cy={r} r={innerR} fill="transparent" stroke="rgba(255,255,255,0.12)" />
        </svg>
      </div>
    </div>
  )
}
