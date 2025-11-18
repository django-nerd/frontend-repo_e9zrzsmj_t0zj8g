import { useEffect, useState } from 'react'
import { Menu, ExternalLink, ImageIcon, CalendarDays, Home, Mail } from 'lucide-react'

export default function Sidebar() {
  const [open, setOpen] = useState(true)

  useEffect(() => {
    const onResize = () => setOpen(window.innerWidth >= 1024)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const links = [
    { label: 'Start', href: '#start', icon: Home },
    { label: 'Wer wir sind', href: '#about', icon: Home },
    { label: 'FAQ', href: '#faq', icon: Menu },
    { label: 'Kontakt', href: '#contact', icon: Mail },
  ]

  return (
    <aside className={`fixed left-0 top-0 h-full z-20 transition-all ${open ? 'w-72' : 'w-16'}`}>
      <div className="h-full bg-slate-900/80 backdrop-blur border-r border-slate-700/60 flex flex-col">
        <div className="flex items-center justify-between px-4 py-4 border-b border-slate-700/60">
          <div className="flex items-center gap-3">
            <img src="/flame-icon.svg" alt="Logo" className="w-8 h-8" />
            {open && <span className="text-slate-100 font-semibold">Furry Verein</span>}
          </div>
          <button onClick={() => setOpen(!open)} className="p-2 rounded hover:bg-slate-800">
            <Menu className="w-5 h-5 text-slate-300" />
          </button>
        </div>

        <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800">
              <l.icon className="w-4 h-4" />
              {open && <span>{l.label}</span>}
            </a>
          ))}

          <div className="mt-6 pt-6 border-t border-slate-700/60 space-y-1">
            <a href="https://example.com/gallery" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800">
              <ImageIcon className="w-4 h-4" />
              {open && <span>Externe Galerie</span>}
              <ExternalLink className="w-3 h-3 ml-auto opacity-60" />
            </a>
            <a href="https://example.com/events" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800">
              <CalendarDays className="w-4 h-4" />
              {open && <span>Externe Events</span>}
              <ExternalLink className="w-3 h-3 ml-auto opacity-60" />
            </a>
          </div>
        </nav>

        <div className="p-3 text-xs text-slate-500">
          {open ? '© ' + new Date().getFullYear() + ' Furry Verein Deutschland' : '©'}
        </div>
      </div>
    </aside>
  )
}
