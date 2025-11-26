'use client';

import { skillSetData, skillSetProps } from '@/constants';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const SkillSet = () => {
  const skillsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const skills = skillsRef.current?.querySelectorAll('.skill-item');

      if (skills) {
        skills.forEach(skill => {
          gsap.fromTo(
            skill,
            {
              opacity: 0,
              y: 30,
            },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: skill,
                start: 'top 85%',
                end: 'top 20%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }
    },
    { scope: skillsRef }
  );

  return (
    <section className="container grid w-full min-w-full grid-cols-1 items-center justify-center gap-10 py-16 lg:grid-cols-2">
      <div>
        <h2 className="my-5 text-4xl font-semibold lg:text-5xl">Skillset</h2>
        <p className="text-foreground/70 max-w-[70%] text-lg">
          With skills in over 4 different fields of design, I am the perfect
          person to hire when it comes to a full fledged project. Whatever your
          needs are, I can pretty much take on any challenge.
        </p>
      </div>
      <div
        ref={skillsRef}
        className="mt-10 grid w-full grid-cols-1 gap-10 lg:grid-cols-2 lg:flex-row"
      >
        {skillSetData.map((skill: skillSetProps, index) => (
          <div key={index} className="skill-item group">
            <skill.icon
              className="mb-2 text-4xl text-blue-400 transition-all duration-300 group-hover:scale-110"
              size={36}
            />
            <h3 className="mb-2 text-2xl font-semibold transition-all duration-300 group-hover:-translate-y-1">
              {skill.skill}
            </h3>
            <p className="text-foreground/80 transition-all duration-300 group-hover:-translate-y-1">
              {skill.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillSet;
