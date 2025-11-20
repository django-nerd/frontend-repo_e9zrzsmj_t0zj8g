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

// Desktop season switch (exported for SeasonDock) — circular "old" style wheel
export function SeasonWheel({ season, onChange }) {
  const positions = {
    winter: 'top-2 left-1/2 -translate-x-1/2',
    spring: 'top-1/2 right-2 -translate-y-1/2',
    summer: 'bottom-2 left-1/2 -translate-x-1/2',
    autumn: 'top-1/2 left-2 -translate-y-1/2',
  }

  return (
    <div className="relative w-40 h-40 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm shadow-sm select-none">
      {/* ring */}
      <div className="absolute inset-1 rounded-full border border-white/10" />

      {/* center label showing current season in German */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="px-3 py-1.5 rounded-full bg-white text-slate-900 shadow ring-1 ring-white/60 text-sm font-medium">
          <span className="mr-1" aria-hidden>{SEASON_META[season]?.emoji}</span>
          <span>{SEASON_META[season]?.de}</span>
        </div>
      </div>

      {/* buttons around the circle with emojis */}
      <div className="absolute inset-0">
        {SEASONS.map((s) => (
          <button
            key={s}
            onClick={() => onChange(s)}
            className={`absolute ${positions[s]} w-10 h-10 rounded-full flex items-center justify-center text-base transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${season===s ? 'bg-white text-slate-900 shadow ring-1 ring-white/60' : 'text-white/90 bg-white/0 hover:bg-white/10 border border-white/10'}`}
            aria-pressed={season===s}
            aria-label={SEASON_META[s].de}
            title={SEASON_META[s].de}
          >
            <span aria-hidden>{SEASON_META[s].emoji}</span>
          </button>
        ))}
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
          {/* Right-aligned Hamburger only on mobile; no white header */}
          <button
            aria-label="Menü öffnen"
            aria-expanded={open}
            className="p-2 rounded-md bg-black/0 hover:bg-black/10 text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/30"
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
