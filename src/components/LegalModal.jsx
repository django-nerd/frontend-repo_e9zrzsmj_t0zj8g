import { useEffect } from 'react'

export default function LegalModal({ open, onClose, activeTab = 'contact', setActiveTab, onSubmitContact, status, errorMsg, form, setForm }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (open) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  const TabButton = ({ id, label }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-3 py-2 rounded-lg text-sm transition-colors ${activeTab === id ? 'bg-white/10 text-white' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}
    >
      {label}
    </button>
  )

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="relative w-full max-w-5xl h-[85vh] rounded-2xl border border-slate-700/70 bg-slate-900/80 shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700/60">
            <div className="flex items-center gap-2 text-slate-200 font-medium">
              <TabButton id="contact" label="Kontakt" />
              <TabButton id="impressum" label="Impressum" />
              <TabButton id="datenschutz" label="Datenschutz" />
            </div>
            <button onClick={onClose} className="text-slate-300 hover:text-white rounded-lg px-2 py-1">✕</button>
          </div>

          <div className="h-[calc(85vh-56px)] overflow-y-auto p-6">
            {activeTab === 'contact' && (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-white">Kontakt</h2>
                <form onSubmit={onSubmitContact} className="grid md:grid-cols-2 gap-4" noValidate>
                  {/* Honeypot field: should remain empty; hidden from users */}
                  <div aria-hidden="true" className="absolute -left-[9999px] top-auto w-px h-px overflow-hidden">
                    <label>Bitte nichts hier eintragen</label>
                    <input value={form.hp} onChange={e=>setForm({...form, hp:e.target.value})} tabIndex={-1} autoComplete="off" />
                  </div>

                  <div className="md:col-span-1">
                    <label className="block text-sm mb-1">Name</label>
                    <input required value={form.name} onChange={e=>setForm({...form, name:e.target.value})} className="w-full bg-slate-950/40 border border-slate-700/60 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Dein Name" />
                  </div>
                  <div className="md:col-span-1">
                    <label className="block text-sm mb-1">E‑Mail</label>
                    <input type="email" required value={form.email} onChange={e=>setForm({...form, email:e.target.value})} className="w-full bg-slate-950/40 border border-slate-700/60 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="name@beispiel.de" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm mb-1">Betreff</label>
                    <input value={form.subject} onChange={e=>setForm({...form, subject:e.target.value})} className="w-full bg-slate-950/40 border border-slate-700/60 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Worum geht es?" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm mb-1">Nachricht</label>
                    <textarea required rows={6} value={form.message} onChange={e=>setForm({...form, message:e.target.value})} className="w-full bg-slate-950/40 border border-slate-700/60 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Schreib uns eine Nachricht..." />
                  </div>
                  <div className="md:col-span-2 flex items-center gap-3">
                    <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500">Absenden</button>
                    {status === 'sending' && <span className="text-slate-300 text-sm">Wird gesendet…</span>}
                    {status === 'ok' && <span className="text-green-300 text-sm">Danke! Wir melden uns bald.</span>}
                    {status === 'error' && (
                      <span className="text-red-300 text-sm">{errorMsg || 'Leider ist ein Fehler aufgetreten.'}</span>
                    )}
                    {status === 'rate_limited' && <span className="text-yellow-300 text-sm">Zu viele Anfragen. Bitte in einer Minute erneut versuchen.</span>}
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'impressum' && (
              <div>
                <h2 className="text-xl font-semibold mb-2 text-white">Impressum</h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Angaben gemäß § 5 TMG – Platzhalter. Sobald ihr mir die offiziellen Angaben sendet, trage ich alles ein.
                </p>
              </div>
            )}

            {activeTab === 'datenschutz' && (
              <div>
                <h2 className="text-xl font-semibold mb-2 text-white">Datenschutz</h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Hinweise nach DSGVO – Platzhalter. Ich übernehme den Text aus eurer bisherigen Seite, sobald ihr ihn freigebt.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
