'use client';

import { useEffect, useState } from 'react';
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
  const s = HERO_DATA.socials;

  useEffect(() => {
    setSoundOn(isSoundEnabled());
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-5 md:px-10">
      <Clock />
      <nav className="glass-pill hidden items-center gap-1 rounded-full p-1 md:flex">
        {LINKS.map((l) => (
          <button
            key={l.href}
            onClick={() => {
              playTactileClick('thock');
              setActive(l.href);
              onNav(l.href);
            }}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
              active === l.href ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            {l.label}
          </button>
        ))}
      </nav>
      <div className="flex items-center gap-1">
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
    </header>
  );
}

export { InstagramIcon };
