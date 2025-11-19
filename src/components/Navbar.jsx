import { useEffect, useMemo, useState } from 'react'
import { Menu } from 'lucide-react'

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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const season = useMemo(() => getSeason(), [])

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
      className="px-3 py-2 text-sm rounded-md text-slate-700 hover:text-slate-900 hover:bg-white/70 md:text-slate-600"
    >
      {label}
    </a>
  )

  return (
    <header className={`fixed top-0 inset-x-0 z-40 transition-all ${scrolled ? 'backdrop-blur bg-white/70 shadow-sm' : 'backdrop-blur-sm bg-white/40'} `}>
      <nav className="relative max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-14">
          <a href="#start" className="flex items-center gap-2">
            <img src="/flame-icon.svg" alt="Logo" className="w-7 h-7" />
            <span className="font-semibold text-slate-800">Westside-Furs e. V.</span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            <LinkItem href="#about" label="Über uns" />
            <LinkItem href="#faq" label="FAQ" />
            <LinkItem href="#reviews" label="Rezensionen" />
            <LinkItem href="#contact" label="Kontakt" onClick={(e) => { e.preventDefault(); document.dispatchEvent(new CustomEvent('open-legal', { detail: { tab: 'contact' } })) }} />
            <LinkItem href="#impressum" label="Impressum" onClick={(e) => { e.preventDefault(); document.dispatchEvent(new CustomEvent('open-legal', { detail: { tab: 'impressum' } })) }} />
            <LinkItem href="#datenschutz" label="Datenschutz" onClick={(e) => { e.preventDefault(); document.dispatchEvent(new CustomEvent('open-legal', { detail: { tab: 'datenschutz' } })) }} />
          </div>

          <button className="md:hidden p-2 rounded-md hover:bg-white/70" onClick={() => setOpen(!open)} aria-label="Menü">
            <Menu className="w-5 h-5 text-slate-700" />
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-3 flex flex-col gap-1">
            <LinkItem href="#about" label="Über uns" />
            <LinkItem href="#faq" label="FAQ" />
            <LinkItem href="#reviews" label="Rezensionen" />
            <LinkItem href="#contact" label="Kontakt" onClick={(e) => { e.preventDefault(); document.dispatchEvent(new CustomEvent('open-legal', { detail: { tab: 'contact' } })) }} />
            <LinkItem href="#impressum" label="Impressum" onClick={(e) => { e.preventDefault(); document.dispatchEvent(new CustomEvent('open-legal', { detail: { tab: 'impressum' } })) }} />
            <LinkItem href="#datenschutz" label="Datenschutz" onClick={(e) => { e.preventDefault(); document.dispatchEvent(new CustomEvent('open-legal', { detail: { tab: 'datenschutz' } })) }} />
          </div>
        )}

        {season === 'winter' && <WinterIcicles />}
      </nav>
    </header>
  )
}
