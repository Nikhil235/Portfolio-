'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion';
import { Mail, Volume2, VolumeX } from 'lucide-react';
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
    <span className="hidden rounded-full border border-white/10 bg-zinc-950/90 px-3.5 py-1.5 font-mono-tech text-xs font-semibold tabular-nums tracking-[0.14em] text-zinc-200 backdrop-blur-xl sm:inline-block">
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

  // Auto-hide on sustained scroll down, reveal on scroll up
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    const delta = y - prev;
    setScrolled(y > 16);
    if (y < 140) setHidden(false);
    else if (delta > 10) setHidden(true);
    else if (delta < -6) setHidden(false);
  });

  const isHidden = hidden && !focusWithin;

  return (
    <motion.header
      initial={false}
      animate={{ y: isHidden ? '-110%' : '0%' }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      onFocusCapture={() => setFocusWithin(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocusWithin(false);
      }}
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-3 px-4 transition-[background-color,border-color,padding,box-shadow] duration-300 md:px-10 ${
        scrolled
          ? 'border-b border-white/10 bg-[#080808]/90 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl'
          : 'border-b border-white/5 bg-[#080808]/80 py-4 backdrop-blur-lg'
      }`}
    >
      <Clock />

      <nav
        aria-label="Primary navigation"
        className="flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-white/10 bg-zinc-950/95 p-1 shadow-[0_4px_24px_rgba(0,0,0,0.65)] backdrop-blur-xl"
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
              className={`relative shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                isActive ? 'text-black font-semibold' : 'text-zinc-300 hover:text-white'
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
          className="grid h-8 w-8 place-items-center rounded-full text-zinc-300 transition-colors hover:bg-white/10 hover:text-[#00F0FF]"
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
            className="hidden h-8 w-8 place-items-center rounded-full text-zinc-300 transition-colors hover:bg-white/10 hover:text-[#00F0FF] lg:grid"
          >
            <Icon className="h-4 w-4" />
          </a>
        ))}
      </div>
    </motion.header>
  );
}

export { InstagramIcon };
