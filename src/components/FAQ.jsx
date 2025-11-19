import { useState } from 'react'

const categories = [
  {
    title: 'Eventbuchungen',
    items: [
      { q: 'Wie buche ich ein Event?', a: 'Eventausschreibungen mit Datum/Ort findest du auf unseren Kanälen. Melde dich über das Formular im Event-Post oder per E-Mail. Du erhältst danach eine Bestätigung.' },
      { q: 'Gibt es Wartelisten?', a: 'Ja, wenn Events ausgebucht sind, führen wir eine Warteliste und rücken nach Absage nach. Wir informieren dich per E-Mail.' },
      { q: 'Kosten & Bezahlung', a: 'Eintritte/Spenden werden in der Eventbeschreibung genannt. Bezahlung meist vor Ort oder per Überweisung laut Ankündigung.' },
    ]
  },
  {
    title: 'Furries allgemein',
    items: [
      { q: 'Muss ich einen Fursuit haben?', a: 'Nein. Mitmachen kannst du auch ohne Suit – als Künstler:in, Orga-Helfer:in oder einfach als Fan.' },
      { q: 'Ab welchem Alter?', a: 'Öffentliche Treffen sind in der Regel ab 16, Vereinsbeitritt ab 18. Details stehen in der jeweiligen Eventbeschreibung.' },
      { q: 'Ist Fotografieren erlaubt?', a: 'Nur mit Zustimmung. Respektiere Privatsphäre und frage vor dem Foto – insbesondere ohne Suit.' },
    ]
  },
  {
    title: 'Regeln beim Suitwalk',
    items: [
      { q: 'Für Fursuiter', a: 'Bleib hydrated, achte auf Hitze, nutze Spotter bei Bedarf und halte dich an Treffpunkt- und Aufstellhinweise.' },
      { q: 'Für Spotter', a: 'Achte auf Wege, Verkehr und Passant:innen, begleite die Gruppe und hilf bei kurzen Pausen und Fotos.' },
      { q: 'Für Zuschauer', a: 'Frag vor Umarmungen oder Fotos, dränge dich nicht auf und respektiere Grenzen. Kinder nur mit Einverständnis der Eltern fotografieren.' },
    ]
  }
]

export default function FAQ() {
  // All closed by default
  const [openCat, setOpenCat] = useState(-1)
  const [openItem, setOpenItem] = useState({})

  return (
    <div id="faq" className="space-y-4">
      {categories.map((cat, ci) => (
        <div key={ci} className="rounded-2xl border border-slate-700/60 bg-slate-900/40 overflow-hidden">
          <button
            onClick={() => setOpenCat(openCat === ci ? -1 : ci)}
            className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-slate-800/60"
          >
            <span className="font-semibold text-slate-100">{cat.title}</span>
            <span className="text-slate-300 text-sm">{openCat === ci ? '–' : '+'}</span>
          </button>
          {openCat === ci && (
            <div className="divide-y divide-slate-700/60">
              {cat.items.map((it, ii) => {
                const isOpen = openItem[ci] === ii
                return (
                  <div key={ii} className="">
                    <button
                      onClick={() => setOpenItem({ ...openItem, [ci]: isOpen ? -1 : ii })}
                      className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-slate-800/70"
                    >
                      <span className="text-slate-100">{it.q}</span>
                      <span className="text-slate-300 text-sm">{isOpen ? '–' : '+'}</span>
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 text-slate-300 text-sm leading-relaxed">{it.a}</div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
