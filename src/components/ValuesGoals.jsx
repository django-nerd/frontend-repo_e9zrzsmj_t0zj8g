import Reveal from './Reveal'
import { Handshake, Users, Lightbulb, Heart } from 'lucide-react'

export default function ValuesGoals() {
  const values = [
    {
      title: 'Förderung von Toleranz und Akzeptanz',
      Icon: Handshake,
      desc:
        'Durch den Austausch mit Menschen verschiedener Hintergründe und Perspektiven fördern unsere Events Toleranz und Akzeptanz. Wir schaffen eine Umgebung, in der Vielfalt geschätzt wird.'
    },
    {
      title: 'Soziale Vernetzung',
      Icon: Users,
      desc:
        'Unsere Events sind nicht nur Unterhaltung, sondern bieten auch die Möglichkeit, neue Freundschaften zu schließen und bestehende zu vertiefen. So entsteht ein starkes soziales Netzwerk.'
    },
    {
      title: 'Austausch von Erfahrungen',
      Icon: Lightbulb,
      desc:
        'Wir teilen Geschichten, Kenntnisse und Skills. Das ist eine großartige Chance, voneinander zu lernen und die persönliche Entwicklung zu fördern.'
    },
    {
      title: 'Gemeinschaftsgefühl',
      Icon: Heart,
      desc:
        'Unsere Treffen bringen Furrys zusammen, stärken das Wir-Gefühl und geben Raum, sich mit anderen auszutauschen, die dieselbe Leidenschaft teilen.'
    }
  ]

  return (
    <div className="mt-0 grid md:grid-cols-2 gap-6">
      {values.map((v, i) => (
        <Reveal key={v.title} delay={i * 60}>
          <div className="rounded-2xl border border-slate-700/50 bg-slate-900/60 p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-white/10 grid place-items-center border border-white/20 mb-3">
                <v.Icon className="w-6 h-6 text-slate-100" aria-hidden="true" />
              </div>
              <h3 className="text-base md:text-lg font-semibold mb-2 text-white">{v.title}</h3>
              <p className="text-slate-200 text-sm leading-relaxed max-w-prose">{v.desc}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  )
}
