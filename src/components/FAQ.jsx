import { useState } from 'react'

const items = [
  {
    q: 'Was ist ein Furry Verein?',
    a: 'Wir sind ein gemeinnütziger Zusammenschluss von Menschen, die Anthropomorphie und die kreative Furry‑Kultur lieben – von Kostümen (Fursuits) über Kunst bis hin zu Community‑Events.'
  },
  {
    q: 'Muss ich einen Fursuit haben?',
    a: 'Nein. Viele unserer Mitglieder haben keinen Fursuit. Mitmachen kannst du auch als Künstler:in, Autor:in, Orga‑Helfer:in oder einfach als Fan.'
  },
  {
    q: 'Ab welchem Alter kann ich teilnehmen?',
    a: 'Öffentliche Treffen sind in der Regel ab 16, Vereinsbeitritt ab 18 Jahren. Details stehen jeweils in den Event‑Infos.'
  },
  {
    q: 'Wie kann ich mithelfen?',
    a: 'Wir freuen uns über helfende Pfoten! Schreib uns einfach über das Kontaktformular – wir melden uns mit Möglichkeiten für Orga, Social Media oder Event‑Support.'
  }
]

export default function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <div className="space-y-3">
      {items.map((it, i) => {
        const isOpen = open === i
        return (
          <div key={i} className="border border-slate-700/60 rounded-xl overflow-hidden bg-slate-800/50">
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="w-full flex items-center justify-between gap-4 px-4 py-3 text-left hover:bg-slate-800/70 transition-colors"
              aria-expanded={isOpen}
            >
              <span className="font-medium text-slate-100">{it.q}</span>
              <span className="text-slate-300 text-sm">{isOpen ? '–' : '+'}</span>
            </button>
            {isOpen && (
              <div className="px-4 pb-4 text-slate-300 leading-relaxed">
                {it.a}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
