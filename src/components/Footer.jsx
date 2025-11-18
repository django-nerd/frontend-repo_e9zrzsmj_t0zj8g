export default function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-700/60 py-10 text-slate-300" id="footer">
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        <div>
          <h4 className="text-slate-100 font-semibold mb-3">Furry Verein Deutschland</h4>
          <p className="text-sm opacity-80">Gemeinschaft, Kreativität und Inklusion seit 20XX.</p>
        </div>
        <div>
          <h5 className="font-medium text-slate-200 mb-2">Rechtliches</h5>
          <ul className="space-y-2 text-sm">
            <li><a href="#impressum" className="hover:text-white">Impressum</a></li>
            <li><a href="#datenschutz" className="hover:text-white">Datenschutz</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-medium text-slate-200 mb-2">Kontakt</h5>
          <p className="text-sm opacity-80">E‑Mail: kontakt@furryverein.de</p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-6 mt-8 text-xs text-slate-500">© {new Date().getFullYear()} Furry Verein Deutschland.</div>
    </footer>
  )
}
