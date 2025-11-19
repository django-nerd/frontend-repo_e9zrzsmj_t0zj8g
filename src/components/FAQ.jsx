import { useState } from 'react'

const categories = [
  {
    title: 'Eventbuchungen',
    items: [
      {
        q: 'Wie storniere ich eine Buchung?',
        a: (
          <span>
            Eine Stornierung ist leider nicht möglich. Bitte schreibe uns eine E-Mail an{' '}
            <a href="mailto:support@westside-furs.com" className="underline text-slate-100 hover:text-white">
              support@westside-furs.com
            </a>
            , damit wir dir weiterhelfen können.
          </span>
        )
      },
      {
        q: 'Wie ändere ich eine Buchung?',
        a: (
          <span>
            Eine Änderung ist nur durch Stornierung und Neubuchung möglich. Wende dich dafür ebenfalls an unseren Support unter{' '}
            <a href="mailto:support@westside-furs.com" className="underline text-slate-100 hover:text-white">
              support@westside-furs.com
            </a>
            .
          </span>
        )
      },
      {
        q: 'Wie bleibe ich auf dem laufenden, wenn sich Änderungen ergeben?',
        a: (
          <div className="space-y-1">
            <p>Folgende Optionen stehen dir zur Verfügung:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Unser Telegram Infokanal{' '}
                <a href="https://t.me/westsidefurs" target="_blank" rel="noopener noreferrer" className="underline text-slate-100 hover:text-white">
                  https://t.me/westsidefurs
                </a>
              </li>
              <li>
                Unser Telegram Bot{' '}
                <a href="https://t.me/westsidefurs_bot" target="_blank" rel="noopener noreferrer" className="underline text-slate-100 hover:text-white">
                  https://t.me/westsidefurs_bot
                </a>
              </li>
              <li>Checke unsere Veranstaltungsseite regelmäßig</li>
              <li>In Zukunft vielleicht ein Newsletter</li>
            </ul>
          </div>
        )
      }
    ]
  },
  {
    title: 'Furries allgemein',
    items: [
      { q: 'Was ist das Furry-Fandom?', a: 'Es ist einer Fan-Gemeinde für anthropomorphe Werke jeglicher Couleur. Diese hält wegen der oftmals großen Entfernung zueinander hauptsächlich über das Internet Kontakt. Größere Treffen sind die so genannten Conventions, wie zum Beispiel die jährlich stattfindende Eurofurence oder ihr amerikanisches Pendant, die Anthrocon. Diese ziehen bei weitem nicht alle Fans an, erreichen jedoch in Europa hunderte, teils tausende, in den USA regelmäßig tausende Besucher.' },
      { q: 'Was sind Furries?', a: 'Furry ist der Sammelbegriff für eine internationale Subkultur, die an anthropomorphen Tieren in Schrift, Bild und Ton interessiert ist. Dies reicht vom typischen Werwolf bis hin zu tierischen Zeichentrick- und Comicfiguren. Die meisten Mitglieder der Subkultur stammen aus den USA, Japan, Großbritannien und Deutschland.' },
      { q: 'Was ist ein sogenannter Fursuit?', a: 'Die anthropomorphen Tierkostüme sind der von der Öffentlichkeit am ehesten wahrgenommene – weil optisch auffälligste – Teil der Furry-Subkultur. Dies variiert von einfachen Masken, falschen Schwänzen, Ohren etc. bis hin zu aufwendig gestalteten Kostümen mit Animatronik (z. B. bewegliche Teile). Das Wort „Fursuit“ bedeutet übersetzt Pelz-Anzug oder Fell-Kleid. Trotzdem stellen Fursuiter nur einen Teil der Furry-Subkultur dar, einer Online-Umfrage zufolge etwa 15 %.' },
      { q: 'Weitere Infos zu Fursuits', a: 'Fursuits werden überwiegend als Einzelstück individuell geplant und gebaut (meist vom Träger selbst oder aber von internationalen Suitbauern), da industriell hergestellte Kostüme den individuellen Ansprüchen nicht gerecht werden. Die Ausstattung variiert je nach geplantem Einsatzgebiet, etwa was Robustheit, Funktionen und Sichtfeld angeht. Das Tragen der Fursuits wird im deutschsprachigen Raum häufig als Performance-Kunst verstanden. Abseits von Furry-Conventions wie der Eurofurence treten Fursuiter auch im öffentlichen Raum in Erscheinung; sei es als Teil von Paraden oder Umzügen, oder auch in speziellen Aktionen („Suitwalks“). Spirituelle Hintergründe, Rollenspiele (LARP) oder einfach nur die Faszination an der technischen Herausforderung können ebenfalls Anlass sein, einen Fursuit zu bauen und zu tragen. Der berufliche Bezug von Furrys zu Fursuits – z. B. Maskottchen oder Themenparks – ist in Europa eher von untergeordneter Bedeutung oder wird oft sogar abgelehnt. Quelle: https://de.wikipedia.org/wiki/Furry#Fursuits' }
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
  // Alle Kategorien sind standardmäßig eingeklappt
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
