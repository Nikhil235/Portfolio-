'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Award } from 'lucide-react';
import { EXPERIENCE_ITEMS, FEATURED_BLOGS } from '../data/portfolioData';
import { MaskedLines, CounterParallaxWatermark } from './ScrollText';
import SafeImage from './SafeImage';

function ExperienceList() {
  const [hovered, setHovered] = useState<number | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 200, damping: 25 });
  const sy = useSpring(my, { stiffness: 200, damping: 25 });
  const item = hovered !== null ? EXPERIENCE_ITEMS[hovered] : null;

  return (
    <div
      className="relative"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
      onMouseLeave={() => setHovered(null)}
    >
      <AnimatePresence>
        {item && (
          <motion.div
            key="preview"
            className="pointer-events-none absolute left-0 top-0 z-20 hidden w-80 overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-900 lg:block"
            style={{ x: sx, y: sy, translateX: '-50%', translateY: '-110%' }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <SafeImage src={item.previewImage} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover" />
            <div className="flex items-center gap-2 p-3 font-mono-tech text-[10px] tracking-[0.2em] text-[#00F0FF]">
              <Award className="h-3.5 w-3.5" />
              {item.certificateBadge}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {EXPERIENCE_ITEMS.map((e, i) => (
        <div
          key={e.id}
          onMouseEnter={() => setHovered(i)}
          data-cursor="hover"
          className="group grid gap-4 border-t border-[#27272a] py-8 transition-colors last:border-b md:grid-cols-12 md:items-center"
        >
          <span className="font-mono-tech text-xs text-zinc-600 md:col-span-1">{e.index}</span>
          <div className="md:col-span-6">
            <h3 className="font-sans-tight text-2xl font-bold tracking-tight transition-all duration-500 group-hover:translate-x-3 group-hover:text-[#00F0FF] md:text-3xl">
              {e.role}
            </h3>
            <p className="mt-1 text-sm text-zinc-500">{e.organization}</p>
            <p className="mt-3 max-h-0 overflow-hidden text-sm text-zinc-400 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">
              {e.impact}
            </p>
          </div>
          <span className="w-fit rounded-full border border-[#27272a] px-3 py-1 font-mono-tech text-[10px] tracking-[0.15em] text-zinc-400 md:col-span-2">
            {e.category.toUpperCase()}
          </span>
          <span className="font-mono-tech text-[11px] text-zinc-500 md:col-span-2">{e.period}</span>
          <ArrowUpRight className="hidden h-5 w-5 text-zinc-600 transition-transform group-hover:rotate-45 group-hover:text-white md:col-span-1 md:block md:justify-self-end" />
        </div>
      ))}
    </div>
  );
}

function BlogRail() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-62%']);

  return (
    <div ref={ref} className="relative h-[300vh]">
      {/* pt keeps the pinned "Field Notes" heading clear of the fixed navbar */}
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-20 md:pt-24">
        {/* Multi-Plane Counter-Parallax Ghost Watermark */}
        <CounterParallaxWatermark
          text="FIGMA TO PRODUCTION // 3-TIER TOKENS"
          progress={scrollYProgress}
          range={['5%', '-30%']}
        />

        <div className="relative z-10 mx-auto mb-10 flex w-full max-w-[1400px] items-end justify-between px-5 md:px-10">
          <MaskedLines
            className="font-display text-[clamp(2.2rem,6vw,5rem)] uppercase leading-[0.9] tracking-[-0.03em]"
            lines={[<>Field</>, <span className="text-zinc-600">Notes</span>]}
          />
          <span className="font-mono-tech text-[10px] tracking-[0.3em] text-zinc-500">● SCROLL TO EXPLORE →</span>
        </div>
        <motion.div style={{ x }} className="relative z-10 flex gap-6 pl-5 md:pl-10">
          {FEATURED_BLOGS.map((b) => (
            <article
              key={b.id}
              data-cursor="hover"
              className="glass-card group w-[82vw] shrink-0 overflow-hidden rounded-3xl md:w-[520px]"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <SafeImage
                  src={b.image}
                  accent={b.accentColor}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-105"
                />
                <span
                  className="absolute left-4 top-4 rounded-full bg-black/70 px-3 py-1 font-mono-tech text-[10px] tracking-[0.15em] backdrop-blur"
                  style={{ color: b.accentColor }}
                >
                  {b.tag}
                </span>
              </div>
              <div className="p-6">
                <div className="mb-3 flex gap-4 font-mono-tech text-[10px] text-zinc-500">
                  <span>{b.date}</span>
                  <span>{b.readTime}</span>
                </div>
                <h3 className="font-sans-tight text-xl font-bold leading-tight tracking-tight">{b.title}</h3>
                <p className="mt-3 line-clamp-2 text-sm text-zinc-400">{b.excerpt}</p>
                <div
                  className="mt-5 flex items-center justify-between border-t border-[#27272a] pt-4 font-mono-tech text-[10px]"
                  style={{ color: b.accentColor }}
                >
                  {b.metrics}
                  <ArrowUpRight className="h-4 w-4 text-zinc-500 group-hover:text-white" />
                </div>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  return (
    <section id="work">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <div className="mb-12 flex items-end justify-between">
          <MaskedLines
            className="font-display text-[clamp(2.2rem,6vw,5rem)] uppercase leading-[0.9] tracking-[-0.03em]"
            lines={[<>Selected</>, <span className="text-zinc-600">Experience</span>]}
          />
          <span className="hidden font-mono-tech text-[10px] tracking-[0.3em] text-zinc-600 md:block">
            03 — WORK HISTORY &amp; SYSTEMS
          </span>
        </div>
        <ExperienceList />
      </div>
      <BlogRail />
    </section>
  );
}
