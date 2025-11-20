import React, { useEffect, useRef } from 'react'

// Decorative photos with subtle parallax and depth (blur 2–8px).
// Uses temporary remote image URLs (Google Drive). Later you can swap to local files.
export default function DecorativePhotos() {
  // shared styles
  const base = 'pointer-events-none select-none fixed rounded-2xl overflow-hidden shadow-xl backdrop-opacity-0 will-change-transform';
  const fxCommon = 'opacity-80 brightness-[.75]';
  const imgBase = 'w-full h-full bg-cover bg-center';

  // Temporary image sources (converted to direct-view links)
  const images = [
    'https://drive.google.com/uc?export=view&id=1AVfbc-OibrzkVkcd0qm6z-RJoVfY7_bL',
    'https://drive.google.com/uc?export=view&id=1GfeJyjfN3gqCe3UoY4go0jYeDED09vVT',
    'https://drive.google.com/uc?export=view&id=1LR-AStban6d3kg4azGiwcwc0UwGR7hNJ',
    'https://drive.google.com/uc?export=view&id=1nm9tIe08iIxeY7xXMe6EjPQtVABr0l2C',
    'https://drive.google.com/uc?export=view&id=1uPN7WCiYi5sNHQBnUrjX4ZlE0sU2x-De',
  ];

  // refs for parallax layers (we translate a child so outer rotation remains intact)
  const p0 = useRef(null);
  const p1 = useRef(null);
  const p2 = useRef(null);
  const p3 = useRef(null);
  const p4 = useRef(null);

  useEffect(() => {
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return; // Respect user preference

    const factors = [0.14, 0.22, 0.18, 0.26, 0.12]; // move slower than scroll, varied per layer
    let frame = null;

    const onScroll = () => {
      if (frame) return; // throttle to rAF
      frame = window.requestAnimationFrame(() => {
        const y = window.scrollY || window.pageYOffset || 0;
        const nodes = [p0.current, p1.current, p2.current, p3.current, p4.current];
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
      {/* Top-left (sharpest, blur ~2px) */}
      <div className={`${base} ${fxCommon} blur-[2px] z-[-5] top-24 left-3 sm:left-8 w-40 sm:w-56 md:w-64 aspect-[4/3] -rotate-2 sm:-rotate-3`} aria-hidden>
        <div ref={p0} className="will-change-transform relative">
          <div className={imgBase} style={{ backgroundImage: `url(${images[0]})` }} />
        </div>
      </div>

      {/* Top-right (slightly softer, blur ~3px) */}
      <div className={`${base} ${fxCommon} blur-[3px] z-[-5] top-40 right-2 sm:right-8 w-36 sm:w-52 md:w-64 aspect-[1/1] rotate-3`} aria-hidden>
        <div ref={p1} className="will-change-transform relative">
          <div className={imgBase} style={{ backgroundImage: `url(${images[1]})` }} />
        </div>
      </div>

      {/* Middle-left (medium blur ~4px) - hidden on very small screens */}
      <div className={`${base} ${fxCommon} blur-[4px] z-[-5] hidden sm:block top-1/2 -translate-y-1/2 left-[-18px] sm:left-4 md:left-10 w-40 md:w-56 aspect-[3/4] -rotate-6`} aria-hidden>
        <div ref={p2} className="will-change-transform relative">
          <div className={imgBase} style={{ backgroundImage: `url(${images[2]})` }} />
        </div>
      </div>

      {/* Bottom-right (stronger blur ~6px) */}
      <div className={`${base} ${fxCommon} blur-[6px] z-[-5] bottom-16 right-4 sm:right-10 w-44 sm:w-60 md:w-72 aspect-[16/10] rotate-2`} aria-hidden>
        <div ref={p3} className="will-change-transform relative">
          <div className={imgBase} style={{ backgroundImage: `url(${images[3]})` }} />
        </div>
      </div>

      {/* Bottom-left (deep blur ~8px) */}
      <div className={`${base} ${fxCommon} blur-[8px] z-[-5] bottom-28 left-4 sm:left-12 w-36 sm:w-48 md:w-60 aspect-[10/16] -rotate-1`} aria-hidden>
        <div ref={p4} className="will-change-transform relative">
          <div className={imgBase} style={{ backgroundImage: `url(${images[4]})` }} />
        </div>
      </div>
    </>
  );
}
