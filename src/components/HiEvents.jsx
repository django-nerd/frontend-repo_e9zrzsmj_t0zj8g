import { useEffect, useRef } from 'react'

export default function HiEventsEmbed() {
  const containerRef = useRef(null)

  // Ensure script-driven widgets can initialize after React renders
  useEffect(() => {
    // In case the script attaches an init method to window
    if (window && typeof window.hiEventsInit === 'function') {
      try {
        window.hiEventsInit()
      } catch {
        // no-op if not required
      }
    }
  }, [])

  return (
    <div ref={containerRef} className="mt-8">
      <div
        data-hievents-id="1"
        data-hievents-primary-color="#F79E00"
        data-hievents-primary-text-color="#fafafa"
        data-hievents-secondary-color="#f87172ff"
        data-hievents-secondary-text-color="#ffffff"
        data-hievents-background-color="#18181bbf"
        data-hievents-widget-type="widget"
        data-hievents-widget-version="1.0"
        data-hievents-locale="en"
        data-hievents-padding="20px"
        data-hievents-autoresize="true"
        data-hievents-continue-button-text="Jetzt dabei sein"
        className="hievents-widget"
      />
    </div>
  )
}
