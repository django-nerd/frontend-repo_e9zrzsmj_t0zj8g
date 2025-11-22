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
                  <div className="md:col-span-1">
                    <label className="block text-sm mb-1">Name</label>
                    <input required value={form.name} onChange={e=>setForm({...form, name:e.target.value})} className="w-full bg-slate-950/40 border border-slate-700/60 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Dein Name" />
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
                  <p className="text-xs text-slate-400 md:col-span-2">Oder direkt per E‑Mail: <a href="mailto:support@westside-furs.com" className="underline hover:text-white">support@westside-furs.com</a></p>
                </form>
              </div>
            )}

            {activeTab === 'impressum' && (
              <div className="prose prose-invert max-w-none">
                <h2>Impressum</h2>

                <h3>Angaben gemäß § 5 TMG</h3>
                <p>
                  Westside-Furs e.V.<br/>
                  Wallstr. 7<br/>
                  42897 Remscheid
                </p>

                <h3>Vertreten durch</h3>
                <p>Felix Gilmozzi</p>

                <h3>Kontakt</h3>
                <ul>
                  <li>Telefon: +49 (0) 170 6129211</li>
                  <li>E-Mail: <a href="mailto:imiakwolf@westside-furs.com">imiakwolf@westside-furs.com</a></li>
                </ul>

                <h3>Bankverbindung</h3>
                <ul>
                  <li>Kontoname: Westside-Furs</li>
                  <li>Inhaber: WESTSIDE FURS</li>
                  <li>IBAN: DE71 3405 0000 0012 1078 35</li>
                  <li>BIC: WELADEDRXXX</li>
                </ul>

                <h3>Redaktionell verantwortlich</h3>
                <p>
                  1. Vorsitzender<br/>
                  Felix Gilmozzi<br/>
                  Wallstr. 7<br/>
                  42897 Remscheid
                </p>

                <h3>Schatzmeister</h3>
                <p>
                  Joel Werner<br/>
                  Wallstr. 7<br/>
                  42897 Remscheid
                </p>

                <h3>Vorstandsvertretung</h3>
                <p>
                  Bennet Weisheit<br/>
                  Terofalstraße 13<br/>
                  80689 München, Hadern
                </p>

                <h3>Geltungsbereich</h3>
                <p>Das Impressum gilt für: <a href="https://westside-furs.com" target="_blank" rel="noopener noreferrer">https://westside-furs.com</a></p>

                <h3>Registereintrag</h3>
                <ul>
                  <li>Registergericht: Amtsgericht Wuppertal</li>
                  <li>Registernummer: VR 31452</li>
                </ul>

                <h3>Umsatzsteuer</h3>
                <p>Umsatzsteuer-Identifikationsnummer gem. § 27 a Umsatzsteuergesetz: (wird demnächst ergänzt)</p>

                <h3>Verantwortliche i.S.d. § 55 Abs. 2 RStV</h3>
                <p>Felix Gilmozzi, Wallstr. 7, 42897 Remscheid</p>

                <h3>EU-Streitschlichtung</h3>
                <p>
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
                  <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr/</a>.
                </p>
                <p>Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>

                <h3>Verbraucher­streit­beilegung / Universal­schlichtungs­stelle</h3>
                <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>

                <hr />
                <p className="text-xs opacity-70">Quelle: <a href="https://www.e-recht24.de/impressum-generator.html" target="_blank" rel="noopener noreferrer">https://www.e-recht24.de/impressum-generator.html</a></p>
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
