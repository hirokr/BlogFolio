'use client'
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgress() {
  const progressRef = useRef(null);

  useEffect(() => {
    const progressBar = progressRef.current;

    gsap.to(progressBar, {
      width: "100%", // Animate width from 0% → 100%
      ease: "none",  // No easing for smooth linear fill
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true, // ties animation progress to scroll position
      },
    });
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "5px",
        width: "0%",
        background: "dodgerblue",
        zIndex: 9999,
      }}
      ref={progressRef}
    />
  );
}
