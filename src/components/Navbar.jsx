import { useEffect, useMemo, useState } from 'react'
import { Menu } from 'lucide-react'
import logo from '../assets/westside-furs.svg'
import logoMark from '../assets/westside-furs-mark.svg'

const SEASONS = ['winter', 'spring', 'summer', 'autumn']

function getSeason(date = new Date()) {
  const m = date.getMonth() + 1
  if (m === 12 || m <= 2) return 'winter'
  if (m >= 3 && m <= 5) return 'spring'
  if (m >= 6 && m <= 8) return 'summer'
  return 'autumn'
}

function WinterIcicles() {
  // Simple SVG strip with icicles that slightly sway
  return (
    <div className="absolute left-0 right-0 -bottom-[10px] h-8 pointer-events-none select-none">
      <style>{`
        @keyframes icicleSway { 0%,100%{ transform: translateY(0) } 50%{ transform: translateY(1px) } }
      `}</style>
      <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full h-full" aria-hidden>
        <defs>
          <linearGradient id="iceGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
            <stop offset="60%" stopColor="rgba(203,213,225,0.7)" />
            <stop offset="100%" stopColor="rgba(148,163,184,0.5)" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="100" height="6" fill="url(#iceGrad)" />
        {/* Icicle spikes */}
        {Array.from({ length: 18 }).map((_, i) => {
          const x = (i * (100 / 18)) + Math.random() * 1
          const w = 3 + (i % 3)
          const h = 6 + (i % 5) * 2
          return (
            <g key={i} style={{ animation: 'icicleSway 3.5s ease-in-out infinite', animationDelay: `${i * 120}ms` }}>
              <path d={`M ${x} 6 L ${x + w/2} ${6 + h} L ${x + w} 6 Z`} fill="url(#iceGrad)" stroke="rgba(203,213,225,0.6)" strokeWidth="0.2" />
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export function SeasonWheel({ season, onChange }) {
  const order = SEASONS
  const activeIndex = order.indexOf(season)
  // positions around the wheel: top is active, others rotate around
  return (
    <div className="relative hidden md:flex items-center ml-3">
      <div className="relative w-24 h-24 select-none" aria-label="Saison-Umschalter">
        <div className="absolute inset-0 rounded-full bg-white/60 backdrop-blur-sm border border-white/50 shadow-inner" />
        <div className="absolute inset-2 rounded-full bg-gradient-to-b from-white/70 to-white/30" />
        {/* markers */}
        {order.map((s, i) => {
          const angle = ((i - activeIndex + order.length) % order.length) * 90 // 4 items
          const rad = (angle - 90) * (Math.PI / 180)
          const r = 36
          const cx = 48 + Math.cos(rad) * r
          const cy = 48 + Math.sin(rad) * r
          const isActive = i === activeIndex
          const labelMap = { winter: '❄️', spring: '🌸', summer: '🔥', autumn: '🍁' }
          return (
            <button
              key={s}
              onClick={() => onChange(s)}
              className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-800/40 ${isActive ? 'w-9 h-9 bg-slate-800 text-white shadow-lg' : 'w-8 h-8 bg-white text-slate-700 shadow'}`}
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
      <span className="ml-2 text-xs text-slate-700 capitalize">{season}</span>
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

  useEffect(() => {
    const handler = () => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    document.addEventListener('open-legal', handler)
    return () => document.removeEventListener('open-legal', handler)
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
    <header className={`fixed top-0 inset-x-0 z-40 transition-all ${scrolled ? 'backdrop-blur bg-white/70 shadow-sm' : 'backdrop-blur-sm bg-white/40'} `}>
      <nav className="relative max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-14">
          <a href="#start" className="flex items-center gap-2">
            {/* Mark-only on very small screens */}
            <img src={logoMark} alt="Westside-Furs Bildmarke" className="h-7 w-auto object-contain align-middle shrink-0 md:hidden" />
            {/* Full logo on md+ */}
            <img src={logo} alt="Westside-Furs Logo" className="hidden md:block h-8 lg:h-9 w-auto object-contain align-middle shrink-0" />
            {/* Title only on md+ to keep tiny displays clean */}
            <span className="hidden md:inline font-semibold text-slate-800 text-sm md:text-base">Westside-Furs e. V.</span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            <LinkItem href="#about" label="Über uns" />
            <LinkItem href="#faq" label="FAQ" />
            <LinkItem href="#reviews" label="Rezensionen" />
            <LinkItem href="#contact" label="Kontakt" onClick={(e) => { e.preventDefault(); document.dispatchEvent(new CustomEvent('open-legal', { detail: { tab: 'contact' } })) }} />
            <LinkItem href="#impressum" label="Impressum" onClick={(e) => { e.preventDefault(); document.dispatchEvent(new CustomEvent('open-legal', { detail: { tab: 'impressum' } })) }} />
            <LinkItem href="#datenschutz" label="Datenschutz" onClick={(e) => { e.preventDefault(); document.dispatchEvent(new CustomEvent('open-legal', { detail: { tab: 'datenschutz' } })) }} />
            {/* Season wheel moved out of navbar to avoid clipping */}
          </div>

          <button className="md:hidden p-2 rounded-md hover:bg-white/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-800/30" onClick={() => setOpen(!open)} aria-label="Menü">
            <Menu className="w-5 h-5 text-slate-700" />
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-3 flex flex-col gap-1">
            <div className="flex items-center gap-2 px-1 py-1">
              <img src={logoMark} alt="Westside-Furs Bildmarke" className="h-7 w-auto object-contain align-middle shrink-0" />
              <span className="font-semibold text-slate-800">Westside-Furs e. V.</span>
            </div>
            <LinkItem href="#about" label="Über uns" />
            <LinkItem href="#faq" label="FAQ" />
            <LinkItem href="#reviews" label="Rezensionen" />
            <LinkItem href="#contact" label="Kontakt" onClick={(e) => { e.preventDefault(); document.dispatchEvent(new CustomEvent('open-legal', { detail: { tab: 'contact' } })) }} />
            <LinkItem href="#impressum" label="Impressum" onClick={(e) => { e.preventDefault(); document.dispatchEvent(new CustomEvent('open-legal', { detail: { tab: 'impressum' } })) }} />
            <LinkItem href="#datenschutz" label="Datenschutz" onClick={(e) => { e.preventDefault(); document.dispatchEvent(new CustomEvent('open-legal', { detail: { tab: 'datenschutz' } })) }} />
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

        {season === 'winter' && <WinterIcicles />}
      </nav>
    </header>
  )
}
