import React from 'react'
import { SeasonWheel } from './Navbar'

export default function SeasonDock({ season, setSeason }) {
  // Align the desktop season switch with the hero logo height. Hidden on mobile.
  return (
    <div className="pointer-events-none hidden md:block">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Move further left and down so the expanded wheel stays fully visible */}
        <div className="pointer-events-auto flex justify-end pr-14">
          <div className="mt-16 lg:mt-20 xl:mt-24">
            <SeasonWheel season={season} onChange={setSeason} />
          </div>
        </div>
      </div>
    </div>
  )
}
