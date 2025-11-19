import { useState } from 'react'
import Navbar from './components/Navbar'
import AnimatedBackground from './components/AnimatedBackground'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import ValuesGoals from './components/ValuesGoals'
import Reviews from './components/Reviews'

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function App() {
  const [status, setStatus] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

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
              <a href="#contact" className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20">Kontakt</a>
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

        {/* Contact */}
        <section id="contact" className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-semibold mb-6">Kontakt</h2>
          <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-1">
              <label className="block text-sm mb-1">Name</label>
              <input required value={form.name} onChange={e=>setForm({...form, name:e.target.value})} className="w-full bg-slate-900/60 border border-slate-700/60 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Dein Name" />
            </div>
            <div className="md:col-span-1">
              <label className="block text-sm mb-1">E‑Mail</label>
              <input type="email" required value={form.email} onChange={e=>setForm({...form, email:e.target.value})} className="w-full bg-slate-900/60 border border-slate-700/60 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="name@beispiel.de" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm mb-1">Betreff</label>
              <input value={form.subject} onChange={e=>setForm({...form, subject:e.target.value})} className="w-full bg-slate-900/60 border border-slate-700/60 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Worum geht es?" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm mb-1">Nachricht</label>
              <textarea required rows={6} value={form.message} onChange={e=>setForm({...form, message:e.target.value})} className="w-full bg-slate-900/60 border border-slate-700/60 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Schreib uns eine Nachricht..." />
            </div>
            <div className="md:col-span-2 flex items-center gap-3">
              <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500">Absenden</button>
              {status === 'sending' && <span className="text-slate-300 text-sm">Wird gesendet…</span>}
              {status === 'ok' && <span className="text-green-300 text-sm">Danke! Wir melden uns bald.</span>}
              {status === 'error' && <span className="text-red-300 text-sm">Leider ist ein Fehler aufgetreten.</span>}
            </div>
          </form>
        </section>

        {/* Legal sections */}
        <section id="impressum" className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-semibold mb-3">Impressum</h2>
          <p className="text-slate-200/90 text-sm leading-relaxed">Angaben gemäß § 5 TMG – Platzhalter. Sobald du mir die offiziellen Daten sendest, trage ich alles ein.</p>
        </section>
        <section id="datenschutz" className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-semibold mb-3">Datenschutz</h2>
          <p className="text-slate-200/90 text-sm leading-relaxed">Hinweise nach DSGVO – Platzhalter. Ich übernehme den Text aus deiner bisherigen Seite, sobald du ihn freigibst.</p>
        </section>

        <Footer />
      </main>
    </div>
  )
}
