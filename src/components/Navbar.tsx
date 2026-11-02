'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion';
import { Mail, Menu, Volume2, VolumeX, X } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './Icons';
import { HERO_DATA } from '../data/portfolioData';
import { playTactileClick, toggleSound, isSoundEnabled } from '../hooks/useSound';

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Philosophy', href: '#about' },
  { label: 'Capabilities', href: '#services' },
  { label: 'Experience', href: '#work' },
  { label: 'Field Notes', href: '#field-notes' },
  { label: 'Sketchbook', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

function Clock() {
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setMounted(true);
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <span className="rounded-full border border-white/10 bg-zinc-950/90 px-3 py-1.5 font-mono-tech text-xs font-semibold tabular-nums tracking-[0.14em] text-zinc-200 backdrop-blur-xl">
      {mounted && now
        ? `${now.toLocaleTimeString('en-GB', { timeZone: 'Asia/Kolkata', hour12: false })} IST`
        : '--:--:-- IST'}
    </span>
  );
}

export default function Navbar({ onNav }: { onNav: (href: string) => void }) {
  const [active, setActive] = useState('#home');
  const [soundOn, setSoundOn] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLButtonElement>(null);

  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const s = HERO_DATA.socials;

  useEffect(() => {
    setSoundOn(isSoundEnabled());
  }, []);

  // Scroll-spy: keep the active nav pill synchronized with whichever section is in view
  useEffect(() => {
    const computeActiveSection = () => {
      const scrollBottom = window.scrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      if (docHeight - scrollBottom < 120) {
        setActive('#contact');
        return;
      }

      const triggerLine = window.innerHeight * 0.35;
      let current = '#home';

      for (const link of NAV_LINKS) {
        const id = link.href.slice(1);
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= triggerLine) {
          current = link.href;
        }
      }
      setActive(current);
    };

    computeActiveSection();
    window.addEventListener('scroll', computeActiveSection, { passive: true });
    window.addEventListener('resize', computeActiveSection, { passive: true });
    return () => {
      window.removeEventListener('scroll', computeActiveSection);
      window.removeEventListener('resize', computeActiveSection);
    };
  }, []);

  // Keyboard Escape handling & focus management for mobile drawer
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const timer = setTimeout(() => {
      firstMobileLinkRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        menuBtnRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  // Auto-hide on sustained scroll down, reveal on scroll up
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    const delta = y - prev;
    setScrolled(y > 16);
    if (y < 140) setHidden(false);
    else if (delta > 10 && !mobileMenuOpen) setHidden(true);
    else if (delta < -6) setHidden(false);
  });

  const isHidden = hidden && !focusWithin && !mobileMenuOpen;

  return (
    <motion.header
      initial={false}
      animate={{ y: isHidden ? '-110%' : '0%' }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      onFocusCapture={() => setFocusWithin(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocusWithin(false);
      }}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,padding,box-shadow] duration-300 ${
        scrolled || mobileMenuOpen
          ? 'border-b border-white/10 bg-[#080808]/95 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl md:py-3'
          : 'border-b border-white/5 bg-[#080808]/80 py-3 backdrop-blur-lg md:py-4'
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-3 px-4 md:px-8 lg:px-10">
        <Clock />

        {/* Desktop Full Pill Navigation (md and up) */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1 rounded-full border border-white/10 bg-zinc-950/95 p-1 shadow-[0_4px_24px_rgba(0,0,0,0.65)] backdrop-blur-xl md:flex"
        >
          {NAV_LINKS.map((l) => {
            const isActive = active === l.href;
            return (
              <button
                key={l.href}
                type="button"
                aria-current={isActive ? 'location' : undefined}
                onClick={() => {
                  playTactileClick('thock');
                  setActive(l.href);
                  onNav(l.href);
                }}
                className={`relative shrink-0 rounded-full px-3.5 py-2 text-xs font-medium transition-colors ${
                  isActive ? 'font-semibold text-black' : 'text-zinc-300 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-nav-pill"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-white"
                  />
                )}
                <span className="relative z-10">{l.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Controls + Mobile Hamburger Button (44x44px minimum touch targets on mobile) */}
        <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-zinc-950/90 p-1 backdrop-blur-xl">
          <button
            type="button"
            onClick={() => {
              const next = toggleSound();
              setSoundOn(next);
            }}
            aria-label={soundOn ? 'Mute sound' : 'Enable sound'}
            aria-pressed={soundOn}
            title={soundOn ? 'Tactile WebAudio sound ON (click to mute)' : 'Sound is muted (click to enable tactile audio)'}
            className="grid h-11 w-11 place-items-center rounded-full text-zinc-300 transition-colors hover:bg-white/10 hover:text-[#00F0FF] md:h-9 md:w-9"
          >
            {soundOn ? (
              <Volume2 className="h-4 w-4 text-[#00F0FF]" />
            ) : (
              <VolumeX className="h-4 w-4 text-zinc-400" />
            )}
          </button>

          {[
            { href: s.github, Icon: GithubIcon, label: 'GitHub' },
            { href: s.linkedin, Icon: LinkedinIcon, label: 'LinkedIn' },
            { href: `mailto:${s.email}`, Icon: Mail, label: 'Email' },
          ].map(({ href, Icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto:') ? undefined : '_blank'}
              rel={href.startsWith('mailto:') ? undefined : 'noreferrer'}
              aria-label={label}
              onClick={() => playTactileClick('click')}
              className="hidden h-9 w-9 place-items-center rounded-full text-zinc-300 transition-colors hover:bg-white/10 hover:text-[#00F0FF] lg:grid"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}

          {/* Mobile Hamburger Toggle (< md) */}
          <button
            ref={menuBtnRef}
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            onClick={() => {
              playTactileClick('thock');
              setMobileMenuOpen((prev) => !prev);
            }}
            className="grid h-11 w-11 place-items-center rounded-full text-zinc-200 transition-colors hover:bg-white/10 hover:text-[#00F0FF] md:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5 text-[#00F0FF]" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Collapsible Mobile Navigation Drawer (< md) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            id="mobile-nav-drawer"
            aria-label="Mobile navigation"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="mx-4 mt-2.5 max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain rounded-3xl border border-white/15 bg-zinc-950/98 p-3 shadow-2xl backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((l, idx) => {
                const isActive = active === l.href;
                return (
                  <button
                    key={l.href}
                    ref={idx === 0 ? firstMobileLinkRef : undefined}
                    type="button"
                    aria-current={isActive ? 'location' : undefined}
                    onClick={() => {
                      playTactileClick('thock');
                      setActive(l.href);
                      setMobileMenuOpen(false);
                      onNav(l.href);
                    }}
                    className={`flex min-h-[46px] w-full items-center justify-between rounded-2xl px-4 py-3 text-left font-sans-tight text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-white font-bold text-black'
                        : 'text-zinc-200 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span>{l.label}</span>
                    <span className="font-mono-tech text-xs opacity-60">0{idx + 1}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-3 flex items-center justify-around border-t border-white/10 pt-3">
              {[
                { href: s.github, Icon: GithubIcon, label: 'GitHub' },
                { href: s.linkedin, Icon: LinkedinIcon, label: 'LinkedIn' },
                { href: `mailto:${s.email}`, Icon: Mail, label: 'Email' },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={href.startsWith('mailto:') ? undefined : 'noreferrer'}
                  aria-label={label}
                  onClick={() => {
                    playTactileClick('click');
                    setMobileMenuOpen(false);
                  }}
                  className="inline-flex min-h-[44px] min-w-[44px] items-center gap-2 rounded-xl px-3 py-2 font-mono-tech text-xs text-zinc-300 hover:bg-white/10 hover:text-[#00F0FF]"
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export { InstagramIcon };
