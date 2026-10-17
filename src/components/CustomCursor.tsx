'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 380, damping: 32, mass: 0.5 });
  const [hover, setHover] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setEnabled(true);
    document.body.classList.add('custom-cursor-active');
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement;
      setHover(!!t.closest('a, button, [role="button"], [data-cursor="hover"]'));
    };
    window.addEventListener('mousemove', move);
    return () => {
      window.removeEventListener('mousemove', move);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [x, y]);

  if (!enabled) return null;
  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full border border-[#00F0FF]/70 mix-blend-difference"
        style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%', boxShadow: '0 0 24px rgba(0,240,255,.45)' }}
        animate={{ width: hover ? 56 : 30, height: hover ? 56 : 30, backgroundColor: hover ? 'rgba(0,240,255,0.15)' : 'rgba(0,0,0,0)' }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-[#00F0FF]"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      />
    </>
  );
}
