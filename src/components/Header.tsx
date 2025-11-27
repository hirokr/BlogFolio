'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Menu, X, FileText, Home, Briefcase, Mail, User } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '#about', label: 'About', icon: User },
    { href: '#works', label: 'Works', icon: Briefcase },
    { href: '/blogs', label: 'Blog', icon: FileText },
    { href: '#contact', label: 'Contact', icon: Mail },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial header animation
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

      // Scroll-based header transformation
      ScrollTrigger.create({
        start: 'top -50',
        end: 99999,
        onUpdate: self => {
          setIsScrolled(self.progress > 0);
        },
      });
    });

    return () => ctx.revert();
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (isMenuOpen) {
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
  }, [isMenuOpen]);

  // Handle scrolling to section after navigation with hash
  useEffect(() => {
    if (pathname === '/' && typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash) {
        // Wait for page to load, then scroll
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            gsap.to(window, {
              duration: 1,
              scrollTo: { y: element, offsetY: 80 },
              ease: 'power3.inOut',
            });
          }
        }, 100);
      }
    }
  }, [pathname]);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    setIsMenuOpen(false);

    if (href.startsWith('#')) {
      e.preventDefault();

      // If we're not on the home page, navigate there first
      if (pathname !== '/') {
        router.push('/' + href);
      } else {
        // We're on home page, do smooth scroll
        const element = document.querySelector(href);
        if (element) {
          gsap.to(window, {
            duration: 1,
            scrollTo: { y: element, offsetY: 80 },
            ease: 'power3.inOut',
          });
        }
      }
    }
  };

  const handleLogoHover = (e: React.MouseEvent) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      rotate: 5,
      duration: 0.3,
      ease: 'back.out(1.7)',
    });
  };

  const handleLogoLeave = (e: React.MouseEvent) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      rotate: 0,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleNavItemHover = (e: React.MouseEvent) => {
    const line = e.currentTarget.querySelector('.nav-line');
    gsap.to(line, {
      scaleX: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleNavItemLeave = (e: React.MouseEvent) => {
    const line = e.currentTarget.querySelector('.nav-line');
    gsap.to(line, {
      scaleX: 0,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-background/80 border-foreground/5 border-b shadow-xl backdrop-blur-2xl'
            : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" passHref>
              <div
                ref={logoRef}
                className="relative cursor-pointer"
                onMouseEnter={handleLogoHover}
                onMouseLeave={handleLogoLeave}
              >
                <div className="group flex items-center space-x-2">
                  <div className="relative">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-purple-600 shadow-lg shadow-blue-500/20 transition-shadow duration-300 group-hover:shadow-purple-500/40">
                      <span className="text-background text-2xl font-bold">
                        A
                      </span>
                    </div>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-purple-600 opacity-20 blur-lg transition-opacity duration-300 group-hover:opacity-40"></div>
                  </div>
                  <div className="hidden sm:block">
                    <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-purple-600 bg-clip-text text-xl font-bold text-transparent">
                      Ankita
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div
              ref={navItemsRef}
              className="hidden items-center space-x-1 md:flex lg:space-x-2"
            >
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href.startsWith('#') ? '/' + link.href : link.href}
                  passHref
                  onClick={e => handleNavClick(e, link.href)}
                >
                  <div
                    className="group relative cursor-pointer px-4 py-2"
                    onMouseEnter={handleNavItemHover}
                    onMouseLeave={handleNavItemLeave}
                  >
                    <div className="text-foreground/70 group-hover:text-foreground flex items-center space-x-2 transition-colors duration-300">
                      <link.icon className="h-4 w-4" />
                      <span className="font-medium">{link.label}</span>
                    </div>
                    <div className="nav-line absolute right-0 bottom-0 left-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-blue-500 via-purple-500 to-purple-600"></div>
                  </div>
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div ref={ctaRef} className="hidden items-center space-x-4 md:flex">
              <Link
                href="/#contact"
                passHref
                onClick={e => handleNavClick(e, '#contact')}
              >
                <button
                  className="group text-background relative overflow-hidden rounded-full px-6 py-2.5 font-medium"
                  onMouseEnter={e => {
                    const shine = e.currentTarget.querySelector('.shine');
                    gsap.fromTo(
                      shine,
                      { x: '-100%' },
                      { x: '100%', duration: 0.6, ease: 'power2.inOut' }
                    );
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-purple-600"></div>
                  <div className="shine absolute inset-0 skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                  <span className="relative z-10">Let's Talk</span>
                </button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="bg-foreground/5 hover:bg-foreground/10 relative flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-300 md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="text-foreground h-6 w-6" />
              ) : (
                <Menu className="text-foreground h-6 w-6" />
              )}
            </button>
          </div>
        </nav>

        {/* Progress bar */}
        <div className="bg-foreground/5 absolute right-0 bottom-0 left-0 h-[2px]">
          <div
            className="h-full origin-left bg-gradient-to-r from-blue-500 via-purple-500 to-purple-600"
            style={{
              transform: `scaleX(${isScrolled ? 1 : 0})`,
              transition: 'transform 0.3s ease-out',
            }}
          ></div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        ref={overlayRef}
        className={`bg-background/80 fixed inset-0 z-40 backdrop-blur-sm md:hidden ${
          isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setIsMenuOpen(false)}
      ></div>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className="bg-sidebar/95 fixed top-0 right-0 bottom-0 z-50 w-80 translate-x-full transform shadow-2xl backdrop-blur-2xl md:hidden"
      >
        <div className="flex h-full flex-col p-6 pt-24">
          <div className="flex-1 space-y-2">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href.startsWith('#') ? '/' + link.href : link.href}
                passHref
                onClick={e => handleNavClick(e, link.href)}
              >
                <div className="mobile-nav-item hover:bg-foreground/5 group flex cursor-pointer items-center space-x-4 rounded-xl px-6 py-4 transition-all duration-300">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-600/20 transition-transform duration-300 group-hover:scale-110">
                    <link.icon className="h-5 w-5 text-blue-500" />
                  </div>
                  <span className="text-foreground text-lg font-medium transition-colors duration-300 group-hover:text-purple-500">
                    {link.label}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <Link
            href="/#contact"
            passHref
            onClick={e => handleNavClick(e, '#contact')}
          >
            <button className="text-background w-full rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-purple-600 py-4 font-semibold shadow-lg transition-all duration-300 hover:shadow-xl">
              Let's Talk
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
