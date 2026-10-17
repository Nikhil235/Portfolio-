'use client';

import { useRef, type ReactNode } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';

type Off = NonNullable<Parameters<typeof useScroll>[0]>['offset'];
const DEFAULT_OFF: Off = ['start 90%', 'start 40%'];

function useProgress<T extends HTMLElement>(offset: Off = DEFAULT_OFF) {
  const ref = useRef<T>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset });
  return { ref, p: scrollYProgress };
}

/* 1. MaskedLines: clean whole-line masked slide-up (no split-character or split-word spans) */
function MaskLine({
  p,
  i,
  n,
  children,
}: {
  p: MotionValue<number>;
  i: number;
  n: number;
  children: ReactNode;
}) {
  const s = (i / n) * 0.4;
  const end = Math.min(s + 0.6, 1);
  const y = useTransform(p, [s, end], ['115%', '0%']);
  const opacity = useTransform(p, [s, s + 0.15, end], [0, 0.7, 1]);

  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <motion.span
        className="block"
        style={{ y, opacity, willChange: 'transform, opacity' }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function MaskedLines({
  lines,
  className = '',
  offset = DEFAULT_OFF,
}: {
  lines: ReactNode[];
  className?: string;
  offset?: Off;
}) {
  const { ref, p } = useProgress<HTMLHeadingElement>(offset);
  const reduce = useReducedMotion();

  return (
    <h2 ref={ref} className={className}>
      {lines.map((l, i) =>
        reduce ? (
          <span key={i} className="block">
            {l}
          </span>
        ) : (
          <MaskLine key={i} p={p} i={i} n={lines.length}>
            {l}
          </MaskLine>
        )
      )}
    </h2>
  );
}

/* 2. ParallaxFade: clean whole-block drift for paragraphs and card groups */
export function ParallaxFade({
  children,
  className = '',
  distance = 40,
  offset = ['start 95%', 'start 55%'],
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
  offset?: Off;
}) {
  const { ref, p } = useProgress<HTMLDivElement>(offset);
  const reduce = useReducedMotion();
  const y = useTransform(p, [0, 1], [distance, 0]);
  const opacity = useTransform(p, [0, 1], [0, 1]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={reduce ? undefined : { y, opacity, willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
}

/* 3. CounterParallaxWatermark: smooth multi-plane ghost watermark */
export function CounterParallaxWatermark({
  text,
  progress,
  range = ['0%', '-35%'],
}: {
  text: string;
  progress: MotionValue<number>;
  range?: [string, string];
}) {
  const x = useTransform(progress, [0, 1], range);
  const opacity = useTransform(progress, [0, 0.5, 1], [0.03, 0.08, 0.03]);

  return (
    <motion.div
      aria-hidden="true"
      style={{ x, opacity, willChange: 'transform' }}
      className="pointer-events-none select-none absolute left-0 top-1/2 -translate-y-1/2 whitespace-nowrap font-display text-[14vw] font-black uppercase tracking-widest text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.15)]"
    >
      {text}
    </motion.div>
  );
}
