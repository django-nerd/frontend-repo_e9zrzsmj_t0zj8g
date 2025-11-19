import { useEffect, useState } from 'react'
import { Menu } from 'lucide-react'
import logo from '../assets/westside-furs.svg'
import logoMark from '../assets/westside-furs-mark.svg'

const SEASONS = ['winter', 'spring', 'summer', 'autumn']

export function SeasonWheel({ season, onChange }) {
  const order = SEASONS
  const activeIndex = order.indexOf(season)
  const labelText = { winter: 'Winter', spring: 'Frühling', summer: 'Sommer', autumn: 'Herbst' }[season] || ''
  return (
    <div className="relative hidden md:flex items-center ml-3">
      <div className="relative w-28 h-28 select-none" aria-label="Saison-Umschalter">
        <div className="absolute inset-0 rounded-full bg-white/50 backdrop-blur-md border border-white/50 shadow-inner" />
        <div className="absolute inset-2 rounded-full bg-gradient-to-b from-white/70 to-white/30" />
        {/* center label */}
        <div className="absolute inset-6 rounded-full flex items-center justify-center">
          <span className="px-3 py-1 rounded-md text-xs font-medium capitalize text-slate-800 bg-slate-200/70 shadow-sm border border-white/60">
            {labelText}
          </span>
        </div>
        {/* markers */}
        {order.map((s, i) => {
          const angle = ((i - activeIndex + order.length) % order.length) * 90
          const rad = (angle - 90) * (Math.PI / 180)
          const r = 40
          const cx = 56 + Math.cos(rad) * r
          const cy = 56 + Math.sin(rad) * r
          const isActive = i === activeIndex
          const labelMap = { winter: '❄️', spring: '🌸', summer: '🔥', autumn: '🍁' }
          return (
            <button
              key={s}
              onClick={() => onChange(s)}
              className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-800/40 ${isActive ? 'w-10 h-10 bg-slate-800 text-white shadow-lg' : 'w-9 h-9 bg-white text-slate-700 shadow'}`}
              style={{ left: cx, top: cy }}
              title={s}
              aria-pressed={isActive}
            >
              <span className="text-base" aria-hidden>{labelMap[s]}</span>
              <span className="sr-only">{s}</span>
            </button>
          )
        })}
        {/* pointer */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-slate-800" />
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

  const LinkItem = ({ href, label, onClick }) => (
    <a
      href={href}
      onClick={(e) => { onClick?.(e); setOpen(false) }}
      className="px-3 py-2 text-sm rounded-md text-slate-700 hover:text-slate-900 hover:bg-white/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-800/30 md:text-slate-600"
    >
      {label}
    </a>
  )

  return (
    <header className={`fixed top-0 inset-x-0 z-40 transition-all ${scrolled ? 'backdrop-blur bg-white/80 shadow-sm' : 'backdrop-blur-sm bg-white/30'} `}>
      <nav className="relative max-w-6xl mx-auto px-4 md:px-6">
        <div className="relative flex items-center justify-between h-14">
          {/* Left area (desktop title only). On mobile it's empty to allow centered logo */}
          <a href="#start" className="hidden md:flex items-center gap-2">
            {/* Removed logo from navigation on md+ */}
            <span className="font-semibold text-slate-800 text-sm md:text-base">Westside-Furs e. V.</span>
          </a>

          {/* Centered logo on mobile only */}
          <div className="absolute inset-0 flex items-center justify-center md:hidden pointer-events-none">
            <img src={logoMark} alt="Westside-Furs" className="h-9 w-auto object-contain" />
          </div>

          {/* Right area */}
          <div className="hidden md:flex items-center gap-1 ml-auto">
            <LinkItem href="#about" label="Über uns" />
            <LinkItem href="#faq" label="FAQ" />
            <LinkItem href="#reviews" label="Rezensionen" />
            <LinkItem href="#events" label="Events" onClick={(e) => { e.preventDefault(); window.open('https://events.westside-furs.com/events/1/westside-furs-ev', '_blank', 'noopener,noreferrer') }} />
            <LinkItem href="#gallery" label="Galerie" onClick={(e) => { e.preventDefault(); window.open('https://cloud.westside-furs.com/index.php/apps/memories/s/galerie', '_blank', 'noopener,noreferrer') }} />
          </div>

          <button className="md:hidden p-2 rounded-md hover:bg-white/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-800/30 ml-auto" onClick={() => setOpen(!open)} aria-label="Menü">
            <Menu className="w-5 h-5 text-slate-700" />
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-3 flex flex-col gap-1">
            {/* Removed extra logo in mobile dropdown to keep header as the only logo in nav */}
            <LinkItem href="#about" label="Über uns" />
            <LinkItem href="#faq" label="FAQ" />
            <LinkItem href="#reviews" label="Rezensionen" />
            <a href="https://events.westside-furs.com/events/1/westside-furs-ev" target="_blank" rel="noopener noreferrer" className="px-3 py-2 text-sm rounded-md text-slate-700 hover:text-slate-900 hover:bg-white/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-800/30">Events</a>
            <a href="https://cloud.westside-furs.com/index.php/apps/memories/s/galerie" target="_blank" rel="noopener noreferrer" className="px-3 py-2 text-sm rounded-md text-slate-700 hover:text-slate-900 hover:bg-white/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-800/30">Galerie</a>
            {/* Mobile season selector as simple row */}
            <div className="flex items-center gap-2 pt-2">
              {SEASONS.map((s) => (
                <button
                  key={s}
                  onClick={() => setSeason(s)}
                  className={`px-2 py-1 rounded-full text-xs border focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-800/30 ${season===s ? 'bg-slate-800 text-white' : 'bg-white/80 text-slate-700'}`}
                  aria-pressed={season===s}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
