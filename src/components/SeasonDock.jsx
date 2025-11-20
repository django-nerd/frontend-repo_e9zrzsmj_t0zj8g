import React from 'react'
import SeasonDial from './SeasonDial'

export default function SeasonDock({ season, setSeason }) {
  // Desktop-only floating switch aligned with layout; quartered dial variant
  return (
    <div className="hidden md:block">{/* Removed pointer-events-none to allow interactions */}
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex justify-end pr-14">
          <div className="mt-16 lg:mt-20 xl:mt-24">
            <SeasonDial season={season} onChange={setSeason} />
          </div>
        </div>
      </div>
    </div>
  )
}
