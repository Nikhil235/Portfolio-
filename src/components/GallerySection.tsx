'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight, Mail } from 'lucide-react';
import { GALLERY_ITEMS, HERO_DATA } from '../data/portfolioData';
import { MaskedLines, ParallaxFade } from './ScrollText';

function MagneticButton({ children, href }: { children: React.ReactNode; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 180, damping: 14 });
  const y = useSpring(useMotionValue(0), { stiffness: 180, damping: 14 });

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x, y }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.4);
        y.set((e.clientY - r.top - r.height / 2) * 0.4);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="grid h-36 w-36 place-items-center rounded-full bg-[#00F0FF] text-center text-sm font-bold text-black glow-cyan md:h-44 md:w-44"
    >
      {children}
    </motion.a>
  );
}

export default function GallerySection() {
  return (
    <section id="gallery" className="py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <MaskedLines
            className="font-display text-[clamp(2.2rem,6vw,5rem)] uppercase leading-[0.9] tracking-[-0.03em]"
            lines={[<>Origin &amp;</>, <span className="text-zinc-600">Sketchbook</span>]}
          />
          <MagneticButton href="#gallery">
            <span className="flex flex-col items-center gap-1">
              View Sketches
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </MagneticButton>
        </div>
        <div className="grid gap-4 md:grid-cols-12">
          {GALLERY_ITEMS.map((g, i) => (
            <motion.figure
              key={g.id}
              data-cursor="hover"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ delay: (i % 3) * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
              className={`group relative min-h-[320px] overflow-hidden rounded-3xl border border-[#27272a] ${g.span}`}
            >
              <img
                src={g.image}
                alt={g.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover opacity-60 transition-all duration-700 group-hover:scale-105 group-hover:opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <figcaption className="relative flex h-full flex-col justify-between p-6">
                <div className="flex items-center justify-between font-mono-tech text-[10px] tracking-[0.2em]">
                  <span className="rounded-full bg-black/60 px-3 py-1 backdrop-blur" style={{ color: g.accent }}>
                    {g.category.toUpperCase()}
                  </span>
                  <span className="text-zinc-400">{g.date}</span>
                </div>
                <div>
                  <h3 className="font-sans-tight text-xl font-bold leading-tight tracking-tight md:text-2xl">
                    {g.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-zinc-400">{g.subtitle}</p>
                  <div className="mt-4 flex justify-between font-mono-tech text-[10px] text-zinc-500">
                    <span>{g.issuerOrEvent}</span>
                    {g.credentialId && <span>ID: {g.credentialId}</span>}
                  </div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer id="contact" className="border-t border-[#27272a] px-5 pb-10 pt-24 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <p className="font-mono-tech text-[10px] tracking-[0.3em] text-zinc-500">// LET'S BUILD SOMETHING</p>
        <ParallaxFade distance={40}>
          <motion.a
            href={`mailto:${HERO_DATA.socials.email}`}
            whileHover={{ x: 8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="group mt-6 inline-flex items-center gap-4 font-display text-[clamp(2rem,7vw,6.5rem)] uppercase leading-none tracking-[-0.03em] transition-colors hover:text-[#00F0FF]"
          >
            Get in touch{' '}
            <motion.span
              animate={{ rotate: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="inline-block"
            >
              <Mail className="h-[0.6em] w-[0.6em] text-[#00F0FF] transition-transform group-hover:scale-110" />
            </motion.span>
          </motion.a>
        </ParallaxFade>
        <div className="mt-20 flex flex-col justify-between gap-3 font-mono-tech text-[10px] tracking-[0.2em] text-zinc-600 md:flex-row">
          <span>© 2026 {HERO_DATA.name.toUpperCase()}</span>
          <span>{HERO_DATA.locationTag}</span>
        </div>
      </div>
    </footer>
  );
}
