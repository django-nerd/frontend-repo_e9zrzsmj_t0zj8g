import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export default function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 200)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      onClick={scrollTop}
      aria-label="Nach oben"
      className={`fixed bottom-4 right-4 z-40 transition-all duration-300 rounded-full shadow-lg border border-white/30 bg-white/70 backdrop-blur hover:bg-white ${show ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-3 pointer-events-none'}`}
    >
      <ArrowUp className="w-5 h-5 m-3 text-slate-800" />
    </button>
  )
}
