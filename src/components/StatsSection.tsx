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
  run,
}: {
  start: number;
  end: number;
  decimals: number;
  suffix: string;
  run: boolean;
}) {
  const [v, setV] = useState(start);
  useEffect(() => {
    if (!run) return;
    const c = animate(start, end, { duration: 2.6, ease: [0.22, 1, 0.36, 1], onUpdate: setV });
    return () => c.stop();
  }, [run, start, end]);

  const [main, ...rest] = suffix.split('/');
  return (
    <span className="font-mono-tech text-2xl font-bold tabular-nums text-white md:text-3xl">
      {v.toFixed(decimals)}
      {rest.length ? (
        <span className="text-base text-zinc-500">/{rest.join('/')}</span>
      ) : (
        <span className="text-lg">{main}</span>
      )}
    </span>
  );
}

// Clean whole-line colored block sweep (no split text / character splitting)
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
    <span className="relative inline-block my-0.5">
      <motion.span
        initial={{ opacity: 0 }}
        animate={run ? { opacity: 1 } : {}}
        transition={{ delay: delay + 0.45, duration: 0.01 }}
      >
        {text}
      </motion.span>
      <motion.span
        aria-hidden
        className="absolute inset-y-[8%] left-0 w-full"
        style={{ background: color, originX: 0 }}
        initial={{ scaleX: 0 }}
        animate={run ? { scaleX: [0, 1, 1, 0], originX: [0, 0, 1, 1] } : {}}
        transition={{ delay, duration: 1, times: [0, 0.45, 0.5, 1], ease: 'easeInOut' }}
      />
    </span>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLElement>(null);
  const run = useInView(ref, { once: true, margin: '-20%' });

  return (
    <section ref={ref} className="relative py-28 md:py-40">
      <div className="mx-auto flex max-w-5xl flex-col items-center px-5 text-center">
        <span className="glass-pill mb-8 flex items-center gap-2 rounded-full px-3 py-1 font-mono-tech text-[10px] tracking-[0.2em] text-zinc-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> PROFESSIONAL STATISTICS
        </span>

        <h2 className="font-sans-tight text-[clamp(1.8rem,4.8vw,3.75rem)] font-bold leading-[1.08] tracking-[-0.04em]">
          {STATS_LINES.map((l, i) => (
            <div key={l.text}>
              <RevealLine text={l.text} color={l.blockColor} delay={i * 0.55} run={run} />
            </div>
          ))}
        </h2>

        <ParallaxFade className="w-full max-w-3xl" distance={40}>
          <div className="glass-card mt-14 grid w-full grid-cols-2 rounded-2xl md:grid-cols-4">
            {KEY_METRICS.map((m, i) => (
              <motion.div
                key={m.id}
                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                transition={{ duration: 0.2 }}
                className={`flex flex-col items-center gap-2 px-4 py-6 transition-colors ${
                  i > 0 ? 'md:border-l' : ''
                } ${i % 2 ? 'border-l md:border-l' : ''} ${i > 1 ? 'border-t md:border-t-0' : ''} border-[#27272a]`}
              >
                <span className="font-mono-tech text-[9px] tracking-[0.2em] text-zinc-500">{m.label}</span>
                <Counter start={m.startValue} end={m.endValue} decimals={m.decimals} suffix={m.suffix} run={run} />
              </motion.div>
            ))}
          </div>
        </ParallaxFade>
      </div>
    </section>
  );
}
