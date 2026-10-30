'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Terminal, Sliders, Layers, ArrowUpRight, Play, CheckCircle2 } from 'lucide-react';
import { useTilt3D } from '../hooks/useTilt3D';
import { TECH_ARSENAL } from '../data/portfolioData';
import { MaskedLines, ParallaxFade, WordScrubHighlight } from './ScrollText';
import { playTactileClick } from '../hooks/useSound';

function TiltCard({
  className = '',
  children,
  accent = '#00F0FF',
}: {
  className?: string;
  children: React.ReactNode;
  accent?: string;
}) {
  const { tilt, handleMouseMove, handleMouseLeave } = useTilt3D(6);
  return (
    <motion.div
      data-cursor="hover"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      animate={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      style={{ transformPerspective: 1000 }}
      className={`glass-card group relative overflow-hidden rounded-3xl p-7 transition-[border-color,box-shadow] duration-300 hover:border-white/20 ${className}`}
    >
      {/* Specular Radial Background Fill */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: tilt.isHovered ? 1 : 0,
          background: `radial-gradient(420px circle at ${tilt.spotX}% ${tilt.spotY}%, ${accent}26, transparent 60%)`,
        }}
      />
      {/* Dynamic Specular Laser 1px Perimeter Border */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl p-[1px] transition-opacity duration-300"
        style={{
          opacity: tilt.isHovered ? 1 : 0,
          background: `radial-gradient(320px circle at ${tilt.spotX}% ${tilt.spotY}%, ${accent}, transparent 65%)`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      <div className="relative h-full">{children}</div>
    </motion.div>
  );
}

function RetroRobot() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [headTilt, setHeadTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [wobble, setWobble] = useState(false);
  const [speech, setSpeech] = useState<string | null>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = (e.clientX - centerX) / (window.innerWidth / 2);
      const dy = (e.clientY - centerY) / (window.innerHeight / 2);

      const clampedX = Math.max(-1, Math.min(1, dx));
      const clampedY = Math.max(-1, Math.min(1, dy));

      setHeadTilt({
        rotateY: clampedX * 16,
        rotateX: -clampedY * 16,
      });
      setEyeOffset({
        x: clampedX * 6,
        y: clampedY * 5,
      });
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  const handleClick = () => {
    playTactileClick('thock');
    setWobble(true);
    setSpeech('BEEP! 0 DRIFT');
    setTimeout(() => setWobble(false), 600);
    setTimeout(() => setSpeech(null), 2400);
  };

  return (
    <div ref={containerRef} className="relative mx-auto grid h-48 w-48 place-items-center [perspective:800px]">
      <div className="absolute inset-0 rounded-full bg-[#F5B83D]/20 blur-3xl transition-opacity duration-300 group-hover:bg-[#F5B83D]/40" />
      
      {/* Interactive Speech Balloon */}
      <AnimatePresence>
        {speech && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: -24, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.8 }}
            className="pointer-events-none absolute -top-4 z-20 rounded-full border border-[#F5B83D] bg-black/90 px-3 py-1 font-mono-tech text-[10px] font-bold text-[#F5B83D] shadow-[0_0_20px_rgba(245,184,61,0.5)]"
          >
            {speech}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={
          wobble
            ? { y: [0, -18, 6, -6, 0], rotate: [0, -14, 12, -6, 0] }
            : {
                rotateX: headTilt.rotateX,
                rotateY: headTilt.rotateY,
                y: [0, -6, 0],
              }
        }
        transition={
          wobble
            ? { duration: 0.55, ease: [0.16, 1, 0.3, 1] }
            : {
                rotateX: { type: 'spring', stiffness: 180, damping: 20 },
                rotateY: { type: 'spring', stiffness: 180, damping: 20 },
                y: { repeat: Infinity, duration: 3.6, ease: 'easeInOut' },
              }
        }
        whileHover={{ scale: 1.14 }}
        whileTap={{ scale: 0.92 }}
        onClick={handleClick}
        data-cursor="hover"
        title="Interactive Robot: Click me or move your mouse!"
        className="relative grid h-32 w-32 cursor-pointer place-items-center rounded-[2rem] border border-[#F5B83D]/50 bg-gradient-to-br from-[#F5B83D] to-[#b9761c] shadow-[inset_0_-10px_20px_rgba(0,0,0,.35),0_30px_60px_-20px_rgba(245,184,61,.6)] transition-shadow duration-300 hover:shadow-[inset_0_-10px_20px_rgba(0,0,0,.35),0_30px_70px_-10px_rgba(245,184,61,1)]"
      >
        {/* Antenna with pulsing diode */}
        <div className="absolute -top-3 flex flex-col items-center">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00F0FF] opacity-80" />
            <span className="relative h-2 w-2 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
          </span>
          <div className="h-2 w-0.5 bg-zinc-800" />
        </div>

        {/* Robot Face & Pupil Tracking */}
        <div className="relative">
          <Bot className="h-20 w-20 text-[#1a1206]" strokeWidth={1.6} />
          {/* Tracking pupils inside the eye slit */}
          <motion.div
            style={{ x: eyeOffset.x, y: eyeOffset.y }}
            className="pointer-events-none absolute left-[26px] top-[29px] flex gap-[13px]"
          >
            <span className="h-2 w-2 rounded-full bg-[#00F0FF] shadow-[0_0_6px_#00F0FF]" />
            <span className="h-2 w-2 rounded-full bg-[#00F0FF] shadow-[0_0_6px_#00F0FF]" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

const TERMINAL_COMMANDS = [
  {
    id: 'extract',
    name: 'extract',
    fullCmd: 'npx figma-mcp extract --component SearchBar',
    lines: [
      { text: '→ parsing Figma vector tree (16 variants)...', color: 'text-zinc-500' },
      { text: '✓ 16/16 React props synced with zero drift', color: 'text-[#00F0FF]' },
      { text: '✓ code generated at src/components/SearchBar.tsx', color: 'text-emerald-400' },
    ],
  },
  {
    id: 'tokens',
    name: 'test:tokens',
    fullCmd: 'pnpm test:tokens --tier 3',
    lines: [
      { text: '→ validating 3-tier token hierarchy graph...', color: 'text-zinc-500' },
      { text: '✓ 18 Primitives → 24 Semantics → 10 Components', color: 'text-[#F5B83D]' },
      { text: '✓ 3-tier token matrix verified 52/52 (100%)', color: 'text-emerald-400' },
    ],
  },
  {
    id: 'drift',
    name: 'audit:drift',
    fullCmd: 'figma-drift audit --tolerance 0px',
    lines: [
      { text: '→ running pixel-level DOM vs Figma inspection...', color: 'text-zinc-500' },
      { text: '✓ auto-layout flexbox matched perfectly', color: 'text-[#00F0FF]' },
      { text: '✨ 0.00px layout drift confirmed', color: 'text-emerald-400' },
    ],
  },
];

function PlayableRetroTerminal() {
  const [activeCmdIdx, setActiveCmdIdx] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const [running, setRunning] = useState(false);

  const active = TERMINAL_COMMANDS[activeCmdIdx];

  const runCommand = (idx: number) => {
    setActiveCmdIdx(idx);
    setTypedChars(0);
    setRunning(true);
    playTactileClick('key');

    const cmdText = TERMINAL_COMMANDS[idx].fullCmd;
    let charCount = 0;
    const interval = setInterval(() => {
      charCount += 3;
      setTypedChars(Math.min(charCount, cmdText.length));
      playTactileClick('key');
      if (charCount >= cmdText.length) {
        clearInterval(interval);
        setTimeout(() => setRunning(false), 200);
      }
    }, 40);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.015 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative mx-auto w-full max-w-sm"
    >
      <div className="absolute inset-0 rounded-2xl bg-[#00F0FF]/10 blur-3xl transition-opacity duration-300 group-hover:bg-[#00F0FF]/30" />
      
      {/* Interactive Command Switcher Tabs */}
      <div className="mb-2 flex items-center justify-between gap-1">
        <span className="font-mono-tech text-[9px] uppercase tracking-wider text-zinc-500">RUN SCRIPT:</span>
        <div className="flex gap-1.5">
          {TERMINAL_COMMANDS.map((c, i) => (
            <button
              key={c.id}
              onClick={() => runCommand(i)}
              data-cursor="hover"
              className={`rounded px-2 py-0.5 font-mono-tech text-[10px] transition-all ${
                activeCmdIdx === i
                  ? 'bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/50 shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                  : 'bg-zinc-800/80 text-zinc-400 border border-zinc-700/60 hover:text-white'
              }`}
            >
              ${c.name}
            </button>
          ))}
        </div>
      </div>

      <div className="relative rounded-2xl border border-zinc-700 bg-gradient-to-b from-zinc-800 to-zinc-900 p-3 shadow-[0_30px_60px_-20px_rgba(0,240,255,.35)] transition-shadow duration-300 hover:shadow-[0_30px_70px_-10px_rgba(0,240,255,.6)]">
        {/* Terminal Header */}
        <div className="mb-2 flex items-center justify-between px-1">
          <div className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-red-500/70" />
            <span className="h-2 w-2 rounded-full bg-amber-500/70" />
            <span className="h-2 w-2 rounded-full bg-emerald-500/70" />
          </div>
          <span className="font-mono-tech text-[9px] text-zinc-500">figma-mcp // zsh</span>
          <button
            onClick={() => runCommand(activeCmdIdx)}
            title="Re-run command"
            className="text-zinc-500 hover:text-[#00F0FF]"
          >
            <Play className="h-2.5 w-2.5" />
          </button>
        </div>

        {/* Screen */}
        <div className="rounded-lg border border-zinc-950 bg-[#031314] p-3.5 font-mono-tech text-[11px] leading-relaxed text-[#00F0FF] shadow-[inset_0_0_30px_rgba(0,240,255,.15)] min-h-[148px]">
          <div className="text-zinc-300">
            $ {active.fullCmd.slice(0, typedChars || active.fullCmd.length)}
            {running && <span className="inline-block h-3 w-1.5 animate-pulse bg-[#00F0FF] align-middle ml-1" />}
          </div>
          
          <div className="mt-2 space-y-1">
            {active.lines.map((line, idx) => (
              <motion.div
                key={line.text}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + idx * 0.12 }}
                className={line.color}
              >
                {line.text}
              </motion.div>
            ))}
          </div>

          <div className="mt-2 text-zinc-600">
            ${' '}
            {!running && (
              <span className="inline-block h-3 w-1.5 animate-pulse bg-[#00F0FF] align-middle" />
            )}
          </div>
        </div>
        <div className="mx-auto mt-2 h-1.5 w-12 rounded-full bg-zinc-700" />
      </div>
    </motion.div>
  );
}

function ShiftNudgeGauge() {
  return (
    <div className="relative flex items-center justify-between">
      <div>
        <p className="font-mono-tech text-4xl font-bold text-white">
          101<span className="text-lg text-zinc-500">pts</span>
        </p>
        <p className="font-mono-tech text-[10px] tracking-[0.2em] text-[#00F0FF] mt-1 flex items-center gap-1.5">
          <CheckCircle2 className="h-3 w-3 text-[#00F0FF]" /> MAX CRITERIA
        </p>
      </div>
      <div className="relative h-16 w-16">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 64 64">
          <circle
            cx="32"
            cy="32"
            r="26"
            className="stroke-zinc-800"
            strokeWidth="4"
            fill="none"
          />
          <motion.circle
            cx="32"
            cy="32"
            r="26"
            className="stroke-[#00F0FF]"
            strokeWidth="4"
            fill="none"
            strokeDasharray="163.36"
            initial={{ strokeDashoffset: 163.36 }}
            whileInView={{ strokeDashoffset: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute inset-0 grid place-items-center font-mono-tech text-[10px] font-bold text-[#00F0FF]">
          100%
        </span>
      </div>
    </div>
  );
}

function TokenStackVisual() {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => {
        playTactileClick('click');
        setHovered(true);
      }}
      onMouseLeave={() => setHovered(false)}
      className="relative flex items-center justify-between cursor-pointer"
    >
      <div>
        <p className="font-mono-tech text-4xl font-bold text-white">
          52+<span className="text-lg text-zinc-500">vars</span>
        </p>
        <p className="font-mono-tech text-[10px] tracking-[0.2em] text-emerald-400 mt-1">
          3-TIER MATRIX // SYNCED
        </p>
      </div>
      <div className="relative h-14 w-20 [perspective:600px]">
        {/* Layer 3: Component */}
        <motion.div
          animate={hovered ? { y: -16, rotateX: 20, scale: 1.05 } : { y: 0, rotateX: 25 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="absolute inset-x-0 top-0 h-7 rounded-lg border border-[#00F0FF]/50 bg-[#00F0FF]/20 backdrop-blur-sm grid place-items-center shadow-lg"
        >
          <span className="font-mono-tech text-[8px] tracking-wider text-[#00F0FF]">COMPONENTS</span>
        </motion.div>
        {/* Layer 2: Semantic */}
        <motion.div
          animate={hovered ? { y: 0, rotateX: 20 } : { y: 6, rotateX: 25 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="absolute inset-x-0 top-0 h-7 rounded-lg border border-emerald-400/50 bg-emerald-400/20 backdrop-blur-sm grid place-items-center shadow-md"
        >
          <span className="font-mono-tech text-[8px] tracking-wider text-emerald-400">SEMANTIC</span>
        </motion.div>
        {/* Layer 1: Primitives */}
        <motion.div
          animate={hovered ? { y: 16, rotateX: 20, scale: 0.95 } : { y: 12, rotateX: 25 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="absolute inset-x-0 top-0 h-7 rounded-lg border border-[#F5B83D]/50 bg-[#F5B83D]/20 backdrop-blur-sm grid place-items-center shadow-sm"
        >
          <span className="font-mono-tech text-[8px] tracking-wider text-[#F5B83D]">PRIMITIVES</span>
        </motion.div>
      </div>
    </div>
  );
}

const Tags = ({ items }: { items: string[] }) => (
  <div className="flex flex-wrap gap-2">
    {items.map((t) => (
      <motion.span
        key={t}
        whileHover={{ y: -2, scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onMouseEnter={() => playTactileClick('click')}
        className="cursor-pointer rounded-full border border-[#27272a] px-3 py-1 font-mono-tech text-[10px] text-zinc-400 transition-colors hover:border-[#00F0FF]/60 hover:text-white"
      >
        {t}
      </motion.span>
    ))}
  </div>
);

export default function BentoGrid() {
  return (
    <section id="services" className="py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="mb-12 flex items-end justify-between gap-6">
          <MaskedLines
            className="font-display text-[clamp(2.2rem,6vw,5rem)] uppercase leading-[0.9] tracking-[-0.03em]"
            lines={[<>Core</>, <span className="text-zinc-500">Capabilities</span>]}
          />
          <span className="hidden font-mono-tech text-xs tracking-[0.25em] text-zinc-400 md:block">
            02 — CAPABILITIES
          </span>
        </div>
        <div className="grid gap-4 md:grid-cols-6 [perspective:1200px]">
          <TiltCard className="md:col-span-4 md:row-span-2" accent="#F5B83D">
            <div className="flex h-full flex-col gap-8 md:flex-row md:items-center">
              <div className="flex flex-1 flex-col gap-5">
                <span className="font-mono-tech text-xs tracking-[0.25em] text-[#F5B83D]">
                  // 01 — DESIGN SYSTEMS ARCHITECTURE
                </span>
                <h3 className="font-syne text-4xl font-extrabold leading-none md:text-5xl">
                  Three-Tier<br />Tokens
                </h3>
                <WordScrubHighlight
                  text="Primitives → Semantic Aliases → Component tokens. Single source of truth connecting Figma Variables directly to typed React 19 prop APIs."
                  accents={{
                    Primitives: '#F5B83D',
                    Semantic: '#10B981',
                    Component: '#00F0FF',
                    Variables: '#F5B83D',
                    React: '#00F0FF',
                  }}
                  className="max-w-sm text-sm leading-relaxed text-zinc-300"
                />
                <Tags items={['Figma Tokens', 'Token Studio', 'Auto-Layout 5.0', 'React 19', 'Storybook', 'Tailwind v4']} />
              </div>
              <RetroRobot />
            </div>
          </TiltCard>
          <TiltCard className="md:col-span-2" accent="#00F0FF">
            <Sliders className="mb-6 h-6 w-6 text-[#00F0FF]" />
            <ShiftNudgeGauge />
            <ParallaxFade distance={20}>
              <p className="mt-4 text-sm text-zinc-300">Automated visual inspection across Layout, Typography, Contrast &amp; Feedback states.</p>
            </ParallaxFade>
          </TiltCard>
          <TiltCard className="md:col-span-2" accent="#10B981">
            <Layers className="mb-6 h-6 w-6 text-emerald-400" />
            <TokenStackVisual />
            <ParallaxFade distance={20}>
              <p className="mt-4 text-sm text-zinc-300">Multi-state interactive components synced between Figma Auto-Layout and React DOM.</p>
            </ParallaxFade>
          </TiltCard>
          <TiltCard className="md:col-span-3" accent="#00F0FF">
            <div className="flex h-full flex-col gap-6">
              <span className="font-mono-tech text-xs tracking-[0.25em] text-[#00F0FF]">
                // 02 — AGENTIC WORKFLOWS
              </span>
              <h3 className="font-syne text-4xl font-extrabold leading-none">
                Claude Code<br />+ Figma MCP
              </h3>
              <PlayableRetroTerminal />
              <Tags items={['Claude Code', 'Figma MCP', 'Antigravity IDE', 'Design Systems', 'Microcopy']} />
            </div>
          </TiltCard>
          <TiltCard className="md:col-span-3" accent="#5865F2">
            <div className="mb-6 flex items-center justify-between">
              <span className="font-mono-tech text-xs tracking-[0.25em] text-[#8b93ff]">
                // TECH ARSENAL — {TECH_ARSENAL.length}
              </span>
              <Terminal className="h-5 w-5 text-zinc-400" />
            </div>
            <div className="flex flex-wrap gap-2">
              {TECH_ARSENAL.map((t) => (
                <motion.span
                  key={t.name}
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => playTactileClick('click')}
                  className={`cursor-pointer rounded-md border px-2.5 py-1 font-mono-tech text-xs transition-colors ${
                    t.level === 'Production'
                      ? 'border-zinc-700 text-zinc-200 hover:border-[#8b93ff] hover:text-white'
                      : 'border-[#27272a] text-zinc-400 hover:border-zinc-500 hover:text-zinc-200'
                  }`}
                >
                  {t.name}
                </motion.span>
              ))}
            </div>
            <a
              href="#field-notes"
              className="mt-6 inline-flex items-center gap-1 font-mono-tech text-xs text-zinc-300 hover:text-[#00F0FF]"
            >
              See design systems in production <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}

