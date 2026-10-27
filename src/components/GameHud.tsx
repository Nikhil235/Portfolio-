'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, X, Trophy, Flame, Activity } from 'lucide-react';
import { playTactileClick } from '../hooks/useSound';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
}

interface Target {
  id: string;
  label: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  points: number;
}

export default function GameHud({
  isActive,
  onClose,
}: {
  isActive: boolean;
  onClose: () => void;
}) {
  const [fps, setFps] = useState(120);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const [shake, setShake] = useState(false);
  const [popups, setPopups] = useState<{ id: number; text: string; x: number; y: number }[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);

  const [targets, setTargets] = useState<Target[]>([
    { id: 't1', label: '0 DRIFT', x: 20, y: 35, vx: 0.3, vy: 0.2, color: '#00F0FF', points: 100 },
    { id: 't2', label: '120 FPS', x: 75, y: 45, vx: -0.25, vy: 0.35, color: '#F5B83D', points: 150 },
    { id: 't3', label: '3-TIER TOKENS', x: 45, y: 70, vx: 0.2, vy: -0.3, color: '#10B981', points: 120 },
    { id: 't4', label: 'GAME JUICE', x: 80, y: 25, vx: -0.3, vy: -0.2, color: '#f43f5e', points: 200 },
  ]);

  // Real-time FPS measurement via requestAnimationFrame
  useEffect(() => {
    if (!isActive) return;
    let lastTime = performance.now();
    let frameCount = 0;
    let animId: number;

    const loop = (now: number) => {
      frameCount++;
      if (now - lastTime >= 500) {
        const calculatedFps = Math.round((frameCount * 1000) / (now - lastTime));
        setFps(Math.min(144, Math.max(55, calculatedFps)));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isActive]);

  // Target drift motion loop
  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setTargets((prev) =>
        prev.map((t) => {
          let newX = t.x + t.vx;
          let newY = t.y + t.vy;
          let newVx = t.vx;
          let newVy = t.vy;

          if (newX < 10 || newX > 88) newVx = -t.vx;
          if (newY < 15 || newY > 85) newVy = -t.vy;

          return { ...t, x: newX, y: newY, vx: newVx, vy: newVy };
        })
      );
    }, 40);

    return () => clearInterval(interval);
  }, [isActive]);

  // Particle physics update loop
  useEffect(() => {
    if (particles.length === 0) return;
    const anim = requestAnimationFrame(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.3, // Gravity
          }))
          .filter((p) => p.y < window.innerHeight + 50)
      );
    });
    return () => cancelAnimationFrame(anim);
  }, [particles]);

  const handleTargetClick = (target: Target, e: React.MouseEvent) => {
    e.stopPropagation();
    playTactileClick('combo');
    setShake(true);
    setTimeout(() => setShake(false), 200);

    const hitScore = target.points * combo;
    setScore((prev) => prev + hitScore);
    setCombo((prev) => Math.min(8, prev + 1));

    // Spawn score popup
    const popupId = Date.now() + Math.random();
    setPopups((prev) => [
      ...prev,
      { id: popupId, text: `+${hitScore} ${combo > 1 ? `(${combo}x COMBO!)` : ''}`, x: e.clientX, y: e.clientY },
    ]);
    setTimeout(() => {
      setPopups((prev) => prev.filter((p) => p.id !== popupId));
    }, 1000);

    // Spawn 16 physical sparks
    const newParticles: Particle[] = Array.from({ length: 16 }).map((_, idx) => {
      const angle = (idx / 16) * Math.PI * 2;
      const speed = 4 + Math.random() * 6;
      return {
        id: Date.now() + idx,
        x: e.clientX,
        y: e.clientY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        color: target.color,
      };
    });
    setParticles((prev) => [...prev.slice(-30), ...newParticles]);

    // Respawn target to random edge
    setTargets((prev) =>
      prev.map((t) =>
        t.id === target.id
          ? {
              ...t,
              x: Math.random() * 70 + 15,
              y: Math.random() * 60 + 20,
              vx: (Math.random() - 0.5) * 0.6,
              vy: (Math.random() - 0.5) * 0.6,
            }
          : t
      )
    );
  };

  if (!isActive) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-50 overflow-hidden transition-transform ${
        shake ? 'translate-x-0.5 -translate-y-0.5' : ''
      }`}
    >
      {/* Top HUD Bar */}
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -60, opacity: 0 }}
        className="pointer-events-auto absolute inset-x-0 top-0 flex items-center justify-between border-b border-[#00F0FF]/30 bg-black/85 px-4 py-3 backdrop-blur-md md:px-10"
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 rounded-full border border-[#00F0FF]/40 bg-[#00F0FF]/15 px-3 py-1 font-mono-tech text-xs font-bold text-[#00F0FF]">
            <Gamepad2 className="h-3.5 w-3.5 animate-pulse" />
            <span>ARCADE GAME MODE</span>
          </div>
          <div className="hidden items-center gap-2 font-mono-tech text-[11px] text-zinc-400 sm:flex">
            <Activity className="h-3.5 w-3.5 text-emerald-400" />
            <span>{fps} FPS // 8.3ms</span>
          </div>
        </div>

        {/* Score & Combo */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 font-mono-tech text-sm">
            <Trophy className="h-4 w-4 text-[#F5B83D]" />
            <span className="font-bold text-white">{score.toLocaleString()}</span>
            <span className="text-[10px] text-zinc-500">PTS</span>
          </div>

          <div className="flex items-center gap-1.5 font-mono-tech text-xs">
            <Flame className="h-3.5 w-3.5 text-rose-500" />
            <span className="font-bold text-rose-400">{combo}x COMBO</span>
          </div>

          <button
            onClick={() => {
              playTactileClick('thock');
              onClose();
            }}
            className="flex items-center gap-1 rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1 font-mono-tech text-[10px] text-zinc-300 transition-colors hover:border-white hover:text-white"
          >
            <X className="h-3 w-3" /> EXIT
          </button>
        </div>
      </motion.div>

      {/* Floating Target Chips */}
      {targets.map((t) => (
        <motion.div
          key={t.id}
          style={{ left: `${t.x}%`, top: `${t.y}%` }}
          onClick={(e) => handleTargetClick(t, e)}
          whileHover={{ scale: 1.25 }}
          whileTap={{ scale: 0.9 }}
          data-cursor="hover"
          title={`Click target for +${t.points * combo} points!`}
          className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer select-none rounded-full border px-3.5 py-1.5 font-mono-tech text-xs font-bold shadow-lg backdrop-blur-md"
          style={{
            borderColor: t.color,
            backgroundColor: `${t.color}25`,
            color: t.color,
            boxShadow: `0 0 20px ${t.color}40`,
          }}
        >
          {t.label}
        </motion.div>
      ))}

      {/* Flying Score Popups */}
      <AnimatePresence>
        {popups.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, y: 0, scale: 1 }}
            animate={{ opacity: 0, y: -45, scale: 1.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="pointer-events-none fixed font-mono-tech text-sm font-extrabold text-[#00F0FF] drop-shadow-[0_0_12px_#00F0FF]"
            style={{ left: p.x, top: p.y }}
          >
            {p.text}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Sparks Canvas */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="pointer-events-none fixed h-1.5 w-1.5 rounded-full"
          style={{
            left: p.x,
            top: p.y,
            backgroundColor: p.color,
            boxShadow: `0 0 10px ${p.color}`,
          }}
        />
      ))}
    </div>
  );
}
