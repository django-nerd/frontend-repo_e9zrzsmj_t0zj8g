export default function ValuesGoals() {
  const values = [
    {
      title: 'Förderung von Toleranz und Akzeptanz',
      desc:
        'Durch den Austausch mit Menschen verschiedener Hintergründe und Perspektiven fördern unsere Events Toleranz und Akzeptanz. Wir schaffen eine Umgebung, in der Vielfalt geschätzt wird.'
    },
    {
      title: 'Soziale Vernetzung',
      desc:
        'Unsere Events sind nicht nur Unterhaltung, sondern bieten auch die Möglichkeit, neue Freundschaften zu schließen und bestehende zu vertiefen. So entsteht ein starkes soziales Netzwerk.'
    },
    {
      title: 'Austausch von Erfahrungen',
      desc:
        'Wir teilen Geschichten, Kenntnisse und Skills. Das ist eine großartige Chance, voneinander zu lernen und die persönliche Entwicklung zu fördern.'
    },
    {
      title: 'Gemeinschaftsgefühl',
      desc:
        'Unsere Treffen bringen Furrys zusammen, stärken das Wir-Gefühl und geben Raum, sich mit anderen auszutauschen, die dieselbe Leidenschaft teilen.'
    }
  ]

  return (
    <div className="mt-8 grid md:grid-cols-2 gap-6">
      {values.map((v) => (
        <div key={v.title} className="rounded-2xl border border-slate-700/50 bg-slate-900/50 p-5">
          <h3 className="text-base md:text-lg font-semibold mb-2 text-white">{v.title}</h3>
          <p className="text-slate-300 text-sm leading-relaxed">{v.desc}</p>
        </div>
      ))}
    </div>
  )
}
