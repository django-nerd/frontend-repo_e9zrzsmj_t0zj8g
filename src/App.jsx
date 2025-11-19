import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import AnimatedBackground from './components/AnimatedBackground'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import ValuesGoals from './components/ValuesGoals'
import Reviews from './components/Reviews'
import LegalModal from './components/LegalModal'

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function App() {
  const [status, setStatus] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const [legalOpen, setLegalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('contact')

  useEffect(() => {
    const handler = (e) => {
      const tab = e.detail?.tab || 'contact'
      setActiveTab(tab)
      setLegalOpen(true)
    }
    document.addEventListener('open-legal', handler)
    return () => document.removeEventListener('open-legal', handler)
  }, [])

  const openLegal = (tab) => {
    setActiveTab(tab)
    setLegalOpen(true)
  }

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
      <AnimatedBackground />
      <Navbar />

      <main className="pt-16">
        {/* Hero / Intro */}
        <section id="start" className="relative">
          <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-28">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-sm">Westside-Furs e. V.</h1>
            <p className="mt-4 text-lg text-slate-200/90 max-w-2xl">
              Wir vernetzen die Furry-Community im Westen: mit Events, kreativen Projekten und einem starken Miteinander.
            </p>
            <div className="mt-6 flex items-center gap-3 text-sm">
              <a href="#about" className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white">Mehr erfahren</a>
              <button onClick={() => openLegal('contact')} className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20">Kontakt</button>
            </div>
          </div>
        </section>

        {/* About + Werte/Ziele */}
        <section id="about" className="max-w-6xl mx-auto px-6 py-16">
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

        {/* Contact trigger section */}
        <section id="contact" className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-semibold mb-4">Kontakt</h2>
          <p className="text-slate-300 mb-4">Öffne das Kontaktformular im Popup.</p>
          <div className="flex gap-3">
            <button onClick={() => openLegal('contact')} className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500">Kontakt öffnen</button>
            <button onClick={() => openLegal('impressum')} className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20">Impressum</button>
            <button onClick={() => openLegal('datenschutz')} className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20">Datenschutz</button>
          </div>
        </section>

        {/* Legal sections become triggers only */}
        <section id="impressum" className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-semibold mb-3">Impressum</h2>
          <p className="text-slate-200/90 text-sm leading-relaxed">Dieser Bereich öffnet nun als großes Popup. <button onClick={() => openLegal('impressum')} className="underline hover:text-white">Impressum anzeigen</button></p>
        </section>
        <section id="datenschutz" className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-semibold mb-3">Datenschutz</h2>
          <p className="text-slate-200/90 text-sm leading-relaxed">Dieser Bereich öffnet nun als großes Popup. <button onClick={() => openLegal('datenschutz')} className="underline hover:text-white">Datenschutzhinweise anzeigen</button></p>
        </section>

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
