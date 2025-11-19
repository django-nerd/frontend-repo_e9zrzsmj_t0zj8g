import { useRef, useState, useEffect } from 'react'

const Link = ({ href, children }) => (
  <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="underline decoration-slate-300/70 hover:decoration-white text-slate-100 hover:text-white">
    {children}
  </a>
)

function Collapsible({ isOpen, children }) {
  const ref = useRef(null)
  const [maxH, setMaxH] = useState(0)

  // Measure content height and update max-height to enable smooth transitions,
  // including when nested content changes size while open.
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const measure = () => {
      // Use scrollHeight to capture full content height
      setMaxH(el.scrollHeight)
    }

    if (isOpen) {
      measure()
      const ro = new ResizeObserver(measure)
      ro.observe(el)
      return () => ro.disconnect()
    } else {
      setMaxH(0)
    }
  }, [isOpen, children])

  return (
    <div
      ref={ref}
      style={{ maxHeight: isOpen ? `${maxH}px` : 0 }}
      className="transition-[max-height] duration-300 ease-in-out overflow-hidden"
    >
      {children}
    </div>
  )
}

const categories = [
  {
    title: 'Eventbuchungen',
    items: [
      {
        q: 'Wie storniere ich eine Buchung?',
        a: (
          <span>
            Eine Stornierung ist leider nicht möglich. Bitte schreibe uns eine E-Mail an{' '}
            <Link href="mailto:support@westside-furs.com">support@westside-furs.com</Link>
            , damit wir dir weiterhelfen können.
          </span>
        )
      },
      {
        q: 'Wie ändere ich eine Buchung?',
        a: (
          <span>
            Eine Änderung ist nur durch Stornierung und Neubuchung möglich. Wende dich dafür ebenfalls an unseren Support unter{' '}
            <Link href="mailto:support@westside-furs.com">support@westside-furs.com</Link>
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
                <Link href="https://t.me/westsidefurs">Telegram-Infokanal</Link>
              </li>
              <li>
                Unser Telegram Bot{' '}
                <Link href="https://t.me/westsidefurs_bot">Telegram-Bot</Link>
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
      { q: 'Was ist das Furry-Fandom? 🐾', a: 'Es ist einer Fan-Gemeinde für anthropomorphe Werke jeglicher Couleur. Diese hält wegen der oftmals großen Entfernung zueinander hauptsächlich über das Internet Kontakt. Größere Treffen sind die so genannten Conventions, wie zum Beispiel die jährlich stattfindende Eurofurence oder ihr amerikanisches Pendant, die Anthrocon. Diese ziehen bei weitem nicht alle Fans an, erreichen jedoch in Europa hunderte, teils tausende, in den USA regelmäßig tausende Besucher.' },
      { q: 'Was sind Furries? 🦊', a: 'Furry ist der Sammelbegriff für eine internationale Subkultur, die an anthropomorphen Tieren in Schrift, Bild und Ton interessiert ist. Dies reicht vom typischen Werwolf bis hin zu tierischen Zeichentrick- und Comicfiguren. Die meisten Mitglieder der Subkultur stammen aus den USA, Japan, Großbritannien und Deutschland.' },
      { q: 'Was ist ein Fursuit? 👘', a: 'Die anthropomorphen Tierkostüme sind der von der Öffentlichkeit am ehesten wahrgenommene – weil optisch auffälligste – Teil der Furry-Subkultur. Dies variiert von einfachen Masken, falschen Schwänzen, Ohren etc. bis hin zu aufwendig gestalteten Kostümen mit Animatronik (z. B. bewegliche Teile). Das Wort „Fursuit“ bedeutet übersetzt Pelz-Anzug oder Fell-Kleid. Trotzdem stellen Fursuiter nur einen Teil der Furry-Subkultur dar, einer Online-Umfrage zufolge etwa 15 %.' },
      { q: 'Weitere Infos zu Fursuits 📚', a: (
        <span>
          Fursuits werden überwiegend als Einzelstück individuell geplant und gebaut (meist vom Träger selbst oder aber von internationalen Suitbauern), da industriell hergestellte Kostüme den individuellen Ansprüchen nicht gerecht werden. Die Ausstattung variiert je nach geplantem Einsatzgebiet, etwa was Robustheit, Funktionen und Sichtfeld angeht. Das Tragen der Fursuits wird im deutschsprachigen Raum häufig als Performance-Kunst verstanden. Abseits von Furry-Conventions wie der Eurofurence treten Fursuiter auch im öffentlichen Raum in Erscheinung; sei es als Teil von Paraden oder Umzügen, oder auch in speziellen Aktionen („Suitwalks“). Spirituelle Hintergründe, Rollenspiele (LARP) oder einfach nur die Faszination an der technischen Herausforderung können ebenfalls Anlass sein, einen Fursuit zu bauen und zu tragen. Der berufliche Bezug von Furrys zu Fursuits – z. B. Maskottchen oder Themenparks – ist in Europa eher von untergeordneter Bedeutung oder wird oft sogar abgelehnt. Quelle: <Link href="https://de.wikipedia.org/wiki/Furry#Fursuits">Wikipedia</Link>.
        </span>
      ) }
    ]
  },
  {
    title: 'Regeln beim Suitwalk',
    items: [
      { q: 'Suiter 🐺', a: 'Ihr habt einen Fursuit oder Partial-Suit und wollt damit beim Suitwalk mitmachen? Dann seit ihr in dieser Kategorie genau richtig und könnt euch einen Platz ergattern.' },
      { q: 'Spotter 👀', a: (
        <div className="space-y-2">
          <p>Spotter sind eine der Wichtigsten Gruppen in einem Walk. Zu den Hauptaufgaben gehören:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Auf die Suiter aufpassen, dass sie niemanden umrennen oder umgerannt werden</li>
            <li>Die Wege begutachten, ob sie Suitergerecht sind</li>
            <li>Auf eventuelle Anzeichen von Erschöpfung und/oder Hitzebedingte Probleme achten und diese schnellstmöglich den Helfern weiterleiten.</li>
            <li>Die Helfer in Notsituationen unterstützen</li>
            <li>Spotter werden von allen Suitern echt gern gesehen.</li>
          </ul>
        </div>
      ) },
      { q: 'Spotter Regelwerk 📋', a: (
        <div className="space-y-2">
          <p>Spotter sind eine der Wichtigsten Gruppen, innerhalb eines Suitwalks, doch auch für diese gibt es Regeln:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Waffen (egal ob legal oder illegal) sind nicht auf den Walks gestattet. Dazu zählen unter anderem:
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Softair-, Gas-, Schreckschuss-, Paintball-, echte Waffen (egal ob mit oder ohne Waffenschein).</li>
                <li>Teleskopschlagstöcke</li>
                <li>Kampfstöcke</li>
                <li>Pfefferspray (Ausnahme: Helfertrupp mit entsprechenden Genehmigungen)</li>
                <li>ähnliche nicht aufgeführte Gegenstände, welche als Waffe genutzt werden kann</li>
              </ul>
            </li>
            <li>Drogen und Alkoholkonsum (auch vor bzw. nach einem Walk) sind Tabu.</li>
            <li>Rassistische, gewaltverherrlichende, Obszöne Inhalte auf der Kleidung sind nicht geduldet.</li>
            <li>Jegliche Schutz und Security Markierung auf der Kleidung (Ausnahme: Helfertrupp mit entsprechenden Genehmigungen und Lehrgängen). → Für die Spotter werden blaue Armbinden zur Verfügung gestellt</li>
          </ul>
        </div>
      ) },
      { q: 'Kamerafurs 📸', a: (
        <div className="space-y-2">
          <p>Fotofurs sind, wie der Name schon sagt, die „Paparazzi“ eines Walks.</p>
          <p>Sie machen Fotos / Videos der Veranstaltung, bzw. des Suitwalks und stellen sie zur Verfügung.</p>
          <p>Dafür ist eine Cloud eingerichtet, die Fotos/Videos dazu einfach an <Link href="https://t.me/ImiakWolf">@ImiakWolf</Link> senden (Der Nutzername gilt sowohl hier im Discord, also auch im Telegram).</p>
          <p>Das in Pose setzen der Suiter steht dabei im Hauptaugenmerk. Sowohl in Gruppen als auch allein.</p>
          <p>Sammelt die bestmöglichen Schnappschüsse, bedenkt dabei aber auch, dass Suiter, welche nicht im Suit sind, oder die gerade Teile abgelegt haben, kein Fotomodell sind!!!!!!</p>
        </div>
      ) },
      { q: 'Kamerafurs Regelwerk 🧾', a: (
        <div className="space-y-2">
          <p>Für die Kamerafurs gibt es nicht viele Regeln, die eingehalten werden müssen. Die paar, die es dann doch gibt sind:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Keine Fotos von Suitern, welche gerade ein paar Teile abgelegt haben (Auch im Hintergrund)</li>
            <li>Keine Fotos in den Pausen</li>
            <li>Keine offensichtlich sexuellen oder gewaltverherrlichenden Posen, bzw. Posen, welche verbotene Inhalte beinhalten.</li>
          </ul>
          <p>Das Foto-/Videomaterial sollte nach den Walks (egal ob bearbeitet oder unbearbeitet) zu <Link href="https://t.me/ImiakWolf">ImiakWolf</Link> gesendet werden, damit das Material mit in die Cloud aufgenommen werden kann. (Natürlich dürft ihr die Fotos und Videos auch selbst verarbeiten)</p>
        </div>
      ) },
      { q: 'Zuschauer 👥', a: (
        <div className="space-y-2">
          <p>Ihr seit neu, nicht erfahren oder wollt einfach nur das bunte Treiben genießen und mit laufen?</p>
          <p>Dann tragt euch als Zuschauer ein.</p>
          <p>Ihr habt keine Verantwortung und dürft das Event in vollen Zügen genießen. Lauft mit, plaudert mit anderen oder interagiert mit den Suitern. Habt Spaß, und vielleicht gefällt es euch so sehr, dass ihr nächstes Mal vielleicht sogar Spotter macht, um den Suitern aktiv zu helfen.</p>
          <p>Bitte achtet darauf, dass ihr die Arbeit der Helfer und Spotter nicht behindert und nicht im Bild der Kamerafurs steht.</p>
        </div>
      ) },
      { q: 'Schlechtes Wetter? ☔', a: 'Sollte das Wetter schlecht sein (starker Regen / schwüle Hitze) wird der Walk abgesagt. Es bringt niemandem etwas, wenn man nach dem Walk seinen Suit nicht mehr sauber bekommt, oder man im Krankenhaus aufwacht.' }
    ]
  }
]

export default function FAQ() {
  const [openCat, setOpenCat] = useState(-1)
  const [openItem, setOpenItem] = useState({})

  return (
    <div id="faq" className="space-y-4">
      {categories.map((cat, ci) => (
        <div key={ci} className="rounded-2xl border border-slate-700/60 bg-slate-900/70 overflow-hidden">
          <button
            onClick={() => setOpenCat(openCat === ci ? -1 : ci)}
            className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-slate-800/60"
            aria-expanded={openCat === ci}
            aria-controls={`cat-panel-${ci}`}
          >
            <span className="font-semibold text-slate-100">{cat.title}</span>
            <span className="text-slate-300 text-sm">{openCat === ci ? '–' : '+'}</span>
          </button>

          <Collapsible isOpen={openCat === ci}>
            <div id={`cat-panel-${ci}`} className="divide-y divide-slate-700/60">
              {cat.items.map((it, ii) => {
                const isOpen = openItem[ci] === ii
                return (
                  <div key={ii}>
                    <button
                      onClick={() => setOpenItem({ ...openItem, [ci]: isOpen ? -1 : ii })}
                      className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-slate-800/70"
                      aria-expanded={isOpen}
                      aria-controls={`item-panel-${ci}-${ii}`}
                    >
                      <span className="text-slate-100">{it.q}</span>
                      <span className="text-slate-300 text-sm">{isOpen ? '–' : '+'}</span>
                    </button>

                    <Collapsible isOpen={isOpen}>
                      <div id={`item-panel-${ci}-${ii}`} className="px-4 pb-4 text-slate-200 text-sm leading-relaxed">
                        {it.a}
                      </div>
                    </Collapsible>
                  </div>
                )
              })}
            </div>
          </Collapsible>
        </div>
      ))}
    </div>
  )
}
