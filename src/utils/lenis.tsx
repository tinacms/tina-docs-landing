import Lenis from 'lenis';

let lenis: Lenis | null = null;

if (typeof window !== 'undefined') {
  lenis = new Lenis({
    duration: 4,
    easing: (t: number): number => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    wheelMultiplier: 0.8,
    touchMultiplier: 0.48,
    infinite: false,
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
  });

  function raf(time: number) {
    lenis?.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}

export { lenis };
