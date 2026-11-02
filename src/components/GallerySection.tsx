'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Check, Copy, Mail, X } from 'lucide-react';
import { GALLERY_ITEMS, HERO_DATA, type GalleryItem } from '../data/portfolioData';
import { MaskedLines, ParallaxFade } from './ScrollText';
import SafeImage from './SafeImage';
import { playTactileClick } from '../hooks/useSound';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './Icons';

const CATEGORIES = ['All', 'Traditional Art', 'Design System', 'Methodology'] as const;

export default function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState<(typeof CATEGORIES)[number]>('All');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const filteredItems =
    selectedCategory === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  useEffect(() => {
    if (!activeItem) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveItem(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeItem]);

  return (
    <section id="gallery" className="py-20 md:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-4 md:px-8 lg:px-10">
        <div className="mb-10 flex flex-col justify-between gap-6 md:mb-12 lg:flex-row lg:items-end">
          <div>
            <span className="font-mono-tech mb-3 block text-xs tracking-[0.2em] text-zinc-400 md:tracking-[0.25em]">
              05 — ANALOG ORIGINS &amp; ARCHITECTURE
            </span>
            <MaskedLines
              className="font-display text-[clamp(2rem,6vw,5rem)] uppercase leading-[0.9] tracking-[-0.03em]"
              lines={[<>Origin &amp;</>, <span className="text-zinc-500">Sketchbook</span>]}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    playTactileClick('click');
                    setSelectedCategory(cat);
                  }}
                  className={`min-h-[44px] rounded-full px-4 py-2.5 font-mono-tech text-xs tracking-[0.12em] transition-all md:min-h-0 md:py-2 ${
                    isSelected
                      ? 'bg-white font-semibold text-black shadow-[0_0_20px_rgba(255,255,255,0.25)]'
                      : 'glass-pill text-zinc-300 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {cat.toUpperCase()}
                </button>
              );
            })}
            <a
              href={HERO_DATA.socials.instagram}
              target="_blank"
              rel="noreferrer"
              onClick={() => playTactileClick('thock')}
              className="glass-pill inline-flex min-h-[44px] items-center gap-1.5 rounded-full px-4 py-2.5 font-mono-tech text-xs tracking-[0.12em] text-[#00F0FF] transition-colors hover:border-[#00F0FF]/50 hover:bg-[#00F0FF]/10 md:min-h-0 md:py-2"
            >
              FULL ARCHIVE
              <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
          {filteredItems.map((g, i) => (
            <motion.figure
              key={g.id}
              layout
              role="button"
              tabIndex={0}
              aria-label={`Inspect ${g.title}`}
              data-cursor="hover"
              onMouseEnter={() => playTactileClick('click')}
              onClick={() => {
                playTactileClick('thock');
                setActiveItem(g);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  playTactileClick('thock');
                  setActiveItem(g);
                }
              }}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ delay: (i % 3) * 0.06, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className={`@container group relative min-h-[320px] cursor-pointer overflow-hidden rounded-3xl border border-[#27272a] bg-[#0e0e11] transition-colors hover:border-white/25 sm:min-h-[340px] ${g.span}`}
            >
              <SafeImage
                src={g.image}
                alt={g.title}
                accent={g.accent}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/20" />
              <figcaption className="relative flex h-full flex-col justify-between p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-2 font-mono-tech text-xs tracking-[0.14em]">
                  <span
                    className="rounded-full border border-white/10 bg-black/75 px-3 py-1 backdrop-blur-md"
                    style={{ color: g.accent }}
                  >
                    {g.category.toUpperCase()}
                  </span>
                  <span className="rounded-full bg-black/60 px-2.5 py-1 text-zinc-300 backdrop-blur-sm">{g.date}</span>
                </div>
                <div className="mt-16">
                  <h3 className="font-sans-tight text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
                    {g.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-base leading-relaxed text-zinc-300 md:text-sm">{g.subtitle}</p>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-3 font-mono-tech text-xs text-zinc-300">
                    <span>{g.issuerOrEvent}</span>
                    <span className="inline-flex items-center gap-1 text-[#00F0FF] group-hover:underline">
                      Inspect study <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
                    </span>
                  </div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>

      {/* Lightbox Modal for Sketchbook & System Plates — Fits small screens & scrolls internally */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveItem(null)}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-3 backdrop-blur-lg sm:p-6 md:p-8"
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={activeItem.title}
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card relative max-h-[calc(100dvh-1.5rem)] w-full max-w-4xl overflow-y-auto overscroll-contain rounded-3xl border border-white/15 p-5 sm:max-h-[90dvh] sm:p-6 md:p-8"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <span
                    className="font-mono-tech text-xs tracking-[0.16em]"
                    style={{ color: activeItem.accent }}
                  >
                    {activeItem.category.toUpperCase()} · {activeItem.date}
                  </span>
                  <h3 className="font-sans-tight mt-1 text-xl font-bold text-white sm:text-2xl md:text-3xl">
                    {activeItem.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveItem(null)}
                  aria-label="Close preview"
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/15 bg-zinc-900 text-zinc-300 hover:border-white/40 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
                <SafeImage
                  src={activeItem.image}
                  alt={activeItem.title}
                  accent={activeItem.accent}
                  className="max-h-[55dvh] w-full object-contain sm:max-h-[60dvh]"
                />
              </div>
              <p className="mt-4 text-base leading-relaxed text-zinc-200">{activeItem.subtitle}</p>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-4 font-mono-tech text-xs text-zinc-400">
                <span>SERIES: {activeItem.issuerOrEvent}</span>
                {activeItem.credentialId && <span>REF ID: {activeItem.credentialId}</span>}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export function Footer() {
  const [copied, setCopied] = useState(false);
  const email = HERO_DATA.socials.email;
  const s = HERO_DATA.socials;

  const handleCopyEmail = async () => {
    playTactileClick('thock');
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2600);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = email;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2600);
    }
  };

  return (
    <footer id="contact" className="border-t border-[#27272a] bg-[#060608] px-4 pb-14 pt-20 md:px-8 md:pt-32 lg:px-10">
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono-tech text-xs tracking-[0.2em] text-[#00F0FF] md:tracking-[0.25em]">
            06 — CONTACT &amp; COLLABORATION
          </span>
          <span className="glass-pill inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono-tech text-xs text-emerald-400">
            <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
            <span>Open to UI Developer · Frontend Design · Design Systems roles</span>
          </span>
        </div>

        <ParallaxFade distance={30}>
          <h2 className="font-display mt-6 text-[clamp(2rem,7vw,6.2rem)] uppercase leading-[0.94] tracking-[-0.03em] text-white md:leading-[0.92]">
            Let&apos;s build something{' '}
            <span className="text-[#00F0FF]">together.</span>
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-300">
            Have a design system to scale, a product interface to ship in React, or a frontend role open on your team?
            Copy my address directly or launch your mail client below.
          </p>

          {/* Visible Email Address + Primary Full-Width Mobile Copy Button + Secondary Mailto Link */}
          <div className="mt-8 w-full max-w-2xl">
            <div className="@container glass-card flex flex-col items-stretch justify-between gap-4 rounded-2xl border border-white/15 p-4 sm:flex-row sm:items-center sm:px-5 sm:py-4">
              <div className="flex min-w-0 items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-[#00F0FF]" />
                <span className="font-mono-tech select-all break-all text-sm font-semibold tracking-wide text-white sm:break-normal md:text-base">
                  {email}
                </span>
              </div>

              <div className="flex flex-col items-stretch gap-2.5 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-live="polite"
                  className={`inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl px-5 py-2.5 font-mono-tech text-xs font-bold tracking-[0.1em] transition-all sm:min-h-[44px] sm:w-auto ${
                    copied
                      ? 'bg-emerald-400 text-black shadow-[0_0_20px_rgba(16,185,129,0.5)]'
                      : 'bg-[#00F0FF] text-black hover:bg-white'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 shrink-0" />
                      COPIED
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 shrink-0" />
                      COPY EMAIL
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${email}`}
                  onClick={() => playTactileClick('click')}
                  className="glass-pill inline-flex min-h-[48px] w-full items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 font-mono-tech text-xs tracking-[0.1em] text-zinc-200 transition-colors hover:border-[#00F0FF]/50 hover:text-white sm:min-h-[44px] sm:w-auto"
                >
                  MAIL APP
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
                </a>
              </div>
            </div>
          </div>
        </ParallaxFade>

        {/* Bottom Bar with Full Labeled 44px Social Links */}
        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-[#27272a] pt-8 font-mono-tech text-xs tracking-[0.14em] text-zinc-400 md:mt-20 md:flex-row md:items-center">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="text-zinc-300">© 2026 {HERO_DATA.name.toUpperCase()}</span>
            <span>{HERO_DATA.locationTag}</span>
          </div>

          <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto">
            {[
              { href: s.github, Icon: GithubIcon, label: 'GitHub' },
              { href: s.linkedin, Icon: LinkedinIcon, label: 'LinkedIn' },
              { href: s.instagram, Icon: InstagramIcon, label: 'Instagram' },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                onClick={() => playTactileClick('click')}
                className="glass-pill inline-flex min-h-[44px] items-center gap-2 rounded-full px-4 py-2.5 text-xs text-zinc-300 transition-colors hover:border-[#00F0FF]/50 hover:text-[#00F0FF] md:min-h-0 md:py-2"
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{label}</span>
                <ArrowUpRight className="h-3.5 w-3.5 shrink-0 opacity-70" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
