import React, { useEffect, useRef, useState } from 'react'
import SeasonDial from './SeasonDial'
import { X } from 'lucide-react'

const DIAL_SIZE = 180
const ROTATION_MS = 600 // keep in sync with SeasonDial rotation

export default function SeasonDock({ season, setSeason }) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [show, setShow] = useState(false)
  const anchorRef = useRef(null)
  const panelRef = useRef(null)
  const closeTimer = useRef(null)

  const startOpen = () => {
    if (mounted) return setShow(true)
    setMounted(true)
    requestAnimationFrame(() => setShow(true))
  }

  const startClose = () => {
    setShow(false)
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => {
      setMounted(false)
      setOpen(false)
    }, 180) // match exit animation duration
  }

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (open) startClose()
      }
    }
    const onClick = (e) => {
      if (!open) return
      const target = e.target
      if (panelRef.current && panelRef.current.contains(target)) return
      if (anchorRef.current && anchorRef.current.contains(target)) return
      startClose()
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    document.addEventListener('touchstart', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('touchstart', onClick)
      window.clearTimeout(closeTimer.current)
    }
  }, [open])

  const meta = {
    winter: { label: 'Winter', emoji: '❄️' },
    spring: { label: 'Frühling', emoji: '🌸' },
    summer: { label: 'Sommer', emoji: '☀️' },
    autumn: { label: 'Herbst', emoji: '🍂' },
  }

  return (
    <div className="hidden md:block">
      <div className="relative z-30 pointer-events-auto max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex justify-end pr-14">
          <div className="mt-16 lg:mt-20 xl:mt-24 relative" ref={anchorRef}>
            {/* Trigger: when closed show emoji icon with text below */}
            {!open && (
              <button
                type="button"
                onClick={() => {
                  setOpen(true)
                  startOpen()
                }}
                className="group flex flex-col items-center gap-1"
                aria-haspopup="dialog"
                aria-expanded={open}
                aria-controls="season-dial-popup"
              >
                <span className="text-3xl leading-none transition-transform group-hover:scale-110">
                  {meta[season].emoji}
                </span>
                <span className="text-xs font-medium text-slate-200/90 group-hover:text-white">
                  {meta[season].label}
                </span>
              </button>
            )}

            {/* Popup: transparent container sized exactly to the dial */}
            {mounted && (
              <div
                id="season-dial-popup"
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                className="absolute top-0 right-0"
                style={{ width: DIAL_SIZE, height: DIAL_SIZE, zIndex: 60 }}
              >
                <div
                  className={
                    'h-full w-full transition duration-200 will-change-transform will-change-opacity ' +
                    (show ? 'opacity-100 scale-100 ease-out' : 'opacity-0 scale-95 ease-in')
                  }
                >
                  <div className="absolute -top-3 -right-3">
                    <button
                      type="button"
                      onClick={() => startClose()}
                      className="h-8 w-8 rounded-full bg-slate-800/80 hover:bg-slate-700/80 text-slate-100 shadow ring-1 ring-white/10 flex items-center justify-center"
                      aria-label="Schließen"
                      title="Schließen"
                    >
                      <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="">
                    <SeasonDial
                      season={season}
                      onChange={(k) => {
                        // update season then delay close until the rotation animation finishes
                        if (k !== season) setSeason(k)
                        window.setTimeout(() => {
                          startClose()
                        }, ROTATION_MS + 50)
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
