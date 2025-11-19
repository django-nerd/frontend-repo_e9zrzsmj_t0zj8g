import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import AnimatedBackground from './components/AnimatedBackground'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import ValuesGoals from './components/ValuesGoals'
import Reviews from './components/Reviews'
import LegalModal from './components/LegalModal'
import SeasonDock from './components/SeasonDock'

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

  return (
    <div className="min-h-screen text-slate-100">
      <AnimatedBackground season={season} />
      <Navbar season={season} setSeason={setSeason} />
      {/* Dock season switch aligned with intro heading and overall higher */}
      <SeasonDock season={season} setSeason={setSeason} />

      <main className="pt-14">{/* slightly less top padding to move content up */}
        {/* Hero / Intro */}
        <section id="start" className="relative">
          <div className="relative max-w-6xl mx-auto px-6 py-16 md:py-22">{/* pull up hero spacing */}
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-sm">Westside-Furs e. V.</h1>
            <p className="mt-4 text-lg text-slate-200/90 max-w-2xl">
              Wir vernetzen die Furry-Community im Westen: mit Events, kreativen Projekten und einem starken Miteinander.
            </p>
            <div className="mt-6 flex items-center gap-3 text-sm">
              <a href="https://events.westside-furs.com/events/1/westside-furs-ev" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white">Zu unseren Events</a>
              <a href="https://cloud.westside-furs.com/index.php/apps/memories/s/galerie" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20">Galerie</a>
              <a href="https://socials.westside-furs.com/" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20">weitere Links</a>
            </div>
            {/* cue to scroll */}
            <div className="mt-10 flex flex-col items-center text-slate-200/80">
              <span className="text-xs uppercase tracking-widest">Scroll</span>
              <span className="mt-1 inline-block w-0.5 h-6 bg-slate-200/60 rounded-full animate-pulse" />
            </div>
          </div>
        </section>

        {/* About + Werte */}
        <section id="about" className="max-w-6xl mx-auto px-6 py-14">{/* slightly less padding to move up */}
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-2xl font-semibold mb-3">Wer wir sind</h2>
              <p className="text-slate-200/90 leading-relaxed">
                Wir sind ein eingetragener Verein aus der Furry-Szene. Unser Fokus liegt auf Gemeinschaft, Sicherheit und Spaß –
                von Suitwalks über Stammtische bis hin zu Workshops und Charity-Aktionen.
              </p>
              <p className="mt-4 text-slate-200/90 leading-relaxed">
                Bei uns sind Fursuiter, Spotter, Künstler:innen, Organisator:innen und Fans willkommen. Vielfalt und Respekt
                stehen im Mittelpunkt.
              </p>
              <ValuesGoals />
            </div>
            <div className="rounded-2xl border border-slate-700/60 bg-slate-900/40 p-6">
              <h3 className="font-medium mb-3">FAQ</h3>
              <FAQ />
            </div>
          </div>
        </section>

        <Reviews />

        {/* Removed separate legal/contact sections; available exclusively via Footer modal triggers */}

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
    </div>
  )
}
