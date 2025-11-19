export default function ValuesGoals() {
  const values = [
    { title: 'Gemeinschaft', desc: 'Wir schaffen sichere und inklusive Räume für Begegnung und Freundschaft.' },
    { title: 'Kreativität', desc: 'Wir fördern Kunst, Performance und Projekte aus der Community.' },
    { title: 'Verantwortung', desc: 'Wir handeln respektvoll, nachhaltig und transparent.' },
  ]

  const goals = [
    'Regelmäßige Treffpunkte und Suitwalks mit klaren Guidelines',
    'Workshops und Mentoring für Künstler:innen und Newcomer',
    'Charity- und Inklusionsprojekte, die etwas bewirken',
  ]

  return (
    <div className="mt-8 grid lg:grid-cols-2 gap-8">
      <div className="rounded-2xl border border-slate-700/50 bg-slate-900/40 p-6">
        <h3 className="text-lg font-semibold mb-3">Unsere Werte</h3>
        <ul className="space-y-3">
          {values.map((v) => (
            <li key={v.title} className="">
              <div className="font-medium text-slate-100">{v.title}</div>
              <div className="text-slate-300 text-sm">{v.desc}</div>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-slate-700/50 bg-slate-900/40 p-6">
        <h3 className="text-lg font-semibold mb-3">Unsere Ziele</h3>
        <ul className="list-disc list-inside space-y-2 text-slate-300 text-sm">
          {goals.map((g, i) => (
            <li key={i}>{g}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
