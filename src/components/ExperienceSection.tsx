'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Award, Code2, Sparkles } from 'lucide-react';
import { EXPERIENCE_ITEMS, FEATURED_BLOGS, type BlogPost } from '../data/portfolioData';
import { MaskedLines } from './ScrollText';
import SafeImage from './SafeImage';
import { playTactileClick } from '../hooks/useSound';

function ExperienceList() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const activeItem = EXPERIENCE_ITEMS[activeIdx] ?? EXPERIENCE_ITEMS[0];

  return (
    <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
      {/* Left Column: Experience Rows with permanent description & conditional link arrow */}
      <div className="lg:col-span-7">
        {EXPERIENCE_ITEMS.map((e, i) => {
          const isSelected = activeIdx === i;
          return (
            <div
              key={e.id}
              onMouseEnter={() => {
                if (activeIdx !== i) {
                  setActiveIdx(i);
                  playTactileClick('click');
                }
              }}
              onClick={() => {
                setActiveIdx(i);
                playTactileClick('thock');
              }}
              data-cursor="hover"
              className={`group relative border-t border-[#27272a] px-4 py-7 transition-colors last:border-b sm:px-6 ${
                isSelected ? 'bg-white/[0.03]' : 'hover:bg-white/[0.015]'
              }`}
            >
              {/* Active left indicator bar */}
              <span
                className={`absolute inset-y-0 left-0 w-1 transition-opacity ${
                  isSelected ? 'bg-[#00F0FF] opacity-100' : 'bg-zinc-700 opacity-0 group-hover:opacity-50'
                }`}
              />

              <div className="flex flex-wrap items-center justify-between gap-2 font-mono-tech text-xs">
                <div className="flex items-center gap-3">
                  <span className={isSelected ? 'font-bold text-[#00F0FF]' : 'text-zinc-400'}>{e.index}</span>
                  <span className="rounded-full border border-[#27272a] bg-zinc-900/80 px-3 py-0.5 text-[11px] tracking-[0.14em] text-zinc-300">
                    {e.category.toUpperCase()}
                  </span>
                </div>
                <span className="text-zinc-400">{e.period}</span>
              </div>

              <div className="mt-3 flex items-start justify-between gap-4">
                <div>
                  <h3
                    className={`font-sans-tight text-xl font-bold tracking-tight transition-colors md:text-2xl ${
                      isSelected ? 'text-[#00F0FF]' : 'text-white group-hover:text-[#00F0FF]'
                    }`}
                  >
                    {e.role}
                  </h3>
                  <p className="mt-0.5 font-mono-tech text-xs text-zinc-400">
                    {e.organization} · {e.location}
                  </p>
                </div>

                {/* Only render the ↗ arrow when the row actually links somewhere */}
                {e.liveUrl && (
                  <a
                    href={e.liveUrl}
                    onClick={(ev) => {
                      ev.stopPropagation();
                      playTactileClick('thock');
                    }}
                    aria-label={`View case studies from ${e.role}`}
                    title="Jump to related case studies"
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/15 bg-zinc-900 text-zinc-300 transition-all hover:border-[#00F0FF] hover:text-[#00F0FF]"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
              </div>

              {/* Permanent visible impact summary (accessible on both desktop and touch devices) */}
              <p className="mt-3 text-sm leading-relaxed text-zinc-300">{e.impact}</p>

              {/* Permanent key metrics pills */}
              <div className="mt-4 flex flex-wrap gap-2">
                {e.metrics.map((m) => (
                  <span
                    key={m}
                    className="rounded-md border border-white/10 bg-zinc-900/90 px-2.5 py-1 font-mono-tech text-[11px] text-zinc-300"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Right Column: Dedicated Beside-Row Preview Card (never covers text) */}
      <div className="lg:sticky lg:top-28 lg:col-span-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeItem.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="glass-card overflow-hidden rounded-3xl border border-white/15"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-[#27272a] bg-zinc-950">
              <SafeImage
                src={activeItem.previewImage}
                alt={`${activeItem.role} preview`}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/80 px-3 py-1 font-mono-tech text-xs tracking-[0.16em] text-[#00F0FF] backdrop-blur-md">
                <Award className="h-3.5 w-3.5" />
                {activeItem.certificateBadge}
              </div>
            </div>

            <div className="p-6">
              <div className="font-mono-tech text-xs tracking-[0.15em] text-zinc-400">
                {activeItem.index} // {activeItem.organization.toUpperCase()}
              </div>
              <h4 className="font-sans-tight mt-1 text-xl font-bold text-white">{activeItem.role}</h4>
              <p className="mt-2.5 text-sm leading-relaxed text-zinc-300">{activeItem.description}</p>

              <div className="mt-5 border-t border-[#27272a] pt-4">
                <span className="font-mono-tech block text-[11px] tracking-[0.15em] text-zinc-400">
                  PRODUCTION STACK
                </span>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {activeItem.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-zinc-700/80 bg-zinc-900 px-2.5 py-1 font-mono-tech text-xs text-zinc-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function CaseStudyCard({
  b,
  isSelected,
  onSelect,
}: {
  b: BlogPost;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.article
      data-cursor="hover"
      onClick={() => {
        playTactileClick('thock');
        onSelect();
      }}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className={`glass-card group relative flex flex-col overflow-hidden rounded-3xl border transition-all cursor-pointer ${
        isSelected
          ? 'border-[#00F0FF] shadow-[0_0_32px_-8px_rgba(0,240,255,0.35)]'
          : 'border-[#27272a] hover:border-white/25'
      }`}
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-[#27272a] bg-zinc-950">
        <SafeImage
          src={b.image}
          accent={b.accentColor}
          alt={b.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span
          className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/80 px-3 py-1 font-mono-tech text-xs font-semibold tracking-[0.14em] backdrop-blur-md"
          style={{ color: b.accentColor }}
        >
          {b.tag}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <div className="mb-2.5 flex items-center justify-between font-mono-tech text-xs text-zinc-400">
            <span>{b.date}</span>
            <span>{b.readTime}</span>
          </div>
          <h3 className="font-sans-tight text-xl font-bold leading-snug tracking-tight text-white group-hover:text-[#00F0FF] transition-colors md:text-2xl">
            {b.title}
          </h3>
          <p className="mt-2.5 text-sm leading-relaxed text-zinc-300">{b.excerpt}</p>
        </div>

        <div
          className="mt-6 flex items-center justify-between border-t border-[#27272a] pt-4 font-mono-tech text-xs font-semibold"
          style={{ color: b.accentColor }}
        >
          <span>{b.metrics}</span>
          <span className="inline-flex items-center gap-1 text-zinc-200 group-hover:text-white">
            {isSelected ? 'Inspecting details' : 'Inspect architecture'}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </motion.article>
  );
}

function FieldNotesGrid() {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const total = FEATURED_BLOGS.length;
  const activeStudy = FEATURED_BLOGS[selectedIdx] ?? FEATURED_BLOGS[0];

  const handlePrev = () => {
    playTactileClick('click');
    setSelectedIdx((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    playTactileClick('click');
    setSelectedIdx((prev) => (prev + 1) % total);
  };

  return (
    <section
      id="field-notes"
      aria-label="Field Notes and Case Studies"
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') handlePrev();
        if (e.key === 'ArrowRight') handleNext();
      }}
      className="border-t border-[#27272a] py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        {/* Header + Accessible Carousel/Grid Controls + Progress Dots */}
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="font-mono-tech mb-3 block text-xs tracking-[0.25em] text-[#00F0FF]">
              04 — SHIPPED CASE STUDIES &amp; METRICS
            </span>
            <MaskedLines
              className="font-display text-[clamp(2.2rem,6vw,5rem)] uppercase leading-[0.9] tracking-[-0.03em]"
              lines={[<>Field</>, <span className="text-zinc-500">Notes</span>]}
            />
          </div>

          {/* Keyboard-accessible Arrow Controls & Progress Dots */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2" role="tablist" aria-label="Case study selector">
              {FEATURED_BLOGS.map((b, idx) => {
                const active = idx === selectedIdx;
                return (
                  <button
                    key={b.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    aria-label={`Select case study ${idx + 1}: ${b.title}`}
                    onClick={() => {
                      playTactileClick('click');
                      setSelectedIdx(idx);
                    }}
                    className={`h-2.5 rounded-full transition-all ${
                      active ? 'w-8 bg-[#00F0FF]' : 'w-2.5 bg-zinc-700 hover:bg-zinc-500'
                    }`}
                  />
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous case study"
                className="glass-pill grid h-10 w-10 place-items-center rounded-full text-zinc-200 transition-colors hover:border-[#00F0FF] hover:text-[#00F0FF]"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next case study"
                className="glass-pill grid h-10 w-10 place-items-center rounded-full text-zinc-200 transition-colors hover:border-[#00F0FF] hover:text-[#00F0FF]"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Visible 2x2 Grid — No vertical scroll-jacking, all 4 case studies immediately scannable */}
        <div className="grid gap-6 md:grid-cols-2">
          {FEATURED_BLOGS.map((b, idx) => (
            <CaseStudyCard
              key={b.id}
              b={b}
              isSelected={idx === selectedIdx}
              onSelect={() => setSelectedIdx(idx)}
            />
          ))}
        </div>

        {/* Active Case Study Deep-Dive Panel (Architecture Breakdown + Code Snippet) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStudy.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="glass-card mt-8 rounded-3xl border border-white/15 p-6 md:p-8"
          >
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <div className="flex flex-wrap items-center gap-3 font-mono-tech text-xs">
                  <span
                    className="rounded-full border border-white/15 bg-white/5 px-3 py-1 font-semibold"
                    style={{ color: activeStudy.accentColor }}
                  >
                    ACTIVE INSPECTION · 0{selectedIdx + 1} / 0{total}
                  </span>
                  <span className="text-zinc-300">{activeStudy.metrics}</span>
                </div>

                <h3 className="font-sans-tight mt-3 text-2xl font-bold text-white md:text-3xl">
                  {activeStudy.title}
                </h3>

                <ul className="mt-4 space-y-2.5">
                  {activeStudy.content.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm leading-relaxed text-zinc-200">
                      <Sparkles
                        className="mt-1 h-4 w-4 shrink-0"
                        style={{ color: activeStudy.accentColor }}
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl border border-zinc-800 bg-[#07090c] p-4 font-mono-tech text-xs leading-relaxed text-zinc-200">
                  <div className="mb-2.5 flex items-center justify-between border-b border-zinc-800 pb-2 text-[11px] text-zinc-400">
                    <span className="inline-flex items-center gap-1.5">
                      <Code2 className="h-3.5 w-3.5 text-[#00F0FF]" />
                      IMPLEMENTATION SPEC
                    </span>
                    <span>TYPESCRIPT / REACT</span>
                  </div>
                  <pre className="overflow-x-auto text-[11px] leading-relaxed text-[#00F0FF]">
                    <code>{activeStudy.codeSnippet}</code>
                  </pre>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

export default function ExperienceSection() {
  return (
    <>
      <section id="work" className="py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="font-mono-tech mb-3 block text-xs tracking-[0.25em] text-zinc-400">
                03 — WORK HISTORY &amp; SYSTEMS
              </span>
              <MaskedLines
                className="font-display text-[clamp(2.2rem,6vw,5rem)] uppercase leading-[0.9] tracking-[-0.03em]"
                lines={[<>Selected</>, <span className="text-zinc-500">Experience</span>]}
              />
            </div>
            <p className="max-w-md text-sm leading-relaxed text-zinc-300">
              Select or hover any role to inspect its system architecture, production stack, and shipped visual artifacts.
            </p>
          </div>
          <ExperienceList />
        </div>
      </section>

      <FieldNotesGrid />
    </>
  );
}
