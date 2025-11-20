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
// Idle: compact round button showing only the current season emoji
// Hover/Focus: expands to full wheel with evenly spaced icons; ring rotates so selected season is at top
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

  return (
    <div className="group relative inline-block select-none">
      {/* Animated container: compact -> expanded */}
      <div
        className="relative overflow-visible rounded-full transition-all duration-300 ease-out border border-white/20 bg-white/10 backdrop-blur-sm shadow-sm w-12 h-12 group-hover:w-40 group-hover:h-40 group-focus-within:w-40 group-focus-within:h-40"
        aria-label={SEASON_META[season]?.de}
      >
        {/* Outer ring visible only when expanded */}
        <div className="absolute inset-1 rounded-full border border-white/10 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100" />

        {/* Center content: emoji (idle) -> german text (expanded) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Emoji badge (idle) */}
          <div className="px-0 py-0 w-9 h-9 rounded-full bg-white text-slate-900 shadow ring-1 ring-white/60 text-base font-medium flex items-center justify-center transition-opacity duration-200 group-hover:opacity-0 group-focus-within:opacity-0">
            <span aria-hidden>{SEASON_META[season]?.emoji}</span>
          </div>
          {/* German label (expanded) */}
          <div className="px-3 py-1.5 rounded-full bg-white text-slate-900 shadow ring-1 ring-white/60 text-sm font-medium opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
            {SEASON_META[season]?.de}
          </div>
        </div>

        {/* Buttons ring: appears on hover/focus, with rotation so active is on top */}
        <div
          className="absolute inset-0 transition-transform duration-500 ease-out will-change-transform opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 group-focus-within:opacity-100 group-focus-within:scale-100"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {SEASONS.map((s, idx) => {
            const angle = idx * step // 0 top, clockwise
            return (
              <button
                key={s}
                onClick={() => onChange(s)}
                className={`absolute left-1/2 top-1/2 w-10 h-10 rounded-full flex items-center justify-center text-base transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${season===s ? 'bg-white text-slate-900 shadow ring-1 ring-white/60' : 'text-white/90 bg-white/0 hover:bg-white/10 border border-white/10'}`}
                aria-pressed={season===s}
                aria-label={SEASON_META[s].de}
                title={SEASON_META[s].de}
                style={{ transform: `translate(-50%, -50%) rotate(${angle}deg) translate(${radius}px) rotate(${-angle - rotation}deg)` }}
              >
                <span aria-hidden>{SEASON_META[s].emoji}</span>
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
