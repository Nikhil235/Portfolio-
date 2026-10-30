'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Tightly coupled spring physics (Doherty threshold compliance: minimal trail lag)
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);
  const sRingX = useSpring(ringX, { stiffness: 1200, damping: 52, mass: 0.12 });
  const sRingY = useSpring(ringY, { stiffness: 1200, damping: 52, mass: 0.12 });

  const [hoverState, setHoverState] = useState<{
    isHovered: boolean;
    width: number;
    height: number;
    borderRadius: number;
  }>({
    isHovered: false,
    width: 28,
    height: 28,
    borderRadius: 9999,
  });

  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Strictly disable on touch-primary devices
    const finePointer = window.matchMedia('(pointer: fine) and (hover: hover)').matches;
    if (!finePointer) return;

    setEnabled(true);
    document.body.classList.add('custom-cursor-active');

    const handleTouchStart = () => {
      // If a hybrid touch/mouse device uses touch, immediately disable the custom cursor
      setEnabled(false);
      setIsVisible(false);
      document.body.classList.remove('custom-cursor-active');
    };

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const t = (e.target as HTMLElement | null)?.closest(
        'a, button, [role="button"], [data-cursor="hover"]'
      ) as HTMLElement | null;

      if (t) {
        const rect = t.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;

        // Subtle magnetic pull (18%) so the ring never drifts far from the real pointer
        ringX.set(e.clientX - dx * 0.18);
        ringY.set(e.clientY - dy * 0.18);

        const isCompact = rect.width < 130 && rect.height < 48;
        setHoverState({
          isHovered: true,
          width: isCompact ? rect.width + 8 : 44,
          height: isCompact ? rect.height + 6 : 44,
          borderRadius: isCompact ? 12 : 9999,
        });
      } else {
        ringX.set(e.clientX);
        ringY.set(e.clientY);
        setHoverState({
          isHovered: false,
          width: 28,
          height: 28,
          borderRadius: 9999,
        });
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [mouseX, mouseY, ringX, ringY]);

  if (!enabled || !isVisible) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] border border-[#00F0FF]/85 mix-blend-difference"
        style={{
          x: sRingX,
          y: sRingY,
          translateX: '-50%',
          translateY: '-50%',
          boxShadow: hoverState.isHovered
            ? '0 0 22px rgba(0,240,255,0.55)'
            : '0 0 12px rgba(0,240,255,0.3)',
        }}
        animate={{
          width: hoverState.width,
          height: hoverState.height,
          borderRadius: hoverState.borderRadius,
          scale: isClicking ? 0.88 : 1,
          backgroundColor: hoverState.isHovered
            ? 'rgba(0,240,255,0.12)'
            : 'rgba(0,0,0,0)',
        }}
        transition={{ type: 'spring', stiffness: 700, damping: 38 }}
      />

      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-[#00F0FF]"
        style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: isClicking ? 0.5 : 1 }}
        transition={{ duration: 0.08 }}
      />
    </>
  );
}
