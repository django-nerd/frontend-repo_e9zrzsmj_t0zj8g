import React from 'react'
import { SeasonWheel } from './Navbar'

export default function SeasonDock({ season, setSeason }) {
  // Align the desktop season switch with the hero logo height. Hidden on mobile.
  return (
    <div className="pointer-events-none hidden md:block">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="pointer-events-auto flex justify-end">
          {/* Reduce top margin so the wheel aligns roughly with the hero logo top */}
          <div className="mt-10 lg:mt-12 xl:mt-14">
            <SeasonWheel season={season} onChange={setSeason} />
          </div>
        </div>
      </div>
    </div>
  )
}
