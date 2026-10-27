'use client';

import { motion } from 'framer-motion';
import { Bot, Terminal, Sliders, Layers, ArrowUpRight } from 'lucide-react';
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
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: tilt.isHovered ? 1 : 0,
          background: `radial-gradient(420px circle at ${tilt.spotX}% ${tilt.spotY}%, ${accent}26, transparent 60%)`,
        }}
      />
      <div className="relative h-full">{children}</div>
    </motion.div>
  );
}

function RetroRobot() {
  return (
    <div className="relative mx-auto grid h-44 w-44 place-items-center">
      <div className="absolute inset-0 rounded-full bg-[#F5B83D]/20 blur-3xl transition-opacity duration-300 group-hover:bg-[#F5B83D]/40" />
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, 2, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        whileHover={{ scale: 1.12, rotate: -4 }}
        whileTap={{ scale: 0.92, rotate: 6 }}
        onClick={() => playTactileClick('thock')}
        data-cursor="hover"
        className="relative grid h-32 w-32 cursor-pointer place-items-center rounded-[2rem] border border-[#F5B83D]/40 bg-gradient-to-br from-[#F5B83D] to-[#b9761c] shadow-[inset_0_-10px_20px_rgba(0,0,0,.35),0_30px_60px_-20px_rgba(245,184,61,.6)] transition-shadow duration-300 hover:shadow-[inset_0_-10px_20px_rgba(0,0,0,.35),0_30px_70px_-10px_rgba(245,184,61,.9)]"
      >
        <Bot className="h-20 w-20 text-[#1a1206]" strokeWidth={1.6} />
      </motion.div>
    </div>
  );
}

function RetroTerminal() {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative mx-auto w-full max-w-xs"
    >
      <div className="absolute inset-0 rounded-2xl bg-[#00F0FF]/10 blur-3xl transition-opacity duration-300 group-hover:bg-[#00F0FF]/30" />
      <div className="relative rounded-2xl border border-zinc-700 bg-gradient-to-b from-zinc-800 to-zinc-900 p-3 shadow-[0_30px_60px_-20px_rgba(0,240,255,.35)] transition-shadow duration-300 hover:shadow-[0_30px_70px_-10px_rgba(0,240,255,.6)]">
        <div className="rounded-lg border border-zinc-950 bg-[#031314] p-4 font-mono-tech text-[11px] leading-relaxed text-[#00F0FF] shadow-[inset_0_0_30px_rgba(0,240,255,.15)]">
          <div>$ npx figma-mcp extract --component SearchBar</div>
          <div className="text-zinc-500">→ parsed 16 variants with zero drift</div>
          <div>$ pnpm test:tokens --tier 3</div>
          <div className="text-emerald-400">✓ 3-tier token matrix verified 52/52</div>
          <div>
            ${' '}
            <span className="inline-block h-3 w-1.5 animate-pulse bg-[#00F0FF] align-middle" />
          </div>
        </div>
        <div className="mx-auto mt-2 h-1.5 w-12 rounded-full bg-zinc-700" />
      </div>
    </motion.div>
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
            lines={[<>Core</>, <span className="text-zinc-600">Specializations</span>]}
          />
          <span className="hidden font-mono-tech text-[10px] tracking-[0.3em] text-zinc-600 md:block">
            02 — CAPABILITIES
          </span>
        </div>
        <div className="grid gap-4 md:grid-cols-6 [perspective:1200px]">
          <TiltCard className="md:col-span-4 md:row-span-2" accent="#F5B83D">
            <div className="flex h-full flex-col gap-8 md:flex-row md:items-center">
              <div className="flex flex-1 flex-col gap-5">
                <span className="font-mono-tech text-[10px] tracking-[0.3em] text-[#F5B83D]">
                  // 01 — DESIGN SYSTEMS
                </span>
                <h3 className="font-syne text-4xl font-extrabold leading-none md:text-5xl">
                  Three-Tier<br />Tokens
                </h3>
                <WordScrubHighlight
                  text="Primitives → Semantic Aliases → Component tokens. Engineered variant matrices (16-variant SearchBar, 36-variant Danger Buttons) eliminating handoff drift."
                  accents={{
                    Primitives: '#F5B83D',
                    Semantic: '#10B981',
                    Component: '#00F0FF',
                    matrices: '#F5B83D',
                    drift: '#00F0FF',
                  }}
                  className="max-w-sm text-sm leading-relaxed text-zinc-400"
                />
                <Tags items={['Figma Tokens', 'Token Studio', 'Auto-Layout 5.0', 'React 19', 'Storybook', 'Tailwind v4']} />
              </div>
              <RetroRobot />
            </div>
          </TiltCard>
          <TiltCard className="md:col-span-2" accent="#00F0FF">
            <Sliders className="mb-6 h-6 w-6 text-[#00F0FF]" />
            <p className="font-mono-tech text-4xl font-bold">
              101<span className="text-lg text-zinc-500">pts</span>
            </p>
            <ParallaxFade distance={20}>
              <p className="mt-2 text-sm text-zinc-400">Shift Nudge UI craft criteria across Layout, Type, Color &amp; Feedback.</p>
            </ParallaxFade>
          </TiltCard>
          <TiltCard className="md:col-span-2" accent="#10B981">
            <Layers className="mb-6 h-6 w-6 text-emerald-400" />
            <p className="font-mono-tech text-4xl font-bold">
              52+<span className="text-lg text-zinc-500">vars</span>
            </p>
            <ParallaxFade distance={20}>
              <p className="mt-2 text-sm text-zinc-400">Tokenized coded variants synchronized between Figma &amp; React.</p>
            </ParallaxFade>
          </TiltCard>
          <TiltCard className="md:col-span-3" accent="#00F0FF">
            <div className="flex h-full flex-col gap-6">
              <span className="font-mono-tech text-[10px] tracking-[0.3em] text-[#00F0FF]">
                // 02 — AGENTIC WORKFLOWS
              </span>
              <h3 className="font-syne text-4xl font-extrabold leading-none">
                Claude Code<br />+ Figma MCP
              </h3>
              <RetroTerminal />
              <Tags items={['Claude Code', 'Figma MCP', 'Antigravity IDE', 'Design Systems', 'Microcopy']} />
            </div>
          </TiltCard>
          <TiltCard className="md:col-span-3" accent="#5865F2">
            <div className="mb-6 flex items-center justify-between">
              <span className="font-mono-tech text-[10px] tracking-[0.3em] text-[#8b93ff]">
                // TECH ARSENAL — {TECH_ARSENAL.length}
              </span>
              <Terminal className="h-5 w-5 text-zinc-500" />
            </div>
            <div className="flex flex-wrap gap-2">
              {TECH_ARSENAL.map((t) => (
                <motion.span
                  key={t.name}
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => playTactileClick('click')}
                  className={`cursor-pointer rounded-md border px-2.5 py-1 font-mono-tech text-[10px] transition-colors ${
                    t.level === 'Production'
                      ? 'border-zinc-700 text-zinc-200 hover:border-[#8b93ff] hover:text-white'
                      : 'border-[#27272a] text-zinc-500 hover:border-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {t.name}
                </motion.span>
              ))}
            </div>
            <a
              href="#work"
              className="mt-6 inline-flex items-center gap-1 font-mono-tech text-[11px] text-zinc-400 hover:text-white"
            >
              See design systems in production <ArrowUpRight className="h-3 w-3" />
            </a>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
