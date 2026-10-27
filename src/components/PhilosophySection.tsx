'use client';

import { ArrowUpRight } from 'lucide-react';
import { MaskedLines, ParallaxFade, WordScrubHighlight } from './ScrollText';
import { HERO_DATA } from '../data/portfolioData';

export default function PhilosophySection() {
  return (
    <section id="about" className="relative border-y border-[#27272a] py-24 md:py-32">
      <span className="absolute -top-1 left-0 h-2 w-2 bg-[#27272a]" />
      <span className="absolute -top-1 right-0 h-2 w-2 bg-[#27272a]" />
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="mb-10 flex items-center justify-between font-mono-tech text-[10px] tracking-[0.3em]">
          <span className="text-rose-400">// BELIEVES</span>
          <span className="text-zinc-600">01 — PHILOSOPHY</span>
        </div>
        <WordScrubHighlight
          as="h2"
          text={`"From Figma to production.. with the motion intact and zero drift..."`}
          accents={{
            Figma: '#00F0FF',
            production: '#38bdf8',
            motion: '#F5B83D',
            zero: '#00F0FF',
            drift: '#00F0FF',
          }}
          italics={['and', 'zero', 'drift']}
          className="font-sans-tight text-[clamp(2.4rem,6.4vw,6rem)] font-bold leading-[0.98] tracking-[-0.04em]"
        />

        <div className="mt-16 grid gap-10 border-t border-[#27272a] pt-10 md:grid-cols-3">
          {[
            {
              h: null,
              body: (
                <WordScrubHighlight
                  text="I design in Figma and build the same screens in React, so nothing gets lost in handoff. One person owning the work from the first wireframe to the shipped component."
                  accents={{
                    Figma: '#00F0FF',
                    React: '#00F0FF',
                    handoff: '#00F0FF',
                    shipped: '#10B981',
                  }}
                  className="text-lg leading-snug text-zinc-200"
                />
              ),
            },
            {
              h: 'TACTILE CRAFT & ANALOG ORIGINS',
              body: (
                <>
                  <p className="text-sm leading-relaxed text-zinc-300">
                    I trained in ink portraiture, watercolour and manga illustration before touching a screen. That is
                    where my eye for visual hierarchy, negative space, and micro-contrast comes from.
                  </p>
                  <a
                    href="#work"
                    className="mt-4 inline-block font-mono-tech text-[11px] text-rose-400 hover:text-[#00F0FF]"
                  >
                    Explore design systems &amp; works →
                  </a>
                </>
              ),
            },
            {
              h: 'SYSTEMS & QUANT DISCIPLINE',
              body: (
                <>
                  <p className="text-sm leading-relaxed text-zinc-400">
                    On the side I build{' '}
                    <a
                      id="quant-models-link"
                      href={HERO_DATA.quantProject.url}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="hover"
                      className="text-zinc-200 underline decoration-[#00F0FF]/50 decoration-1 underline-offset-4 transition-colors hover:text-[#00F0FF] hover:decoration-[#00F0FF]"
                    >
                      {HERO_DATA.quantProject.label}
                    </a>
                    . It keeps my engineering disciplined: fast, predictable, and easy to reason about—from token logic
                    to the pixel.
                  </p>
                  <a
                    href={HERO_DATA.quantProject.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group mt-4 inline-flex items-center gap-1 font-mono-tech text-[11px] text-[#00F0FF] hover:text-white"
                  >
                    View quant models
                    <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                  <p className="font-signature mt-4 text-4xl text-white">{HERO_DATA.shortSignature}</p>
                </>
              ),
            },
          ].map((c, i) => (
            <ParallaxFade key={i} distance={40 + i * 25}>
              {c.h && (
                <h3 className="mb-3 font-mono-tech text-[10px] font-semibold tracking-[0.25em] text-white">{c.h}</h3>
              )}
              {c.body}
            </ParallaxFade>
          ))}
        </div>
      </div>
    </section>
  );
}
