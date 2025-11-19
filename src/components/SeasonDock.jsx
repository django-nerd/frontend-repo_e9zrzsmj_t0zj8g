import React from 'react'
import { SeasonWheel } from './Navbar'

export default function SeasonDock({ season, setSeason }) {
  // Place the season switch clearly below the fixed header menu
  return (
    <div className="pointer-events-none">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="pointer-events-auto flex justify-end">
          <div className="mt-20 md:mt-24">{/* push far enough below the header */}
            <SeasonWheel season={season} onChange={setSeason} />
          </div>
        </div>
      </div>
    </div>
  )
}
