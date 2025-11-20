import { useEffect, useMemo, useState } from 'react'
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
import DecorativePhotos from './components/DecorativePhotos'
import logo from './assets/westside-furs.svg'

const ENV_BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function getSeason(date = new Date()) {
  const m = date.getMonth() + 1
  if (m === 12 || m <= 2) return 'winter'
  if (m >= 3 && m <= 5) return 'spring'
  if (m >= 6 && m <= 8) return 'summer'
  return 'autumn'
}

export default function App() {
  const [status, setStatus] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', hp: '' })

  const [legalOpen, setLegalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('contact')

  // Debug connection tester + backend URL override
  const [connState, setConnState] = useState({ checked: false, ok: false, msg: '' })
  const [backendOverride, setBackendOverride] = useState('')
  const effectiveBackendUrl = useMemo(() => {
    return (backendOverride && backendOverride.trim()) || (typeof window !== 'undefined' && window.localStorage?.getItem('backendUrlOverride')) || ENV_BACKEND_URL
  }, [backendOverride])

  // Season state
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

  useEffect(() => {
    // Initialize override from localStorage on mount
    const saved = typeof window !== 'undefined' ? window.localStorage.getItem('backendUrlOverride') : ''
    if (saved) setBackendOverride(saved)

    // Expose and log
    console.log('Backend URL (env):', ENV_BACKEND_URL)
    console.log('Backend URL (effective):', saved || ENV_BACKEND_URL)
    if (typeof window !== 'undefined') {
      window.__BACKEND_URL__ = saved || ENV_BACKEND_URL
    }
  }, [])

  const validateClient = () => {
    const problems = []
    if (!form.name || form.name.trim().length < 2) problems.push('Name (mind. 2 Zeichen)')
    if (!form.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) problems.push('E‑Mail (gültig)')
    if (!form.message || form.message.trim().length < 10) problems.push('Nachricht (mind. 10 Zeichen)')
    return problems
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')
    const problems = validateClient()
    if (problems.length) {
      setStatus('error')
      setErrorMsg(`Bitte prüfen: ${problems.join(', ')}`)
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(`${effectiveBackendUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json().catch(() => ({}))

      if (res.status === 422) {
        const detail = Array.isArray(data?.detail)
          ? data.detail.map(d => d?.msg).filter(Boolean).join('; ')
          : (data?.detail || 'Ungültige Eingaben')
        setStatus('error')
        setErrorMsg(`Bitte Eingaben korrigieren: ${detail}`)
        return
      }

      if (!res.ok) {
        const detail = data?.detail || 'Senden fehlgeschlagen'
        throw new Error(detail)
      }

      if (data && data.reason === 'rate_limited') {
        setStatus('rate_limited')
        return
      }

      setStatus('ok')
      setForm({ name: '', email: '', subject: '', message: '', hp: '' })
    } catch (e) {
      setStatus('error')
      setErrorMsg(e?.message || 'Leider ist ein Fehler aufgetreten')
    }
  }

  const checkConnection = async () => {
    setConnState({ checked: true, ok: false, msg: 'Prüfe Verbindung…' })
    try {
      const res = await fetch(`${effectiveBackendUrl}/test`)
      if (!res.ok) throw new Error(`Status ${res.status}`)
      const data = await res.json()
      setConnState({ checked: true, ok: true, msg: `OK – Backend erreichbar (${data?.backend || 'Running'})` })
    } catch (err) {
      setConnState({ checked: true, ok: false, msg: `Nicht erreichbar (${err?.message || 'Fehler'})` })
    }
  }

  const saveOverride = () => {
    try {
      const value = (backendOverride && backendOverride.trim()) || ''
      if (value) {
        window.localStorage.setItem('backendUrlOverride', value)
      } else {
        window.localStorage.removeItem('backendUrlOverride')
      }
      // Force re-run of connection state by resetting checked
      setConnState({ checked: false, ok: false, msg: '' })
    } catch {}
  }

  const resetOverride = () => {
    try {
      window.localStorage.removeItem('backendUrlOverride')
      setBackendOverride('')
      setConnState({ checked: false, ok: false, msg: '' })
    } catch {}
  }

  const baseTextClass = season === 'spring' ? 'text-slate-100' : 'text-slate-100'

  return (
    <div className={`min-h-screen ${baseTextClass}`}>
      <AnimatedBackground season={season} />
      <DecorativePhotos />
      <Navbar season={season} setSeason={setSeason} />
      <SeasonDock season={season} setSeason={setSeason} />

      <main className="pt-0">
        <section id="start" className="relative">
          <div className="relative max-w-6xl mx-auto px-6 pt-0 md:pt-0 lg:pt-0 pb-16">
            <div className="flex md:items-center md:min-h-[7rem] lg:min-h-[8rem] xl:min-h-[10rem]">
              <img src={logo} alt="Westside-Furs Logo" className="h-20 md:h-28 lg:h-32 xl:h-40 w-auto object-contain drop-shadow-sm" />
            </div>
            <h1 className={`mt-6 text-4xl md:text-6xl font-bold tracking-tight drop-shadow-sm text-center md:text-left text-white`}>Westside-Furs e. V.</h1>
            <p className={`mt-4 text-lg max-w-2xl md:text-left mx-auto md:mx-0 text-center text-slate-200/90`}>
              Wir vernetzen die Furry-Community im Westen: mit Events, kreativen Projekten und einem starken Miteinander.
            </p>
            <div className="mt-7 flex flex-wrap items-stretch gap-3 text-base md:text-lg justify-center md:justify-start">
              <a
                href="https://events.westside-furs.com/events/1/westside-furs-ev"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-1 items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md hover:from-blue-500 hover:to-indigo-500 hover:shadow-lg transition-all duration-200 ease-out transform hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900/20 h-full min-w-[12rem] text-center"
              >
                Zu unseren Events
              </a>
              <a
                href="https://cloud.westside-furs.com/index.php/apps/memories/s/galerie"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center px-5 py-3 rounded-xl border bg-white/10 border-white/20 text-white hover:bg白/20 hover:border-white/30 transition-all duration-200 ease-out transform hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring白/50 h-full min-w-[12rem] text-center"
              >
                Galerie
              </a>
              <a
                href="https://socials.westside-furs.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center px-5 py-3 rounded-xl border bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-all duration-200 ease-out transform hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 h-full min-w-[12rem] text-center"
              >
                weitere Links
              </a>
            </div>
          </div>
        </section>

        <Reveal>
          <section id="about" className="max-w-6xl mx-auto px-6 py-14">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-semibold mb-3">Wer wir sind</h2>
              <p className={`text-slate-200/90 leading-relaxed`}>
                Wir sind ein eingetragener Verein aus der Furry-Szene. Unser Fokus liegt auf Gemeinschaft, Sicherheit und Spaß –
                von Suitwalks über Stammtische bis hin zu Workshops und Charity-Aktionen.
              </p>
              <p className={`mt-4 mb-[35px] text-slate-200/90 leading-relaxed`}>
                Bei uns sind Fursuiter, Spotter, Künstler:innen, Organisator:innen und Fans willkommen. Vielfalt und Respekt
                stehen im Mittelpunkt.
              </p>
            </div>

            <div className="mt-0 grid md:grid-cols-2 gap-10 items-start">
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
        errorMsg={errorMsg}
        form={form}
        setForm={setForm}
      />

      <BackToTop />

      {/* Small floating connection/override panel */}
      <div className="fixed bottom-4 right-4 w-[22rem] max-w-[90vw] text-sm">
        <div className="backdrop-blur bg-slate-900/70 border border-slate-700/60 text-slate-200 rounded-xl p-3 shadow-lg">
          <div className="font-medium mb-1">Backend</div>
          <div className="text-xs mb-2">
            <div className="opacity-80">Aktiv: <span className="break-all">{effectiveBackendUrl}</span></div>
            <div className="opacity-60">Vorgabe: <span className="break-all">{ENV_BACKEND_URL}</span></div>
          </div>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Backend-URL überschreiben (https://...)"
              value={backendOverride}
              onChange={(e) => setBackendOverride(e.target.value)}
              className="flex-1 px-2 py-1 rounded-md bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <button onClick={saveOverride} className="px-2 py-1 rounded-md bg-indigo-600 hover:bg-indigo-500">Nutzen</button>
            <button onClick={resetOverride} className="px-2 py-1 rounded-md bg-slate-700 hover:bg-slate-600">Reset</button>
          </div>
          <button
            onClick={checkConnection}
            className="w-full px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 transition-colors text-white"
          >Verbindung testen</button>
          {connState.checked && (
            <div className={`mt-2 text-xs ${connState.ok ? 'text-emerald-400' : 'text-rose-400'}`}>
              {connState.msg}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
