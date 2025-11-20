import React, { useMemo } from 'react'

const SEASONS = ['winter','spring','summer','autumn']
const META = {
  winter: { de: 'Winter', color: '#60a5fa', color2: '#1e3a8a', emoji: '❄️' },
  spring: { de: 'Frühling', color: '#34d399', color2: '#065f46', emoji: '🌸' },
  summer: { de: 'Sommer', color: '#facc15', color2: '#b45309', emoji: '☀️' },
  autumn: { de: 'Herbst', color: '#f59e0b', color2: '#7c2d12', emoji: '🍂' },
}

export default function SeasonDial({ season='winter', onChange }) {
  const size = 180 // px (reduced)
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

  const handleActivate = (k) => {
    if (onChange) onChange(k)
  }

  const onKey = (k) => (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleActivate(k)
    }
  }

  return (
    <div className="relative inline-block" style={{width: size, height: size, pointerEvents: 'auto'}}>
      <div className="relative overflow-visible" style={{width: size, height: size, pointerEvents: 'auto'}}>
        <svg
          viewBox={`0 0 ${size} ${size}`}
          width={size}
          height={size}
          className="overflow-visible"
          style={{ pointerEvents: 'auto' }}
        >
          {/* Outer subtle ring (non-interactive) */}
          <circle cx={r} cy={r} r={r-1} fill="#0b1220" stroke="rgba(255,255,255,0.08)" pointerEvents="none" />

          {/* Rotating plate */}
          <g style={{ transformOrigin: `${r}px ${r}px`, transform: `rotate(${rotation}deg)`, transition: 'transform 600ms cubic-bezier(.2,.8,.2,1)' }}>
            {wedges.map((w) => {
              const d = buildWedge(w.start, w.end)
              const active = w.k === season
              return (
                <g key={w.k}
                   onClick={() => handleActivate(w.k)}
                   role="button"
                   tabIndex={0}
                   onKeyDown={onKey(w.k)}
                   aria-pressed={active}
                   className="focus:outline-none"
                   style={{ cursor: 'pointer', pointerEvents: 'auto' }}>
                  <path
                    d={d}
                    fill={`url(#grad-${w.k})`}
                    stroke={active ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.12)'}
                    strokeWidth={active ? 1.5 : 1}
                    filter={active ? 'url(#glow)' : undefined}
                    style={{ cursor: 'pointer', transition: 'filter 200ms, opacity 200ms, transform 200ms' }}
                    opacity={active ? 1 : 0.9}
                  />
                </g>
              )
            })}

            {/* Emojis + labels positioned for the top orientation; they rotate with the plate */}
            {SEASONS.map((k, i) => {
              const angle = i * 90 // winter 0, spring 90, etc.
              const m = META[k]
              const grpStyle = { transformOrigin: `${r}px ${r}px`, transform: `rotate(${angle}deg)`, cursor: 'pointer', pointerEvents: 'auto' }
              const emojiSize = 22
              const iconY = r - innerR + 26 // push towards top edge
              const labelY = iconY + 22
              const active = k === season
              return (
                <g
                  key={`item-${k}`}
                  style={grpStyle}
                  onClick={() => handleActivate(k)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={onKey(k)}
                  aria-pressed={active}
                >
                  {/* emoji */}
                  <text
                    x={r}
                    y={iconY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={emojiSize}
                    style={{ cursor: 'pointer' }}
                    className={`${active ? '' : 'transition-transform duration-150 ease-out'} ${active ? '' : 'hover:scale-110'}`}
                  >
                    {m.emoji}
                  </text>
                  {/* label */}
                  <text
                    x={r}
                    y={labelY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="12"
                    fill={active ? 'white' : 'rgba(255,255,255,0.9)'}
                    fontWeight={active ? '800' : '600'}
                    style={{ textShadow: active ? '0 2px 6px rgba(0,0,0,0.45)' : '0 1px 2px rgba(0,0,0,0.35)', cursor: 'pointer' }}
                    className={active ? '' : 'transition-opacity duration-150 ease-out hover:opacity-100 opacity-90'}
                  >
                    {m.de}
                  </text>
                </g>
              )
            })}
          </g>

          {/* Gradients and filters */}
          <defs>
            {SEASONS.map((k) => (
              <radialGradient id={`grad-${k}`} key={k} cx="50%" cy="50%" r="70%">
                <stop offset="0%" stopColor={META[k].color} stopOpacity="0.95" />
                <stop offset="100%" stopColor={META[k].color2} stopOpacity="0.95" />
              </radialGradient>
            ))}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Invisible hit areas per quadrant to ensure clicks always register (kept on top of wedges) */}
          <g style={{ transformOrigin: `${r}px ${r}px`, transform: `rotate(${rotation}deg)` }}>
            {wedges.map((w) => (
              <path
                key={`hit-${w.k}`}
                d={buildWedge(w.start, w.end)}
                fill="#000"
                fillOpacity="0.001" /* nearly invisible but pointer-events painted */
                onClick={() => handleActivate(w.k)}
                style={{ cursor: 'pointer' }}
                pointerEvents="all"
              />
            ))}
          </g>

          {/* Inner ring (non-interactive) */}
          <circle cx={r} cy={r} r={innerR} fill="transparent" stroke="rgba(255,255,255,0.16)" pointerEvents="none" />
        </svg>
      </div>
    </div>
  )
}
