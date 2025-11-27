import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register the ScrollToPlugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollToPlugin);
}

export const smoothScrollTo = (
  target: string | Element | number,
  duration: number = 1,
  offset: number = 80
) => {
  if (typeof window === 'undefined') return;

  const scrollTarget =
    typeof target === 'string' ? document.querySelector(target) : target;

  if (!scrollTarget && typeof target !== 'number') {
    console.warn(`Scroll target not found: ${target}`);
    return;
  }

  gsap.to(window, {
    duration,
    scrollTo: {
      y: scrollTarget || target,
      offsetY: offset,
      autoKill: true,
    },
    ease: 'power3.inOut',
  });
};

export const smoothScrollToTop = (duration: number = 1) => {
  smoothScrollTo(0, duration, 0);
};
