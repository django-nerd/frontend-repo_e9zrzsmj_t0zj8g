export default function Reviews() {
  const reviews = [
    { name: 'Kai (Fursuiter)', text: 'Tolle Organisation und super Stimmung – ich habe mich sofort willkommen gefühlt.' },
    { name: 'Mira (Spotterin)', text: 'Klare Regeln und respektvoller Umgang. Die Walks machen richtig Spaß!' },
    { name: 'Robin (Künstler)', text: 'Ich konnte neue Leute kennenlernen und meine Kunst zeigen – danke für die Plattform.' },
  ]

  return (
    <section id="reviews" className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-2xl font-semibold mb-6">Stimmen aus der Community</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((r, i) => (
          <figure key={i} className="rounded-2xl border border-slate-700/50 bg-slate-900/40 p-5">
            <blockquote className="text-slate-200">“{r.text}”</blockquote>
            <figcaption className="mt-3 text-sm text-slate-400">— {r.name}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
