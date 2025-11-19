import React from 'react'
import { SeasonWheel } from './Navbar'

export default function SeasonDock({ season, setSeason }) {
  // Docked control below the header so the wheel is fully visible
  return (
    <div className="pointer-events-none">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="pointer-events-auto flex justify-end md:justify-center">
          <div className="mt-4 md:mt-6">
            <SeasonWheel season={season} onChange={setSeason} />
          </div>
        </div>
      </div>
    </div>
  )
}
