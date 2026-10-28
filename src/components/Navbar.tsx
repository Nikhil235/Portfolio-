'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion';
import { Mail, Volume2, VolumeX } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './Icons';
import { HERO_DATA } from '../data/portfolioData';
import { playTactileClick, toggleSound, isSoundEnabled } from '../hooks/useSound';

const LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
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
    <span className="font-mono-tech text-sm font-semibold tabular-nums tracking-[0.15em] text-white">
      {mounted && now
        ? `${now.toLocaleTimeString('en-GB', { timeZone: 'Asia/Kolkata', hour12: false })} IST`
        : '--:--:-- IST'}
    </span>
  );
}

export default function Navbar({ onNav }: { onNav: (href: string) => void }) {
  const [active, setActive] = useState('#home');
  const [soundOn, setSoundOn] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const s = HERO_DATA.socials;

  useEffect(() => {
    setSoundOn(isSoundEnabled());
  }, []);

  // Auto-hide on scroll down, reveal on scroll up. A small delta threshold
  // avoids flicker from Lenis' sub-pixel easing at the end of a scroll.
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    const delta = y - prev;
    setScrolled(y > 24);
    if (y < 120) setHidden(false);
    else if (delta > 6) setHidden(true);
    else if (delta < -6) setHidden(false);
  });

  const isHidden = hidden && !focusWithin;

  return (
    <motion.header
      initial={false}
      animate={{ y: isHidden ? '-110%' : '0%' }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      onFocusCapture={() => setFocusWithin(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocusWithin(false);
      }}
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 transition-[background-color,border-color,padding,backdrop-filter] duration-300 md:px-10 ${
        scrolled
          ? 'border-b border-white/5 bg-neutral-950/70 py-3 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent py-5'
      }`}
    >
      <Clock />
      <nav className="glass-pill hidden items-center gap-1 rounded-full p-1 md:flex">
        {LINKS.map((l) => {
          const isActive = active === l.href;
          return (
            <button
              key={l.href}
              onClick={() => {
                playTactileClick('thock');
                setActive(l.href);
                onNav(l.href);
              }}
              className={`relative rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                isActive ? 'text-black' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="active-nav-pill"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  className="absolute inset-0 rounded-full bg-white"
                />
              )}
              <span className="relative z-10">{l.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="flex items-center gap-2">

        <button
          onClick={() => {
            const next = toggleSound();
            setSoundOn(next);
          }}
          aria-label={soundOn ? 'Mute sound' : 'Enable sound'}
          title={soundOn ? 'Tactile WebAudio sound ON' : 'Tactile WebAudio sound OFF'}
          className="grid h-9 w-9 place-items-center rounded-full text-zinc-400 transition-colors hover:bg-white/5 hover:text-[#00F0FF]"
        >
          {soundOn ? <Volume2 className="h-4 w-4 text-[#00F0FF]" /> : <VolumeX className="h-4 w-4 text-zinc-600" />}
        </button>
        {[
          { href: s.github, Icon: GithubIcon, label: 'GitHub' },
          { href: s.linkedin, Icon: LinkedinIcon, label: 'LinkedIn' },
          { href: `mailto:${s.email}`, Icon: Mail, label: 'Email' },
        ].map(({ href, Icon, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            onClick={() => playTactileClick('click')}
            className="grid h-9 w-9 place-items-center rounded-full text-zinc-400 transition-colors hover:bg-white/5 hover:text-[#00F0FF]"
          >
            <Icon className="h-4 w-4" />
          </a>
        ))}
      </div>
    </motion.header>
  );
}

export { InstagramIcon };
