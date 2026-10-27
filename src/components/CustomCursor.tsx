'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  // Outer magnetic ring with damped spring physics
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);
  const sRingX = useSpring(ringX, { stiffness: 420, damping: 28, mass: 0.4 });
  const sRingY = useSpring(ringY, { stiffness: 420, damping: 28, mass: 0.4 });

  const [hoverState, setHoverState] = useState<{
    isHovered: boolean;
    isMagnetic: boolean;
    width: number;
    height: number;
    borderRadius: number;
  }>({
    isHovered: false,
    isMagnetic: false,
    width: 32,
    height: 32,
    borderRadius: 9999,
  });

  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setEnabled(true);
    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const t = (e.target as HTMLElement).closest(
        'a, button, [role="button"], [data-cursor="hover"]'
      ) as HTMLElement | null;

      if (t) {
        const rect = t.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;

        // Magnetic soft pull towards element center (35% attraction)
        const magnetX = e.clientX - dx * 0.35;
        const magnetY = e.clientY - dy * 0.35;
        ringX.set(magnetX);
        ringY.set(magnetY);

        // If target is a compact pill or tag button, morph ring softly to hug it
        const isCompact = rect.width < 140 && rect.height < 52;
        setHoverState({
          isHovered: true,
          isMagnetic: true,
          width: isCompact ? rect.width + 10 : 54,
          height: isCompact ? rect.height + 6 : 54,
          borderRadius: isCompact ? 14 : 9999,
        });
      } else {
        ringX.set(e.clientX);
        ringY.set(e.clientY);
        setHoverState({
          isHovered: false,
          isMagnetic: false,
          width: 32,
          height: 32,
          borderRadius: 9999,
        });
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
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
      {/* Outer Magnetic Ring with Spring Elasticity */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] border border-[#00F0FF]/80 mix-blend-difference"
        style={{
          x: sRingX,
          y: sRingY,
          translateX: '-50%',
          translateY: '-50%',
          boxShadow: hoverState.isHovered
            ? '0 0 28px rgba(0,240,255,0.6)'
            : '0 0 16px rgba(0,240,255,0.35)',
        }}
        animate={{
          width: hoverState.width,
          height: hoverState.height,
          borderRadius: hoverState.borderRadius,
          scale: isClicking ? 0.85 : 1,
          backgroundColor: hoverState.isHovered
            ? 'rgba(0,240,255,0.14)'
            : 'rgba(0,0,0,0)',
        }}
        transition={{ type: 'spring', stiffness: 360, damping: 24 }}
      />

      {/* Center Precise Dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-[#00F0FF]"
        style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: isClicking ? 0.5 : 1 }}
        transition={{ duration: 0.1 }}
      />
    </>
  );
}

