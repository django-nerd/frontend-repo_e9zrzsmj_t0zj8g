import React from 'react'

// Bildpfade oben definieren. Lege deine Dateien in den Ordner "/decorative" (im public-Verzeichnis).
// Beispiel: 
//   - /decorative/bg-1.avif
//   - /decorative/bg-2.webp
// Wenn eine Variable leer ("" oder null) ist, wird weiterhin der jeweilige Farbverlauf genutzt.

// Ordnerpfad (öffentlich erreichbar). Du kannst ihn bei Bedarf anpassen.
const PUBLIC_DIR = '/decorative'

// Pro Kasten optional ein Bild angeben (Dateiname inkl. Endung). Beispiel: 'bg-1.avif'
const IMG_TOP_LEFT = ''
const IMG_TOP_RIGHT = ''
const IMG_MIDDLE_LEFT = ''
const IMG_BOTTOM_RIGHT = ''
const IMG_BOTTOM_LEFT = ''

export default function DecorativePhotos() {
  const base = 'pointer-events-none select-none fixed rounded-2xl overflow-hidden shadow-xl backdrop-opacity-0 will-change-transform';
  const fxCommon = 'opacity-70';

  const asBg = (fileOrEmpty, fallbackGradient) => {
    const hasImg = typeof fileOrEmpty === 'string' && fileOrEmpty.trim().length > 0
    const backgroundImage = hasImg ? `url(${PUBLIC_DIR}/${fileOrEmpty})` : fallbackGradient
    return {
      backgroundImage,
      backgroundSize: hasImg ? 'cover' : undefined,
      backgroundPosition: hasImg ? 'center' : undefined,
      backgroundRepeat: hasImg ? 'no-repeat' : undefined,
    }
  }

  return (
    <>
      {/* Top-left */}
      <div
        className={`${base} ${fxCommon} z-[-5] top-24 left-3 sm:left-8 w-40 sm:w-56 md:w-64 aspect-[4/3] -rotate-2 sm:-rotate-3`}
        aria-hidden
        style={{
          ...asBg(
            IMG_TOP_LEFT,
            'radial-gradient(120% 120% at 30% 30%, rgba(125,211,252,0.35) 0%, rgba(59,130,246,0.25) 45%, rgba(15,23,42,0.0) 80%)'
          ),
          filter: 'blur(2px)'
        }}
      />

      {/* Top-right */}
      <div
        className={`${base} ${fxCommon} z-[-5] top-40 right-2 sm:right-8 w-36 sm:w-52 md:w-64 aspect-[1/1] rotate-3`}
        aria-hidden
        style={{
          ...asBg(
            IMG_TOP_RIGHT,
            'radial-gradient(110% 110% at 70% 30%, rgba(99,102,241,0.35) 0%, rgba(168,85,247,0.28) 50%, rgba(15,23,42,0.0) 78%)'
          ),
          filter: 'blur(3px)'
        }}
      />

      {/* Middle-left (hidden on very small screens) */}
      <div
        className={`${base} ${fxCommon} z-[-5] hidden sm:block top-1/2 -translate-y-1/2 left-[-18px] sm:left-4 md:left-10 w-40 md:w-56 aspect-[3/4] -rotate-6`}
        aria-hidden
        style={{
          ...asBg(
            IMG_MIDDLE_LEFT,
            'radial-gradient(130% 130% at 40% 60%, rgba(34,197,94,0.32) 0%, rgba(16,185,129,0.26) 45%, rgba(15,23,42,0.0) 80%)'
          ),
          filter: 'blur(4px)'
        }}
      />

      {/* Bottom-right */}
      <div
        className={`${base} ${fxCommon} z-[-5] bottom-16 right-4 sm:right-10 w-44 sm:w-60 md:w-72 aspect-[16/10] rotate-2`}
        aria-hidden
        style={{
          ...asBg(
            IMG_BOTTOM_RIGHT,
            'radial-gradient(120% 120% at 60% 70%, rgba(251,191,36,0.30) 0%, rgba(244,114,182,0.26) 48%, rgba(15,23,42,0.0) 78%)'
          ),
          filter: 'blur(6px)'
        }}
      />

      {/* Bottom-left */}
      <div
        className={`${base} ${fxCommon} z-[-5] bottom-28 left-4 sm:left-12 w-36 sm:w-48 md:w-60 aspect-[10/16] -rotate-1`}
        aria-hidden
        style={{
          ...asBg(
            IMG_BOTTOM_LEFT,
            'radial-gradient(120% 120% at 40% 70%, rgba(56,189,248,0.32) 0%, rgba(34,211,238,0.26) 45%, rgba(15,23,42,0.0) 78%)'
          ),
          filter: 'blur(8px)'
        }}
      />
    </>
  )
}
