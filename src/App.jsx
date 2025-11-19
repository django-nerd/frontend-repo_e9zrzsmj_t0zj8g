import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import AnimatedBackground from './components/AnimatedBackground'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import ValuesGoals from './components/ValuesGoals'
import Reviews from './components/Reviews'
import LegalModal from './components/LegalModal'
import SeasonDock from './components/SeasonDock'
import BackToTop from './components/BackToTop'
import Reveal from './components/Reveal'
import logo from './assets/westside-furs.svg'

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function getSeason(date = new Date()) {
  const m = date.getMonth() + 1
  if (m === 12 || m <= 2) return 'winter'
  if (m >= 3 && m <= 5) return 'spring'
  if (m >= 6 && m <= 8) return 'summer'
  return 'autumn'
}

export default function App() {
  const [status, setStatus] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const [legalOpen, setLegalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('contact')

  // Season state: defaults to detected season, can be changed manually via Navbar wheel
  const [season, setSeason] = useState(getSeason())
  useEffect(() => { setSeason(getSeason()) }, [])

  useEffect(() => {
    const handler = (e) => {
      const tab = e.detail?.tab || 'contact'
      setActiveTab(tab)
      setLegalOpen(true)
    }
    document.addEventListener('open-legal', handler)
    return () => document.removeEventListener('open-legal', handler)
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(`${backendUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error('Senden fehlgeschlagen')
      setStatus('ok')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (e) {
      setStatus('error')
    }
  }

  // In Spring, invert text outside boxes to dark for contrast; otherwise light
  const baseTextClass = season === 'spring' ? 'text-slate-900' : 'text-slate-100'

  return (
    <div className={`min-h-screen ${baseTextClass}`}>
      <AnimatedBackground season={season} />
      {/* Mobile-only header (desktop nav removed) */}
      <Navbar season={season} setSeason={setSeason} />
      {/* Align the desktop Season switch with the hero logo height by adjusting margins in SeasonDock */}
      <SeasonDock season={season} setSeason={setSeason} />

      <main className="pt-0">{/* safe offset removed as requested */}
        {/* Hero / Intro */}
        <section id="start" className="relative">
          <div className="relative max-w-6xl mx-auto px-6 pt-0 md:pt-0 lg:pt-0 pb-16">{/* top padding removed */}
            {/* Large logo above heading */}
            <div className="flex md:items-center md:min-h-[7rem] lg:min-h-[8rem] xl:min-h-[10rem]">
              <img src={logo} alt="Westside-Furs Logo" className="h-20 md:h-28 lg:h-32 xl:h-40 w-auto object-contain drop-shadow-sm" />
            </div>
            <h1 className={`mt-6 text-4xl md:text-6xl font-bold tracking-tight drop-shadow-sm text-center md:text-left ${season === 'spring' ? 'text-slate-900' : 'text-white'}`}>Westside-Furs e. V.</h1>
            <p className={`mt-4 text-lg max-w-2xl md:text-left mx-auto md:mx-0 text-center ${season === 'spring' ? 'text-slate-800/90' : 'text-slate-200/90'}`}>
              Wir vernetzen die Furry-Community im Westen: mit Events, kreativen Projekten und einem starken Miteinander.
            </p>
            <div className="mt-6 flex items-center gap-3 text-sm justify-center md:justify-start">
              <a href="https://events.westside-furs.com/events/1/westside-furs-ev" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white">Zu unseren Events</a>
              <a href="https://cloud.westside-furs.com/index.php/apps/memories/s/galerie" target="_blank" rel="noopener noreferrer" className={`${season === 'spring' ? 'bg-black/5 border-black/10 text-slate-900 hover:bg-black/10' : 'bg-white/10 border-white/20 hover:bg-white/20'} px-4 py-2 rounded-lg border`}>Galerie</a>
              <a href="https://socials.westside-furs.com/" target="_blank" rel="noopener noreferrer" className={`${season === 'spring' ? 'bg-black/5 border-black/10 text-slate-900 hover:bg-black/10' : 'bg-white/10 border-white/20 hover:bg-white/20'} px-4 py-2 rounded-lg border`}>weitere Links</a>
            </div>
            {/* cue to scroll */}
            <div className="mt-10 flex flex-col items-center text-slate-2 00/80">
              <span className="text-xs uppercase tracking-widest">Scroll</span>
              <span className={`mt-1 inline-block w-0.5 h-6 rounded-full animate-pulse ${season === 'spring' ? 'bg-slate-700/60' : 'bg-slate-200/60'}`} />
            </div>
          </div>
        </section>

        {/* About + Werte / FAQ */}
        <Reveal>
          <section id="about" className="max-w-6xl mx-auto px-6 py-14">
            {/* Keep the heading left-aligned above the values */}
            <div className="max-w-3xl">
              <h2 className="text-2xl font-semibold mb-3">Wer wir sind</h2>
              <p className={`${season === 'spring' ? 'text-slate-800/90' : 'text-slate-200/90'} leading-relaxed`}>
                Wir sind ein eingetragener Verein aus der Furry-Szene. Unser Fokus liegt auf Gemeinschaft, Sicherheit und Spaß –
                von Suitwalks über Stammtische bis hin zu Workshops und Charity-Aktionen.
              </p>
              <p className={`mt-4 ${season === 'spring' ? 'text-slate-800/90' : 'text-slate-200/90'} leading-relaxed`}>
                Bei uns sind Fursuiter, Spotter, Künstler:innen, Organisator:innen und Fans willkommen. Vielfalt und Respekt
                stehen im Mittelpunkt.
              </p>
            </div>

            {/* Grid: left = values, right = FAQ aligned to values top; dynamic height */}
            <div className="mt-8 grid md:grid-cols-2 gap-10 items-start">
              <div>
                <ValuesGoals />
              </div>
              <div className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-6">
                <h3 className="font-medium mb-3">FAQ</h3>
                <FAQ />
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal delay={100}>
          <Reviews season={season} />
        </Reveal>

        <Footer />
      </main>

      <LegalModal
        open={legalOpen}
        onClose={() => setLegalOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSubmitContact={onSubmit}
        status={status}
        form={form}
        setForm={setForm}
      />

      {/* Back to top button */}
      <BackToTop />
    </div>
  )
}
