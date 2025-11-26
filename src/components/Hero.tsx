'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const sectionRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        once: true,
      },
    });

    tl.from(imageRef.current, {
      x: -200,
      opacity: 0,
      duration: 1.4,
      ease: 'power3.out',
    }).from(
      textRef.current,
      {
        x: 200,
        opacity: 0,
        duration: 1.4,
        ease: 'power3.out',
      },
      '-=0.8'
    );
  });

  return (
    <section
      ref={sectionRef}
      className="min-h-100vh relative flex h-screen w-full flex-col items-center lg:flex-row"
    >
      {/* bg */}
      <div className="absolute top-0 left-0 hidden h-screen w-full max-w-[40%] bg-black lg:block" />
      <div className="bg-sidebar absolute top-0 right-0 hidden h-screen w-full max-w-[60%] lg:block" />
      {/* Image */}
      <div className="top-1/2 w-full">
        <Image
          ref={imageRef}
          src="/Images/hero-image.jpeg"
          alt="Hero Image"
          width={900}
          height={800}
          className="h-[400px] w-full origin-center object-cover lg:h-[600px]"
        />
      </div>

      {/* Text */}
      <div
        ref={textRef}
        className="bg-sidebar space-y-4 p-10 lg:-ml-40 lg:bg-transparent"
      >
        <h1 className="font-serif text-4xl font-bold capitalize lg:text-6xl">
          I'm Robin Will. A Product Designer <br />
          <span className="text-foreground/50">based in Italy.</span>
        </h1>
        <p className="text-foreground/90 text-base lg:text-lg">
          I'm probably the most passionate designer you will ever get to work
          with. If you have a great project that needs some amazing skills, I'm
          your guy.
        </p>
      </div>
    </section>
  );
}
