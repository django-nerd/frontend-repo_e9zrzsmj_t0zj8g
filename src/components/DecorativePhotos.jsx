import React, { useEffect, useRef } from 'react'

// Decorative, blurred, darkened placeholders for future photos with subtle parallax.
export default function DecorativePhotos() {
  // shared styles
  const base = 'pointer-events-none select-none fixed rounded-2xl overflow-hidden shadow-xl backdrop-opacity-0 will-change-transform';
  const fxCommon = 'opacity-70 brightness-[.65]';
  const imgBase = 'w-full h-full bg-cover bg-center';

  // simple abstract gradient placeholders
  const gradients = [
    'linear-gradient(135deg, rgba(30,41,59,0.9), rgba(2,6,23,0.9)), radial-gradient(1200px 600px at 20% 30%, rgba(56,189,248,0.25), rgba(0,0,0,0))',
    'linear-gradient(135deg, rgba(15,23,42,0.9), rgba(2,6,23,0.9)), radial-gradient(900px 500px at 80% 20%, rgba(236,72,153,0.23), rgba(0,0,0,0))',
    'linear-gradient(135deg, rgba(2,6,23,0.9), rgba(15,23,42,0.9)), radial-gradient(1000px 700px at 50% 80%, rgba(34,197,94,0.22), rgba(0,0,0,0))',
    'linear-gradient(135deg, rgba(15,23,42,0.9), rgba(2,6,23,0.9)), radial-gradient(800px 600px at 10% 90%, rgba(99,102,241,0.22), rgba(0,0,0,0))',
  ];

  // refs for parallax layers (we translate a child so outer rotation remains intact)
  const p0 = useRef(null);
  const p1 = useRef(null);
  const p2 = useRef(null);
  const p3 = useRef(null);

  useEffect(() => {
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return; // Respect user preference

    const factors = [0.15, 0.24, 0.18, 0.22]; // move slower than scroll
    let frame = null;

    const onScroll = () => {
      if (frame) return; // throttle to rAF
      frame = window.requestAnimationFrame(() => {
        const y = window.scrollY || window.pageYOffset || 0;
        const nodes = [p0.current, p1.current, p2.current, p3.current];
        nodes.forEach((node, idx) => {
          if (!node) return;
          const dy = Math.round(y * factors[idx]);
          node.style.transform = `translate3d(0, ${dy}px, 0)`;
        });
        frame = null;
      });
    };

    // initial position in case user lands scrolled
    onScroll();

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <>
      {/* Top-left card (slight blur ~2px) */}
      <div className={`${base} ${fxCommon} blur-[2px] z-[-5] top-24 left-4 sm:left-8 w-40 sm:w-56 md:w-64 aspect-[4/3] -rotate-2 sm:-rotate-3`} aria-hidden>
        <div ref={p0} className="will-change-transform">
          <div className={imgBase} style={{ backgroundImage: gradients[0] }} />
        </div>
      </div>

      {/* Top-right card (medium blur ~4px) */}
      <div className={`${base} ${fxCommon} blur-[4px] z-[-5] top-40 right-2 sm:right-8 w-36 sm:w-52 md:w-64 aspect-[1/1] rotate-3`} aria-hidden>
        <div ref={p1} className="will-change-transform">
          <div className={imgBase} style={{ backgroundImage: gradients[1] }} />
        </div>
      </div>

      {/* Middle-left card (stronger blur ~6px) */}
      <div className={`${base} ${fxCommon} blur-[6px] z-[-5] hidden sm:block top-1/2 -translate-y-1/2 left-[-20px] sm:left-4 md:left-10 w-40 md:w-56 aspect-[3/4] -rotate-6`} aria-hidden>
        <div ref={p2} className="will-change-transform">
          <div className={imgBase} style={{ backgroundImage: gradients[2] }} />
        </div>
      </div>

      {/* Bottom-right card (deep blur ~8px) */}
      <div className={`${base} ${fxCommon} blur-[8px] z-[-5] bottom-16 right-4 sm:right-10 w-44 sm:w-60 md:w-72 aspect-[16/10] rotate-2`} aria-hidden>
        <div ref={p3} className="will-change-transform">
          <div className={imgBase} style={{ backgroundImage: gradients[3] }} />
        </div>
      </div>
    </>
  );
}
