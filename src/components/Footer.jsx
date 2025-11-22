export default function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-700/60 py-10 text-slate-300 bg-slate-900/70 backdrop-blur-sm" id="footer">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        <div>
          <h4 className="text-slate-100 font-semibold mb-3">Westside-Furs e. V.</h4>
          <p className="text-sm opacity-80">Gemeinschaft, Kreativität und Inklusion im Westen.</p>
        </div>
        <div>
          <h5 className="font-medium text-slate-200 mb-2">Rechtliches</h5>
          <ul className="space-y-2 text-sm">
            <li><button onClick={() => document.dispatchEvent(new CustomEvent('open-legal', { detail: { tab: 'impressum' } }))} className="hover:text-white underline">Impressum</button></li>
            <li><button onClick={() => document.dispatchEvent(new CustomEvent('open-legal', { detail: { tab: 'datenschutz' } }))} className="hover:text-white underline">Datenschutz</button></li>
          </ul>
        </div>
        <div>
          <h5 className="font-medium text-slate-200 mb-2">Kontakt</h5>
          <p className="text-sm opacity-80">E‑Mail: support@westside-furs.com</p>
          <button onClick={() => document.dispatchEvent(new CustomEvent('open-legal', { detail: { tab: 'contact' } }))} className="mt-2 text-sm underline hover:text-white">Kontaktformular öffnen</button>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 mt-8 text-xs text-slate-500">© {new Date().getFullYear()} Westside-Furs e. V.</div>
    </footer>
  )
}
