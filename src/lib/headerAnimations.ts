import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface UseHeaderAnimationsReturn {
  headerRef: React.RefObject<HTMLElement | null>;
  logoRef: React.RefObject<HTMLDivElement | null>;
  navItemsRef: React.RefObject<HTMLDivElement | null>;
  ctaRef: React.RefObject<HTMLDivElement | null>;
}

export const useHeaderAnimations = (): UseHeaderAnimationsReturn => {
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        headerRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
      )
        .fromTo(
          logoRef.current,
          { x: -50, opacity: 0, scale: 0.8 },
          { x: 0, opacity: 1, scale: 1, duration: 0.6 },
          '-=0.5'
        )
        .fromTo(
          navItemsRef.current?.children || [],
          { y: -30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
          '-=0.4'
        )
        .fromTo(
          ctaRef.current,
          { x: 50, opacity: 0, scale: 0.8 },
          { x: 0, opacity: 1, scale: 1, duration: 0.6 },
          '-=0.6'
        );
    });

    return () => ctx.revert();
  }, []);

  return { headerRef, logoRef, navItemsRef, ctaRef };
};

export const useMobileMenuAnimations = (
  isOpen: boolean,
  mobileMenuRef: React.RefObject<HTMLDivElement>,
  overlayRef: React.RefObject<HTMLDivElement>
) => {
  useEffect(() => {
    if (isOpen) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: 'power2.out' }
        );

        gsap.fromTo(
          mobileMenuRef.current,
          { x: '100%' },
          { x: '0%', duration: 0.5, ease: 'power3.out' }
        );

        gsap.fromTo(
          mobileMenuRef.current?.querySelectorAll('.mobile-nav-item') || [],
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.2 }
        );
      });

      return () => ctx.revert();
    } else if (mobileMenuRef.current) {
      gsap.to(mobileMenuRef.current, {
        x: '100%',
        duration: 0.4,
        ease: 'power3.in',
      });
      if (overlayRef.current) {
        gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 });
      }
    }
  }, [isOpen, mobileMenuRef, overlayRef]);
};

export const headerHoverAnimations = {
  onLogoHover: (e: React.MouseEvent) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      rotate: 5,
      duration: 0.3,
      ease: 'back.out(1.7)',
    });
  },

  onLogoLeave: (e: React.MouseEvent) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      rotate: 0,
      duration: 0.3,
      ease: 'power2.out',
    });
  },

  onNavItemHover: (e: React.MouseEvent) => {
    const line = e.currentTarget.querySelector('.nav-line');
    gsap.to(line, {
      scaleX: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  },

  onNavItemLeave: (e: React.MouseEvent) => {
    const line = e.currentTarget.querySelector('.nav-line');
    gsap.to(line, {
      scaleX: 0,
      duration: 0.3,
      ease: 'power2.out',
    });
  },

  onButtonHover: (e: React.MouseEvent) => {
    const shine = e.currentTarget.querySelector('.shine');
    gsap.fromTo(
      shine,
      { x: '-100%' },
      { x: '100%', duration: 0.6, ease: 'power2.inOut' }
    );
  },
};
