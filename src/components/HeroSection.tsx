import { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from 'framer-motion';
import { Zap, Bot, ArrowDown, ArrowUpRight, MapPin } from 'lucide-react';
import { HERO_DATA } from '../data/portfolioData';
import { playTactileClick } from '../hooks/useSound';

const line = {
  hidden: { y: '105%' },
  show: (i: number) => ({
    y: 0,
    transition: { delay: 0.08 + i * 0.1, duration: 0.85, ease: [0.16, 1, 0.3, 1] as const },
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

function ElectricZap() {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string }[]>([]);

  const triggerSpark = () => {
    playTactileClick('spark');
    const newParticles = Array.from({ length: 12 }).map((_, idx) => {
      const angle = (idx / 12) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      const distance = 40 + Math.random() * 40;
      return {
        id: Date.now() + idx + Math.random(),
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        color: idx % 3 === 0 ? '#F5B83D' : '#00F0FF',
      };
    });
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 550);
  };

  return (
    <span className="relative inline-grid place-items-center">
      <motion.span
        whileHover={{ scale: 1.25, rotate: 14 }}
        whileTap={{ scale: 0.9, rotate: -14 }}
        onClick={triggerSpark}
        onMouseEnter={() => {
          if (particles.length === 0) triggerSpark();
        }}
        data-cursor="hover"
        title="Click or hover for electric spark"
        className="inline-grid cursor-pointer select-none"
      >
        <Zap
          className="h-[0.78em] w-[0.78em] text-[#38bdf8] drop-shadow-[0_0_24px_rgba(0,240,255,.5)] transition-all duration-300 hover:drop-shadow-[0_0_42px_rgba(0,240,255,1)]"
          strokeWidth={1.75}
        />
      </motion.span>
      <AnimatePresence>
        {particles.map((p) => (
          <motion.span
            key={p.id}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1.4 }}
            animate={{ x: p.x, y: p.y, opacity: 0, scale: 0.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="pointer-events-none absolute h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: p.color, boxShadow: `0 0 12px ${p.color}` }}
          />
        ))}
      </AnimatePresence>
    </span>
  );
}

function InteractiveBot() {
  const [bouncing, setBouncing] = useState(false);

  const triggerBounce = () => {
    playTactileClick('thock');
    setBouncing(true);
    setTimeout(() => setBouncing(false), 600);
  };

  return (
    <motion.span
      whileHover={{ scale: 1.25 }}
      whileTap={{ scale: 0.9, rotate: 12 }}
      onClick={triggerBounce}
      onMouseEnter={() => {
        if (!bouncing) triggerBounce();
      }}
      data-cursor="hover"
      title="Click or hover the bot"
      className="inline-grid cursor-pointer select-none"
    >
      <motion.span
        animate={
          bouncing
            ? { y: [0, -20, 4, -6, 0], rotate: [0, -14, 10, -5, 0] }
            : { y: [0, -6, 0] }
        }
        transition={
          bouncing
            ? { duration: 0.55, ease: [0.23, 1, 0.32, 1] }
            : { repeat: Infinity, duration: 3, ease: 'easeInOut' }
        }
        className="inline-grid"
      >
        <Bot
          className="h-[0.78em] w-[0.78em] text-[#F5B83D] drop-shadow-[0_0_24px_rgba(245,184,61,.45)] transition-all duration-300 hover:drop-shadow-[0_0_42px_rgba(245,184,61,1)]"
          strokeWidth={2}
        />
      </motion.span>
    </motion.span>
  );
}

export default function HeroSection({ onNav }: { onNav: (h: string) => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const reduce = useReducedMotion();

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

  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const headlineScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 0.4, 0]);

  return (
    <section
      ref={sectionRef}
      id="home"
      onMouseMove={handleMouseMove}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-28 pb-20"
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
        {/* Top Positioning Callout */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="font-mono-tech mb-6 flex flex-col justify-between gap-4 text-xs leading-relaxed tracking-[0.16em] text-zinc-300 md:flex-row md:items-start"
        >
          <div className="max-w-xs space-y-0.5">
            {HERO_DATA.leftBioLines.map((l, idx) => (
              <div key={l} className={idx === 0 ? 'font-semibold text-white' : 'text-zinc-300'}>
                {l}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <span className="glass-pill inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono-tech text-xs tracking-[0.15em] text-zinc-200">
              <MapPin className="h-3.5 w-3.5 text-[#00F0FF]" /> {HERO_DATA.locationTag}
            </span>
          </div>
        </motion.div>

        {/* Display Headline — Icons animate in sync with their line so there is never an empty gap */}
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
          className="font-display select-none text-center uppercase leading-[0.86] tracking-[-0.03em] text-white text-[clamp(3.1rem,12vw,11.2rem)]"
        >
          <Line i={0}>FIGMA &amp; CODE</Line>
          <Line i={1}>
            DE<ElectricZap />SIGN
          </Line>
          <Line i={2}>
            EN<InteractiveBot />GINEER
          </Line>
        </motion.h1>

        {/* Bottom Primary CTA & Role Positioning Bar */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-10 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-7 lg:flex-row lg:items-center"
        >
          <div className="flex flex-wrap items-center gap-3.5">
            {/* Primary Action Button */}
            <button
              type="button"
              onClick={() => {
                playTactileClick('thock');
                onNav('#field-notes');
              }}
              className="group inline-flex items-center gap-2.5 rounded-full bg-[#00F0FF] px-6 py-3.5 font-sans-tight text-sm font-bold tracking-tight text-black shadow-[0_0_28px_-4px_rgba(0,240,255,0.5)] transition-all hover:bg-white hover:shadow-[0_0_32px_rgba(255,255,255,0.5)]"
            >
              View Case Studies
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </button>

            {/* Secondary Action folding "Open to opportunities" into a real interactive CTA button */}
            <button
              type="button"
              onClick={() => {
                playTactileClick('click');
                onNav('#contact');
              }}
              className="glass-pill group inline-flex items-center gap-2.5 rounded-full px-5 py-3.5 font-mono-tech text-xs font-medium tracking-[0.12em] text-zinc-100 transition-colors hover:border-emerald-400/60 hover:bg-white/10"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              OPEN TO OPPORTUNITIES — GET IN TOUCH
              <ArrowUpRight className="h-3.5 w-3.5 text-emerald-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
          </div>

          <div className="font-mono-tech max-w-md text-xs leading-relaxed tracking-[0.14em] text-zinc-300 lg:text-right">
            {HERO_DATA.rightCollabLines.map((l, idx) => (
              <div key={l} className={idx === 0 ? 'font-semibold text-emerald-400' : 'text-zinc-300'}>
                {l}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
