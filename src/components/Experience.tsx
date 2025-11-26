'use client';

import { experienceData, ExperienceDataProps } from '@/constants';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

const colorClasses = [
  'text-blue-500',
  'text-green-500',
  'text-yellow-500',
  'text-purple-500',
];

const Experience = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const experiences =
        containerRef.current?.querySelectorAll('.experience-item');

      if (experiences) {
        gsap.fromTo(
          experiences,
          {
            x: -100,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
          }
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <section className="container min-h-[60vh] w-full min-w-full bg-black py-16 lg:h-[90vh]">
      <h3 className="text-foreground/50 text-2xl font-semibold tracking-tight">
        Work Experience
      </h3>
      <h2 className="my-5 text-4xl font-semibold lg:text-5xl">
        Companies I have worked for in the past.
      </h2>
      <div
        ref={containerRef}
        className="flex flex-col gap-6 md:flex-row lg:mt-20"
      >
        {/* Map through experienceData and render each experience */}
        {experienceData.map((experience: ExperienceDataProps, index) => (
          <div key={index} className="experience-item py-4">
            <h2 className="text-foreground/50 mb-3 text-8xl">0{index + 1}</h2>
            <h2 className="mb-3 text-2xl font-semibold">
              <span className={colorClasses[index % colorClasses.length]}>
                {experience.company},{' '}
              </span>
              {experience.position}
            </h2>
            <p className="text-foreground/90">{experience.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
