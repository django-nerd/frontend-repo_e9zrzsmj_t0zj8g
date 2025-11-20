import { useEffect, useState } from 'react'
import { Menu as MenuIcon, X, Home, Users, HelpCircle, Mail } from 'lucide-react'

const SEASONS = ['winter', 'spring', 'summer', 'autumn']

const SEASON_META = {
  winter: { emoji: '❄️', de: 'Winter' },
  spring: { emoji: '🌸', de: 'Frühling' },
  summer: { emoji: '☀️', de: 'Sommer' },
  autumn: { emoji: '🍂', de: 'Herbst' },
}

function SeasonPills({ season, onChange }) {
  return (
    <div className="flex items-center gap-2">
      {SEASONS.map((s) => (
        <button
          key={s}
          onClick={() => onChange(s)}
          className={`px-3 py-1.5 rounded-full text-xs border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${season===s ? 'bg-slate-800 text-white border-white/20' : 'bg-white/80 text-slate-700 border-white/40'}`}
          aria-pressed={season===s}
          title={SEASON_META[s].de}
        >
          <span className="mr-1" aria-hidden>{SEASON_META[s].emoji}</span>
          {SEASON_META[s].de}
        </button>
      ))}
    </div>
  )
}

// Desktop season switch (exported for SeasonDock)
// Idle: compact 48x48 visual in center of a 160x160 interactive area
// Hover/Focus: the whole wheel scales up to 160x160, icons fly out to the ring, ring rotates so active is on top
export function SeasonWheel({ season, onChange }) {
  const rotationBySeason = {
    winter: 0,
    spring: -90,
    summer: -180,
    autumn: -270,
  }
  const rotation = rotationBySeason[season] ?? 0

  // Even distribution around circle
  const step = 360 / SEASONS.length
  const radius = 64 // px for 160px (w-40 h-40) circle

  // SVG helpers for connector positions (expanded size reference 160x160)
  const cx = 80
  const cy = 80
  const pts = SEASONS.map((_, idx) => {
    const angle = (idx * step) * Math.PI / 180
    const x = cx + radius * Math.sin(angle)
    const y = cy - radius * Math.cos(angle)
    return { x, y }
  })

  const [expanded, setExpanded] = useState(false)

  return (
    // Wrapper is full expanded size so hover area matches the open wheel exactly
    <div
      className="relative inline-block w-40 h-40 overflow-visible select-none"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      onFocus={() => setExpanded(true)}
      onBlur={() => setExpanded(false)}
      tabIndex={0}
    >
      {/* Wheel container centered within wrapper; scales from 0.3 (48/160) to 1 */}
      <div
        className="relative overflow-visible rounded-full border border-cyan-300/20 bg-transparent backdrop-blur-0 shadow-sm w-40 h-40 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 absolute transition-transform duration-600 ease-out"
        aria-label={SEASON_META[season]?.de}
        style={{
          transform: 'translate(-50%, -50%) scale(var(--s))',
          ['--s']: expanded ? 1 : 0.3,
          ['--t']: expanded ? 1 : 0,
        }}
      >
        {/* Futuristic connectors + ring */}
        <svg
          className={`absolute inset-0 w-full h-full transition-opacity duration-400 pointer-events-none ${expanded ? 'opacity-100' : 'opacity-0'}`}
          viewBox="0 0 160 160"
          fill="none"
          aria-hidden
        >
          {/* Rotate whole network so active is at top */}
          <g transform={`rotate(${rotation} 80 80)`}>
            {/* Outer ring */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              className="[filter:drop-shadow(0_0_8px_rgba(34,211,238,0.45))]"
              stroke="rgba(34,211,238,0.55)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Connectors between nodes */}
            {pts.map((p, i) => {
              const q = pts[(i + 1) % pts.length]
              return (
                <line
                  key={`ln-${i}`}
                  x1={p.x}
                  y1={p.y}
                  x2={q.x}
                  y2={q.y}
                  stroke="rgba(34,211,238,0.6)"
                  strokeWidth="1.25"
                  className="[filter:drop-shadow(0_0_6px_rgba(34,211,238,0.6))]"
                />
              )
            })}
            {/* Small nodes on ring positions (subtle) */}
            {pts.map((p, i) => (
              <circle
                key={`nd-${i}`}
                cx={p.x}
                cy={p.y}
                r="3.5"
                fill="rgba(34,211,238,0.25)"
                stroke="rgba(165,243,252,0.9)"
                strokeWidth="1"
                className="[filter:drop-shadow(0_0_5px_rgba(34,211,238,0.7))]"
              />
            ))}
          </g>
        </svg>

        {/* Center content: emoji (idle) -> german text (expanded) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Emoji badge (idle) */}
          <div className={`w-12 h-12 rounded-full bg-gradient-to-b from-cyan-300/90 to-cyan-400/90 text-slate-900 shadow-[0_0_0_1px_rgba(255,255,255,0.6)] ring-1 ring-cyan-200/60 text-3xl leading-none font-semibold inline-flex items-center justify-center transition-opacity duration-250 ${expanded ? 'opacity-0' : 'opacity-100'} [filter:drop-shadow(0_0_10px_rgba(34,211,238,0.65))]`}>
            <span aria-hidden>{SEASON_META[season]?.emoji}</span>
          </div>
          {/* German label (expanded) */}
          <div className={`px-3 py-1.5 rounded-full bg-gradient-to-b from-cyan-300/90 to-cyan-400/90 text-slate-900 shadow-[0_0_0_1px_rgba(255,255,255,0.6)] ring-1 ring-cyan-200/60 text-sm font-semibold transition-opacity duration-250 ${expanded ? 'opacity-100' : 'opacity-0'} [filter:drop-shadow(0_0_12px_rgba(34,211,238,0.65))]`}>
            {SEASON_META[season]?.de}
          </div>
        </div>

        {/* Buttons ring: rotates so active is on top. Icons fly out from center with staggered delay. */}
        <div
          className={`absolute inset-0 will-change-transform transition-transform duration-700 ease-out ${expanded ? 'pointer-events-auto' : 'pointer-events-none'}`}
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {SEASONS.map((s, idx) => {
            const angle = idx * step // 0 top, clockwise
            const delay = `${idx * 100}ms`
            const active = season === s
            return (
              <button
                key={s}
                onClick={() => onChange(s)}
                className={`absolute left-1/2 top-1/2 w-10 h-10 rounded-full flex items-center justify-center text-base transition-all ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60 ${expanded ? 'opacity-100' : 'opacity-0'} border backdrop-blur-sm ${active ? 'bg-gradient-to-b from-cyan-300 to-cyan-400 text-slate-900 border-white/60 shadow-[0_2px_18px_rgba(34,211,238,0.55)]' : 'bg-cyan-300/10 text-cyan-100 border-cyan-200/40 hover:bg-cyan-300/20 shadow-[0_2px_14px_rgba(34,211,238,0.35)]'}`}
                aria-pressed={active}
                aria-label={SEASON_META[s].de}
                title={SEASON_META[s].de}
                style={{
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(calc(var(--t) * ${radius}px)) rotate(${-angle - rotation}deg)`,
                  transitionProperty: 'transform, opacity, background-color, border-color, box-shadow, color',
                  transitionDuration: '500ms',
                  transitionDelay: delay,
                }}
              >
                <span className="block" aria-hidden>{SEASON_META[s].emoji}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default function Navbar({ season, setSeason }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // lock body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  const navLinks = [
    { href: '#start', label: 'Start', Icon: Home },
    { href: '#about', label: 'Wer wir sind', Icon: Users },
    { href: '#faq', label: 'FAQ', Icon: HelpCircle },
    { href: '#contact', label: 'Kontakt', Icon: Mail },
  ]

  return (
    <header className={`fixed top-0 inset-x-0 z-40 transition-all md:hidden ${scrolled ? '' : ''}`}>
      <nav className="max-w-6xl mx-auto px-4">
        <div className="h-14 flex items-center justify-end">
          {/* Right-aligned Hamburger only on mobile; now with a background */}
          <button
            aria-label="Menü öffnen"
            aria-expanded={open}
            className="p-2 rounded-full bg-slate-900/80 text-white shadow-md backdrop-blur-sm border border-white/10 hover:bg-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            onClick={() => setOpen(true)}
          >
            <MenuIcon className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile drawer with stronger background for contrast */}
      <div className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}> 
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
        {/* Panel */}
        <div className={`absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-slate-950 text-white border-l border-white/10 shadow-xl flex flex-col transform transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center justify-between px-4 h-14 border-b border-white/10">
            <span className="font-semibold">Menü</span>
            <button
              aria-label="Menü schließen"
              className="p-2 rounded-md hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              onClick={() => setOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-3 space-y-1">
            {navLinks.map(({ href, label, Icon }) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 text-white"
              >
                <Icon className="w-4 h-4 opacity-90" />
                <span className="font-medium">{label}</span>
              </a>
            ))}
          </div>

          <div className="mt-auto p-4 border-t border-white/10">
            <div className="text-xs text-white/70 mb-2">Saison</div>
            <SeasonPills season={season} onChange={setSeason} />
          </div>
        </div>
      </div>
    </header>
  )
}
