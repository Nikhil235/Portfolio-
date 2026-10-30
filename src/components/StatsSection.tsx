'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView } from 'framer-motion';
import { KEY_METRICS, STATS_LINES } from '../data/portfolioData';
import { ParallaxFade } from './ScrollText';

function Counter({
  start,
  end,
  decimals,
  suffix,
  accent,
  run,
}: {
  start: number;
  end: number;
  decimals: number;
  suffix: string;
  accent: string;
  run: boolean;
}) {
  const [v, setV] = useState(start);
  useEffect(() => {
    if (!run) return;
    const c = animate(start, end, { duration: 1.8, ease: [0.22, 1, 0.36, 1], onUpdate: setV });
    return () => c.stop();
  }, [run, start, end]);

  const formatted = Number(v.toFixed(decimals)).toLocaleString('en-US');

  return (
    <span className="font-display text-4xl font-bold tabular-nums tracking-tight text-white sm:text-5xl md:text-6xl">
      {formatted}
      <span className="ml-0.5 text-2xl sm:text-3xl" style={{ color: accent }}>
        {suffix}
      </span>
    </span>
  );
}

function RevealLine({
  text,
  color,
  delay,
  run,
}: {
  text: string;
  color: string;
  delay: number;
  run: boolean;
}) {
  return (
    <span className="relative my-0.5 inline-block">
      <motion.span
        initial={{ opacity: 0 }}
        animate={run ? { opacity: 1 } : {}}
        transition={{ delay: delay + 0.35, duration: 0.01 }}
      >
        {text}
      </motion.span>
      <motion.span
        aria-hidden
        className="absolute inset-y-[8%] left-0 w-full"
        style={{ background: color, originX: 0 }}
        initial={{ scaleX: 0 }}
        animate={run ? { scaleX: [0, 1, 1, 0], originX: [0, 0, 1, 1] } : {}}
        transition={{ delay, duration: 0.85, times: [0, 0.45, 0.5, 1], ease: 'easeInOut' }}
      />
    </span>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLElement>(null);
  const run = useInView(ref, { once: true, margin: '-15%' });

  return (
    <section ref={ref} className="relative py-24 md:py-32">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center px-5 text-center md:px-10">
        <span className="glass-pill mb-6 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono-tech text-xs tracking-[0.2em] text-zinc-200">
          <span className="h-2 w-2 rounded-full bg-emerald-400" /> MEASURED IMPACT &amp; PROOF
        </span>

        {/* Concise two-line statement so the numbers below remain the primary visual hero */}
        <h2 className="font-sans-tight max-w-3xl text-[clamp(1.35rem,2.8vw,2.25rem)] font-bold leading-[1.2] tracking-[-0.03em] text-zinc-200">
          {STATS_LINES.map((l, i) => (
            <div key={l.text}>
              <RevealLine text={l.text} color={l.blockColor} delay={i * 0.4} run={run} />
            </div>
          ))}
        </h2>

        <ParallaxFade className="mt-12 w-full" distance={30}>
          <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {KEY_METRICS.map((m) => (
              <motion.div
                key={m.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="glass-card flex flex-col items-start justify-between rounded-3xl border border-[#27272a] p-6 text-left transition-colors hover:border-white/25"
              >
                <div className="w-full">
                  <div className="mb-3 flex items-center justify-between">
                    <span
                      className="font-mono-tech text-xs font-semibold tracking-[0.16em]"
                      style={{ color: m.accent }}
                    >
                      {m.label}
                    </span>
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: m.accent }}
                    />
                  </div>
                  <Counter
                    start={m.startValue}
                    end={m.endValue}
                    decimals={m.decimals}
                    suffix={m.suffix}
                    accent={m.accent}
                    run={run}
                  />
                </div>

                <p className="mt-4 border-t border-white/10 pt-3.5 text-xs leading-relaxed text-zinc-300">
                  {m.description}
                </p>
              </motion.div>
            ))}
          </div>
        </ParallaxFade>
      </div>
    </section>
  );
}
