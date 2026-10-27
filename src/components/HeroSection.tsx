'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, useMotionValue, useSpring } from 'framer-motion';
import { Zap, Bot, ArrowDown, MapPin } from 'lucide-react';
import { HERO_DATA } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './Icons';
import { playTactileClick } from '../hooks/useSound';

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

  // Subtle interactive mouse parallax on ambient background spotlights
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotLeftX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-24, 24]), { stiffness: 90, damping: 20 });
  const spotLeftY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-18, 18]), { stiffness: 90, damping: 20 });
  const spotRightX = useSpring(useTransform(mouseX, [-0.5, 0.5], [24, -24]), { stiffness: 90, damping: 20 });
  const spotRightY = useSpring(useTransform(mouseY, [-0.5, 0.5], [18, -18]), { stiffness: 90, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - r.left) / r.width - 0.5);
    mouseY.set((e.clientY - r.top) / r.height - 0.5);
  };

  // Smooth whole-block exit scrub
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const headlineScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 0.35, 0]);

  return (
    <section
      ref={sectionRef}
      id="home"
      onMouseMove={handleMouseMove}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-24 pb-16"
    >
      <motion.div
        style={reduce ? undefined : { x: spotLeftX, y: spotLeftY }}
        className="hero-spotlight-left pointer-events-none absolute inset-0 transition-opacity"
      />
      <motion.div
        style={reduce ? undefined : { x: spotRightX, y: spotRightY }}
        className="hero-spotlight-right pointer-events-none absolute inset-0 transition-opacity"
      />
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
              whileHover={{ scale: 1.35, rotate: 18 }}
              whileTap={{ scale: 0.85, rotate: -15 }}
              onClick={() => playTactileClick('click')}
              data-cursor="hover"
              title="Click or hover for electric spark!"
              className="inline-grid cursor-pointer select-none"
            >
              <Zap
                className="h-[0.78em] w-[0.78em] text-[#38bdf8] drop-shadow-[0_0_24px_rgba(0,240,255,.5)] transition-all duration-300 hover:drop-shadow-[0_0_36px_rgba(0,240,255,1)]"
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
              whileHover={{ scale: 1.35 }}
              whileTap={{ scale: 0.88, rotate: 12 }}
              onClick={() => playTactileClick('thock')}
              data-cursor="hover"
              title="Click or hover the bot!"
              className="inline-grid cursor-pointer select-none"
            >
              <motion.span
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="inline-grid"
              >
                <Bot
                  className="h-[0.78em] w-[0.78em] text-[#F5B83D] drop-shadow-[0_0_24px_rgba(245,184,61,.45)] transition-all duration-300 hover:drop-shadow-[0_0_36px_rgba(245,184,61,1)]"
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
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => playTactileClick('click')}
              className="glass-pill flex cursor-pointer items-center gap-2 rounded-full px-3 py-1.5 font-mono-tech text-[10px] tracking-[0.2em] text-zinc-300 transition-colors hover:border-emerald-500/40"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              AVAILABLE FOR WORK
            </motion.span>
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => playTactileClick('click')}
              className="glass-pill flex cursor-pointer items-center gap-2 rounded-full px-3 py-1.5 font-mono-tech text-[10px] tracking-[0.2em] text-zinc-300 transition-colors hover:border-[#00F0FF]/40"
            >
              <MapPin className="h-3 w-3 text-[#00F0FF]" /> {HERO_DATA.locationTag}
            </motion.span>
          </div>
          <div className="font-mono-tech max-w-[240px] text-[10px] leading-relaxed tracking-[0.2em] text-zinc-400 md:text-right">
            {HERO_DATA.rightCollabLines.map((l) => (
              <div key={l}>{l}</div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="absolute left-5 top-1/2 hidden -translate-y-1/2 flex-col gap-4 text-zinc-500 md:flex md:left-10">
        {[
          { href: s.linkedin, Icon: LinkedinIcon, label: 'LinkedIn' },
          { href: s.github, Icon: GithubIcon, label: 'GitHub' },
          { href: s.instagram, Icon: InstagramIcon, label: 'Instagram' },
        ].map(({ href, Icon, label }) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            whileHover={{ scale: 1.3, x: 4, color: '#00F0FF' }}
            whileTap={{ scale: 0.9 }}
            onClick={() => playTactileClick('click')}
            className="transition-colors hover:text-[#00F0FF]"
          >
            <Icon className="h-4 w-4" />
          </motion.a>
        ))}
      </div>

      <motion.button
        onClick={() => {
          playTactileClick('thock');
          onNav('#about');
        }}
        whileHover={{ scale: 1.15, y: 3 }}
        whileTap={{ scale: 0.92 }}
        aria-label="Scroll down"
        className="absolute bottom-8 right-5 grid h-11 w-11 place-items-center rounded-full bg-white text-black shadow-[0_10px_25px_-5px_rgba(255,255,255,0.4)] transition-all md:right-10"
      >
        <ArrowDown className="h-4 w-4" />
      </motion.button>
    </section>
  );
}
