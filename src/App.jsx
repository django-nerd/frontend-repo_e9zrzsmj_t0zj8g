import { useState } from 'react'
import Sidebar from './components/Sidebar'
import FAQ from './components/FAQ'
import Footer from './components/Footer'

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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <Sidebar />

      <main className="lg:ml-72">
        {/* Hero / Intro */}
        <section id="start" className="relative pt-20 md:pt-28">
          <div className="absolute inset-0 bg-[radial-gradient(600px_circle_at_20%_10%,rgba(59,130,246,0.15),transparent_40%),radial-gradient(600px_circle_at_80%_0%,rgba(168,85,247,0.12),transparent_40%)]" />
          <div className="relative max-w-5xl mx-auto px-6 py-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Furry Verein Deutschland</h1>
            <p className="mt-4 text-lg text-slate-300 max-w-2xl">
              Wir fördern die deutsche Furry‑Community durch Events, kreative Projekte und gegenseitige Unterstützung.
              Offen, divers und mit viel Herz.
            </p>
            <div className="mt-6 flex items-center gap-3 text-sm text-slate-400">
              <a href="#about" className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white">Mehr erfahren</a>
              <a href="#contact" className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700">Kontakt</a>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="max-w-5xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-2xl font-semibold mb-3">Wer wir sind</h2>
              <p className="text-slate-300 leading-relaxed">
                Wir sind ein bundesweiter Zusammenschluss von Furries, Künstler:innen und Freund:innen der Szene. 
                Unser Ziel ist es, Räume für Begegnung, Kreativität und Inklusion zu schaffen – online wie offline.
              </p>
              <p className="mt-4 text-slate-300 leading-relaxed">
                Ob Stammtisch, Con‑Besuch oder Charity‑Aktion: Bei uns findest du Community und Unterstützung.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-700/60 bg-slate-900/50 p-6">
              <h3 className="font-medium mb-3">Häufige Fragen</h3>
              <FAQ />
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-semibold mb-6">Kontakt</h2>
          <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-1">
              <label className="block text-sm mb-1">Name</label>
              <input required value={form.name} onChange={e=>setForm({...form, name:e.target.value})} className="w-full bg-slate-900 border border-slate-700/60 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Dein Name" />
            </div>
            <div className="md:col-span-1">
              <label className="block text-sm mb-1">E‑Mail</label>
              <input type="email" required value={form.email} onChange={e=>setForm({...form, email:e.target.value})} className="w-full bg-slate-900 border border-slate-700/60 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="name@beispiel.de" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm mb-1">Betreff</label>
              <input value={form.subject} onChange={e=>setForm({...form, subject:e.target.value})} className="w-full bg-slate-900 border border-slate-700/60 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Worum geht es?" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm mb-1">Nachricht</label>
              <textarea required rows={6} value={form.message} onChange={e=>setForm({...form, message:e.target.value})} className="w-full bg-slate-900 border border-slate-700/60 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Schreib uns eine Nachricht..." />
            </div>
            <div className="md:col-span-2 flex items-center gap-3">
              <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500">Absenden</button>
              {status === 'sending' && <span className="text-slate-400 text-sm">Wird gesendet…</span>}
              {status === 'ok' && <span className="text-green-400 text-sm">Danke! Wir melden uns bald.</span>}
              {status === 'error' && <span className="text-red-400 text-sm">Leider ist ein Fehler aufgetreten.</span>}
            </div>
          </form>
        </section>

        {/* Legal sections */}
        <section id="impressum" className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-semibold mb-3">Impressum</h2>
          <p className="text-slate-300 text-sm leading-relaxed">Angaben gemäß § 5 TMG – Platzhaltertext. Trage hier Vereinsadresse, Vertretungsberechtigte und Kontakt ein.</p>
        </section>
        <section id="datenschutz" className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-semibold mb-3">Datenschutz</h2>
          <p className="text-slate-300 text-sm leading-relaxed">Hinweise zum Datenschutz gemäß DSGVO – Platzhaltertext. Beschreibe Zweck, Datenkategorien, Speicherdauer und Rechte der Betroffenen.</p>
        </section>

        <Footer />
      </main>
    </div>
  )
}
