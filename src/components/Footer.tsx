'use client';
import { pages, socialLinks } from '@/constants';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Link from 'next/link';
import { useRef } from 'react';

const Footer = () => {
  const ref = useRef<HTMLSpanElement>(
    null
  ) as React.MutableRefObject<HTMLSpanElement>;

  useGSAP(() => {
    const el = ref.current;

    const tween = gsap.to(el, {
      backgroundPosition: '200% 0%',
      duration: 2.5,
      ease: 'none',
      repeat: -1,
      paused: true,
    });

    el.addEventListener('mouseenter', () => tween.play());
    el.addEventListener('mouseleave', () => tween.reverse());

    return () => {
      el.removeEventListener('mouseenter', () => tween.play());
      el.removeEventListener('mouseleave', () => tween.reverse());
    };
  });
  return (
    <footer className="bg-sidebar-accent container min-h-44 min-w-full py-4 pt-14">
      {/* Logo and Social */}
      <div className="mb-10 grid w-full min-w-full grid-cols-1 gap-8 px-10 sm:grid-cols-2 lg:px-[15%]">
        <div className="flex flex-col">
          <h2 className="mb-6 font-sans text-4xl font-bold">
            <span
              ref={ref}
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-[length:300%_100%] bg-clip-text font-bold text-transparent"
            >
              Ankita.D
            </span>
          </h2>
          <div className="mb-6 flex space-x-4">
            {socialLinks.map(link => (
              <a
                key={link.name}
                href={link.url}
                aria-label={link.name}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 hover:text-blue-300"
              >
                <link.icon />
              </a>
            ))}
          </div>
          <div className="text-foreground/80 space-y-1">
            <p className="underline-animation-lr inline-block transition-all duration-300 before:bg-blue-300 hover:-translate-y-0.5 hover:text-blue-300">
              ankita@example.com
            </p>
          </div>
        </div>
        {/* Pages */}
        <div className="flex justify-end">
          <ul className="flex h-44 flex-col flex-wrap space-y-4">
            {pages.map(page => (
              <li
                key={page.name}
                className="transition-all duration-300 hover:-translate-y-1"
              >
                <Link
                  href={page.url}
                  className="text-foreground/80 underline-animation-lr my-5 transition-transform before:bg-blue-300 hover:font-semibold hover:text-blue-300"
                >
                  {page.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Copyright */}
      <div className="">
        <p className="text-foreground/60 text-center text-sm">
          &copy; {new Date().getFullYear()} Ankita.D. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
