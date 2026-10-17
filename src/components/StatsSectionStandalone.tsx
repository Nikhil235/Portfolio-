'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView } from 'framer-motion';

const STATS_LINES = [
  { text: 'Data that speaks. AI that reasons.', blockColor: '#5865F2' },
  { text: 'Software that ships.', blockColor: '#10B981' },
  { text: 'Three disciplines, one engineer', blockColor: '#F59E0B' },
  { text: '— the numbers behind the work.', blockColor: '#EF4444' },
];

const KEY_METRICS = [
  { id: 'gpa', label: 'CURRENT GPA', startValue: 1.0, endValue: 3.88, decimals: 2, suffix: '/4.0' },
  { id: 'projects', label: 'PROJECTS COMPLETED', startValue: 1, endValue: 14, decimals: 0, suffix: '+' },
  { id: 'experience', label: 'PROFESSIONAL EXP', startValue: 1, endValue: 2, decimals: 0, suffix: '+ Years' },
  { id: 'tools', label: 'TECH & TOOLS', startValue: 1, endValue: 23, decimals: 0, suffix: '+' },
];

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
    <span className="font-mono text-2xl font-bold tabular-nums text-white md:text-3xl">
      {v.toFixed(decimals)}
      {rest.length ? <span className="text-base text-zinc-500">/{rest.join('/')}</span> : <span className="text-lg">{main}</span>}
    </span>
  );
}

// A colored block sweeps across, then the text appears
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

export default function StatsSectionStandalone() {
  const ref = useRef<HTMLElement>(null);
  const run = useInView(ref, { once: true, margin: '-20%' });

  return (
    <section ref={ref} className="relative py-28 md:py-40 bg-[#080808] text-white">
      <div className="mx-auto flex max-w-5xl flex-col items-center px-5 text-center">
        <span className="mb-8 flex items-center gap-2 rounded-full border border-zinc-700/50 bg-zinc-900/80 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-zinc-300 backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> PROFESSIONAL STATISTICS
        </span>
        <h2 className="text-[clamp(1.8rem,4.8vw,3.75rem)] font-bold leading-[1.08] tracking-[-0.04em] flex flex-col items-center">
          {STATS_LINES.map((l, i) => (
            <div key={l.text}>
              <RevealLine text={l.text} color={l.blockColor} delay={i * 0.55} run={run} />
            </div>
          ))}
        </h2>
        <div className="mt-14 grid w-full max-w-3xl grid-cols-2 rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900/80 to-zinc-950/90 p-1 backdrop-blur-xl md:grid-cols-4">
          {KEY_METRICS.map((m, i) => (
            <div
              key={m.id}
              className={`flex flex-col items-center gap-2 px-4 py-6 ${i > 0 ? 'md:border-l' : ''} ${
                i % 2 ? 'border-l md:border-l' : ''
              } ${i > 1 ? 'border-t md:border-t-0' : ''} border-zinc-800`}
            >
              <span className="font-mono text-[9px] tracking-[0.2em] text-zinc-500">{m.label}</span>
              <Counter start={m.startValue} end={m.endValue} decimals={m.decimals} suffix={m.suffix} run={run} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
