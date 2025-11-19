import { PlayCircle, ExternalLink } from 'lucide-react'

export default function Reviews({ season }) {
  const isSpring = season === 'spring'
  // Increase contrast in spring: use light text and brighter icons
  const cardText = isSpring ? 'text-slate-100' : 'text-white'
  const subText = isSpring ? 'text-slate-300/90' : 'text-slate-300/80'
  const iconColor = isSpring ? 'text-white' : 'text-slate-200'

  const reviews = [
    { name: 'Kai (Fursuiter)', text: 'Tolle Organisation und super Stimmung – ich habe mich sofort willkommen gefühlt.' },
    { name: 'Mira (Spotterin)', text: 'Klare Regeln und respektvoller Umgang. Die Walks machen richtig Spaß!' },
    { name: 'Robin (Künstler)', text: 'Ich konnte neue Leute kennenlernen und meine Kunst zeigen – danke für die Plattform.' },
  ]

  return (
    <section id="reviews" className="max-w-6xl mx-auto px-6 py-16">
      {/* Links Row */}
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a
          href="https://youtube.com/playlist?list=PLy1oTjXDjwe0etIxZGWF8Cxc5nclxfPNt&si=vKokqLuvb5JMoa1g"
          target="_blank"
          rel="noopener noreferrer"
          className={`group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/60 px-6 py-6 text-center ${cardText} shadow-sm backdrop-blur-sm transition-all duration-500 ease-out hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-400/40`}
        >
          <span className="absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
            background: 'radial-gradient(120px 80px at var(--x,50%) var(--y,50%), rgba(255,255,255,0.12), transparent 60%)'
          }} aria-hidden="true" />

          {/* Extern Badge */}
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-1 text-[10px] font-medium text-white/90 ring-1 ring-inset ring-white/20">
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
            Extern
          </span>

          <span className="relative block text-lg font-medium">
            <span className="bg-gradient-to-r from-pink-300 via-rose-200 to-amber-200 bg-clip-text text-transparent">
              Teilnehmer Videos
            </span>
          </span>
          <span className={`relative mt-1 block text-xs ${subText}`}>
            Hinweis: Die Links führen zu einem externen Anbieter. Wir sind nicht für den Inhalt der verlinkten Videos verantwortlich.
          </span>
          <PlayCircle className={`mx-auto mt-4 h-12 w-12 ${iconColor} opacity-95 drop-shadow-[0_0_12px_rgba(255,255,255,0.25)] group-hover:scale-105 transition-transform duration-500`} aria-hidden="true" />
          {/* idle float */}
          <span className="pointer-events-none absolute inset-0 animate-[float_6s_ease-in-out_infinite] opacity-0 group-hover:opacity-0" />
        </a>

        <a
          href="https://youtu.be/InO0BFGzZ6Y"
          target="_blank"
          rel="noopener noreferrer"
          className={`group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/60 px-6 py-6 text-center ${cardText} shadow-sm backdrop-blur-sm transition-all duration-500 ease-out hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-400/40`}
        >
          <span className="absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
            background: 'radial-gradient(120px 80px at var(--x,50%) var(--y,50%), rgba(255,255,255,0.12), transparent 60%)'
          }} aria-hidden="true" />

          {/* Extern Badge */}
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-1 text-[10px] font-medium text-white/90 ring-1 ring-inset ring-white/20">
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
            Extern
          </span>

          <span className="relative block text-lg font-medium">
            <span className="bg-gradient-to-r from-sky-300 via-emerald-200 to-lime-200 bg-clip-text text-transparent">
              WDR Beitrag vom 12.06.2023
            </span>
          </span>
          <span className={`relative mt-1 block text-xs ${subText}`}>
            Hinweis: Die Links führen zu einem externen Anbieter. Wir sind nicht für den Inhalt der verlinkten Videos verantwortlich.
          </span>
          <PlayCircle className={`mx-auto mt-4 h-12 w-12 ${iconColor} opacity-95 drop-shadow-[0_0_12px_rgba(255,255,255,0.25)] group-hover:scale-105 transition-transform duration-500`} aria-hidden="true" />
          <span className="pointer-events-none absolute inset-0 animate-[float_6s_ease-in-out_infinite] [animation-delay:1.5s] opacity-0 group-hover:opacity-0" />
        </a>
      </div>

      <h2 className="text-2xl font-semibold mb-6">Stimmen aus der Community</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((r, i) => (
          <figure key={i} className="rounded-2xl border border-slate-700/50 bg-slate-900/40 p-5">
            <blockquote className="text-slate-200">“{r.text}”</blockquote>
            <figcaption className="mt-3 text-sm text-slate-400">— {r.name}</figcaption>
          </figure>
        ))}
      </div>

      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0px)} 50% { transform: translateY(-4px)} }
      `}</style>

      <script dangerouslySetInnerHTML={{ __html: `
        (function(){
          const items = document.querySelectorAll('#reviews .group');
          items.forEach((el) => {
            el.addEventListener('mousemove', (e) => {
              const rect = el.getBoundingClientRect();
              const x = ((e.clientX - rect.left) / rect.width) * 100;
              const y = ((e.clientY - rect.top) / rect.height) * 100;
              el.style.setProperty('--x', x + '%');
              el.style.setProperty('--y', y + '%');
            });
            el.addEventListener('mouseleave', () => {
              el.style.removeProperty('--x');
              el.style.removeProperty('--y');
            });
          });
        })();
      `}} />
    </section>
  )
}
