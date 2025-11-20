import React from 'react'

// Decorative, blurred, darkened placeholders for future photos.
// Swap each "bg-[image]" style later with real image URLs.
export default function DecorativePhotos() {
  // shared styles
  const base = 'pointer-events-none select-none fixed rounded-3xl overflow-hidden shadow-xl backdrop-opacity-0'
  const fx = 'blur-md md:blur-lg opacity-60 md:opacity-70 brightness-[.65]'
  const imgBase = 'w-full h-full bg-cover bg-center'

  // simple abstract gradient placeholders
  const gradients = [
    'linear-gradient(135deg, rgba(30,41,59,0.9), rgba(2,6,23,0.9)), radial-gradient(1200px 600px at 20% 30%, rgba(56,189,248,0.25), rgba(0,0,0,0))',
    'linear-gradient(135deg, rgba(15,23,42,0.9), rgba(2,6,23,0.9)), radial-gradient(900px 500px at 80% 20%, rgba(236,72,153,0.23), rgba(0,0,0,0))',
    'linear-gradient(135deg, rgba(2,6,23,0.9), rgba(15,23,42,0.9)), radial-gradient(1000px 700px at 50% 80%, rgba(34,197,94,0.22), rgba(0,0,0,0))',
    'linear-gradient(135deg, rgba(15,23,42,0.9), rgba(2,6,23,0.9)), radial-gradient(800px 600px at 10% 90%, rgba(99,102,241,0.22), rgba(0,0,0,0))',
  ]

  return (
    <>
      {/* Top-left card */}
      <div className={`${base} ${fx} z-[-5] top-24 left-4 sm:left-8 w-40 sm:w-56 md:w-64 aspect-[4/3] -rotate-2 sm:-rotate-3`}
           aria-hidden>
        <div className={imgBase} style={{ backgroundImage: gradients[0] }} />
      </div>

      {/* Top-right card */}
      <div className={`${base} ${fx} z-[-5] top-40 right-2 sm:right-8 w-36 sm:w-52 md:w-64 aspect-[1/1] rotate-3`}
           aria-hidden>
        <div className={imgBase} style={{ backgroundImage: gradients[1] }} />
      </div>

      {/* Middle-left card (hidden on very small screens) */}
      <div className={`${base} ${fx} z-[-5] hidden sm:block top-1/2 -translate-y-1/2 left-[-20px] sm:left-4 md:left-10 w-40 md:w-56 aspect-[3/4] -rotate-6`}
           aria-hidden>
        <div className={imgBase} style={{ backgroundImage: gradients[2] }} />
      </div>

      {/* Bottom-right card */}
      <div className={`${base} ${fx} z-[-5] bottom-16 right-4 sm:right-10 w-44 sm:w-60 md:w-72 aspect-[16/10] rotate-2`}
           aria-hidden>
        <div className={imgBase} style={{ backgroundImage: gradients[3] }} />
      </div>
    </>
  )
}
