import { useEffect, useState } from 'react'
import { Menu as MenuIcon, X, Home, Users, HelpCircle, Mail } from 'lucide-react'

const SEASONS = ['winter', 'spring', 'summer', 'autumn']

function SeasonPills({ season, onChange }) {
  return (
    <div className="flex items-center gap-2">
      {SEASONS.map((s) => (
        <button
          key={s}
          onClick={() => onChange(s)}
          className={`px-3 py-1.5 rounded-full text-xs border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${season===s ? 'bg-slate-800 text-white border-white/20' : 'bg-white/80 text-slate-700 border-white/40'}`}
          aria-pressed={season===s}
        >
          {s}
        </button>
      ))}
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
    <header className={`fixed top-0 inset-x-0 z-40 transition-all md:hidden ${scrolled ? 'backdrop-blur bg-white/80 shadow-sm' : 'backdrop-blur-sm bg-white/30'}`}>
      <nav className="max-w-6xl mx-auto px-4">
        <div className="h-14 flex items-center justify-between">
          {/* Hamburger */}
          <button
            aria-label="Menü öffnen"
            className="p-2 rounded-md hover:bg-white/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-800/30"
            onClick={() => setOpen(true)}
          >
            <MenuIcon className="w-5 h-5 text-slate-800" />
          </button>

          {/* Minimal brand */}
          <div className="text-slate-800 font-semibold">Westside-Furs</div>

          {/* Right spacer to balance layout */}
          <div className="w-9" />
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-slate-900 text-slate-100 border-l border-slate-700 shadow-xl flex flex-col">
            <div className="flex items-center justify-between px-4 h-14 border-b border-slate-700">
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
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10"
                >
                  <Icon className="w-4 h-4 opacity-80" />
                  <span>{label}</span>
                </a>
              ))}
            </div>

            <div className="mt-auto p-4 border-t border-slate-700">
              <div className="text-xs text-slate-300 mb-2">Saison</div>
              <SeasonPills season={season} onChange={setSeason} />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
