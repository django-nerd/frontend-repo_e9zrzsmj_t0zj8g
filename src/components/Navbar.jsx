import { useEffect, useState } from 'react'
import { Menu } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handler = (e) => {
      const tab = e.detail?.tab || 'contact'
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
      <nav className="max-w-6xl mx-auto px-4 md:px-6">
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
      </nav>
    </header>
  )
}
