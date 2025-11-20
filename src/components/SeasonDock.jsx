import React, { useEffect, useRef, useState } from 'react'
import SeasonDial from './SeasonDial'

const DIAL_SIZE = 180

export default function SeasonDock({ season, setSeason }) {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)
  const panelRef = useRef(null)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const onClick = (e) => {
      if (!open) return
      const target = e.target
      if (panelRef.current && panelRef.current.contains(target)) return
      if (anchorRef.current && anchorRef.current.contains(target)) return
      setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    document.addEventListener('touchstart', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('touchstart', onClick)
    }
  }, [open])

  const meta = {
    winter: '❄️ Winter',
    spring: '🌸 Frühling',
    summer: '☀️ Sommer',
    autumn: '🍂 Herbst',
  }

  // Desktop-only floating control
  return (
    <div className="hidden md:block">
      <div className="relative z-30 pointer-events-auto max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex justify-end pr-14">
          <div className="mt-16 lg:mt-20 xl:mt-24 relative" ref={anchorRef}>
            {/* Trigger button exactly where the dial used to be */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="group inline-flex items-center gap-2 rounded-full bg-slate-800/70 hover:bg-slate-700/70 text-slate-100 px-4 py-2 shadow-lg ring-1 ring-white/10 backdrop-blur-sm transition-colors"
              aria-haspopup="dialog"
              aria-expanded={open}
              aria-controls="season-dial-popup"
            >
              <span className="text-base leading-none">
                {season === 'winter' ? '❄️' : season === 'spring' ? '🌸' : season === 'summer' ? '☀️' : '🍂'}
              </span>
              <span className="text-sm font-medium opacity-90 group-hover:opacity-100 transition-opacity">
                {meta[season]}
              </span>
            </button>

            {/* Popup: only as big as the dial, anchored to this spot */}
            {open && (
              <div
                id="season-dial-popup"
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                className="absolute top-0 right-0 rounded-xl shadow-2xl ring-1 ring-white/10 bg-slate-900/80 backdrop-blur-md"
                style={{ width: DIAL_SIZE, height: DIAL_SIZE, zIndex: 60 }}
              >
                <div className="absolute -top-3 -right-3">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="h-8 w-8 rounded-full bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 shadow ring-1 ring-white/10 flex items-center justify-center"
                    aria-label="Schließen"
                    title="Schließen"
                  >
                    ×
                  </button>
                </div>
                <div className="p-2">
                  <SeasonDial
                    season={season}
                    onChange={(k) => {
                      setSeason(k)
                      setOpen(false)
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
