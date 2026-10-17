'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Zap, Bot, ArrowDown, MapPin } from 'lucide-react';
import { HERO_DATA } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './Icons';

const line = {
  hidden: { y: '110%' },
  show: (i: number) => ({
    y: 0,
    transition: { delay: 0.15 + i * 0.12, duration: 1, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

function Line({ i, children }: { i: number; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden py-[0.04em]">
      <motion.div
        custom={i}
        variants={line}
        initial="hidden"
        animate="show"
        className="flex items-center justify-center gap-[0.12em]"
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function HeroSection({ onNav }: { onNav: (h: string) => void }) {
  const s = HERO_DATA.socials;
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const reduce = useReducedMotion();

  // Smooth whole-block exit scrub
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const headlineScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 0.35, 0]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-24 pb-16"
    >
      <div className="hero-spotlight-left pointer-events-none absolute inset-0" />
      <div className="hero-spotlight-right pointer-events-none absolute inset-0" />
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="font-mono-tech mb-8 max-w-[220px] text-[10px] leading-relaxed tracking-[0.2em] text-zinc-400 lg:absolute lg:left-10 lg:top-4 lg:mb-0"
        >
          {HERO_DATA.leftBioLines.map((l) => (
            <div key={l}>{l}</div>
          ))}
        </motion.div>

        <motion.h1
          style={
            reduce
              ? undefined
              : {
                  y: headlineY,
                  scale: headlineScale,
                  opacity: headlineOpacity,
                  willChange: 'transform, opacity',
                }
          }
          className="font-display select-none text-center uppercase leading-[0.86] tracking-[-0.03em] text-white text-[clamp(3.2rem,12.5vw,11.5rem)]"
        >
          <Line i={0}>FIGMA &amp; CODE</Line>
          <Line i={1}>
            DE
            <motion.span
              initial={{ rotate: -30, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ delay: 1, type: 'spring', stiffness: 200 }}
              className="inline-grid"
            >
              <Zap
                className="h-[0.78em] w-[0.78em] text-[#38bdf8] drop-shadow-[0_0_24px_rgba(0,240,255,.5)]"
                strokeWidth={1.6}
              />
            </motion.span>
            SIGN
          </Line>
          <Line i={2}>
            EN
            <motion.span
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.15, type: 'spring', stiffness: 180 }}
              className="inline-grid"
            >
              <motion.span
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="inline-grid"
              >
                <Bot
                  className="h-[0.78em] w-[0.78em] text-[#F5B83D] drop-shadow-[0_0_24px_rgba(245,184,61,.45)]"
                  strokeWidth={2}
                />
              </motion.span>
            </motion.span>
            GINEER
          </Line>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mt-10 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end"
        >
          <div className="flex flex-wrap gap-2">
            <span className="glass-pill flex items-center gap-2 rounded-full px-3 py-1.5 font-mono-tech text-[10px] tracking-[0.2em] text-zinc-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              AVAILABLE FOR WORK
            </span>
            <span className="glass-pill flex items-center gap-2 rounded-full px-3 py-1.5 font-mono-tech text-[10px] tracking-[0.2em] text-zinc-300">
              <MapPin className="h-3 w-3" /> {HERO_DATA.locationTag}
            </span>
          </div>
          <div className="font-mono-tech max-w-[240px] text-[10px] leading-relaxed tracking-[0.2em] text-zinc-400 md:text-right">
            {HERO_DATA.rightCollabLines.map((l) => (
              <div key={l}>{l}</div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="absolute left-5 top-1/2 hidden -translate-y-1/2 flex-col gap-4 text-zinc-500 md:flex md:left-10">
        <a href={s.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-[#00F0FF]">
          <LinkedinIcon className="h-4 w-4" />
        </a>
        <a href={s.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-[#00F0FF]">
          <GithubIcon className="h-4 w-4" />
        </a>
        <a href={s.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-[#00F0FF]">
          <InstagramIcon className="h-4 w-4" />
        </a>
      </div>

      <button
        onClick={() => onNav('#about')}
        aria-label="Scroll down"
        className="absolute bottom-8 right-5 grid h-11 w-11 place-items-center rounded-full bg-white text-black transition-transform hover:scale-110 md:right-10"
      >
        <ArrowDown className="h-4 w-4" />
      </button>
    </section>
  );
}
