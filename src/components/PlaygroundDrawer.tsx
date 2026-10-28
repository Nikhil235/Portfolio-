'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from 'framer-motion';
import {
  X,
  Sparkles,
  Zap,
  Volume2,
  Layers,
  Magnet,
  Maximize2,
  RotateCcw,
  Check,
  Sliders,
} from 'lucide-react';
import { playTactileClick, SoundType } from '../hooks/useSound';

interface PlaygroundDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSpringLab?: () => void;
}

export default function PlaygroundDrawer({
  isOpen,
  onClose,
  onOpenSpringLab,
}: PlaygroundDrawerProps) {
  const [activeTab, setActiveTab] = useState<'magnetic' | 'sound' | 'hologram'>('magnetic');

  // Escape key handler
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />

          {/* Slide-over Drawer */}
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Interactive Playgrounds"
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xl flex-col border-l border-white/10 bg-[#0A0A0A]/95 text-white shadow-2xl backdrop-blur-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#00F0FF]/30 bg-[#00F0FF]/10 text-[#00F0FF]">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono-tech text-[10px] uppercase tracking-[0.25em] text-[#00F0FF]">
                      Engineering Labs
                    </span>
                    <span className="rounded bg-white/10 px-1.5 py-0.5 font-mono-tech text-[9px] text-zinc-400">
                      v2.0
                    </span>
                  </div>
                  <h2 className="text-lg font-bold tracking-tight text-white">
                    Interactive Playgrounds
                  </h2>
                </div>
              </div>

              <button
                onClick={() => {
                  playTactileClick('thock');
                  onClose();
                }}
                aria-label="Close Playgrounds"
                className="rounded-full border border-white/10 p-2 text-zinc-400 transition-colors hover:border-white/30 hover:bg-white/5 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Sub-navigation tabs */}
            <div className="flex border-b border-white/10 px-6 py-2.5">
              <nav className="flex items-center gap-1.5">
                {[
                  { id: 'magnetic', label: 'Magnetic Spring', icon: Magnet },
                  { id: 'sound', label: 'Tactile Audio', icon: Volume2 },
                  { id: 'hologram', label: '3D Tilt Card', icon: Layers },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        playTactileClick('click');
                        setActiveTab(tab.id as any);
                      }}
                      className={`flex items-center gap-2 rounded-lg px-3 py-1.5 font-mono-tech text-xs transition-colors ${
                        isActive
                          ? 'border border-[#00F0FF]/30 bg-[#00F0FF]/10 text-[#00F0FF]'
                          : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Sandbox Content Area */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'magnetic' && <MagneticDemo />}
              {activeTab === 'sound' && <TactileAudioDemo />}
              {activeTab === 'hologram' && <HologramDemo />}
            </div>

            {/* Footer with Spring Lab handoff */}
            <div className="flex items-center justify-between border-t border-white/10 bg-black/40 px-6 py-4">
              <span className="font-mono-tech text-[11px] text-zinc-500">
                Want to tweak raw damping formulas?
              </span>
              <button
                onClick={() => {
                  playTactileClick('spark');
                  onClose();
                  onOpenSpringLab?.();
                }}
                className="flex items-center gap-1.5 rounded-lg border border-[#F5B83D]/40 bg-[#F5B83D]/10 px-3 py-1.5 font-mono-tech text-xs font-semibold text-[#F5B83D] transition-colors hover:bg-[#F5B83D]/20"
              >
                <Sliders className="h-3.5 w-3.5" />
                <span>Launch Spring Lab</span>
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

/** 1. MAGNETIC BUTTON PROTOTYPE */
function MagneticDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [strength, setStrength] = useState(0.45);
  const [coords, setCoords] = useState({ x: 0, y: 0, distance: 0 });

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 350, damping: 25 });
  const springY = useSpring(y, { stiffness: 350, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Magnetic pull radius 160px
    if (dist < 160) {
      x.set(dx * strength);
      y.set(dy * strength);
      setCoords({ x: Math.round(dx), y: Math.round(dy), distance: Math.round(dist) });
    } else {
      x.set(0);
      y.set(0);
      setCoords({ x: 0, y: 0, distance: Math.round(dist) });
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setCoords({ x: 0, y: 0, distance: 0 });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-white">Dynamic Magnetic Attractor</h3>
        <p className="mt-1 text-xs text-zinc-400">
          Simulates inverse-square gravitational falloff. Move your cursor near the orb to pull it toward your pointer.
        </p>
      </div>

      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative flex h-64 w-full items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent"
      >
        {/* Subtle grid backdrop */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Magnetic Attractor target */}
        <motion.div
          style={{ x: springX, y: springY }}
          onClick={() => playTactileClick('combo')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="group relative z-10 flex h-24 w-24 cursor-pointer items-center justify-center rounded-full border border-[#00F0FF]/40 bg-[#00F0FF]/15 text-[#00F0FF] shadow-[0_0_30px_rgba(0,240,255,0.25)] backdrop-blur-md transition-shadow hover:shadow-[0_0_50px_rgba(0,240,255,0.5)]"
        >
          <Magnet className="h-8 w-8 transition-transform group-hover:scale-110" />
          <span className="absolute -bottom-6 font-mono-tech text-[10px] tracking-widest text-[#00F0FF]/80">
            PULL ME
          </span>
        </motion.div>
      </div>

      {/* Real-time telemetry */}
      <div className="grid grid-cols-3 gap-3 rounded-xl border border-white/10 bg-black/40 p-3 font-mono-tech text-xs">
        <div>
          <span className="text-[10px] text-zinc-500">DELTA X</span>
          <div className="text-white">{coords.x}px</div>
        </div>
        <div>
          <span className="text-[10px] text-zinc-500">DELTA Y</span>
          <div className="text-white">{coords.y}px</div>
        </div>
        <div>
          <span className="text-[10px] text-zinc-500">DISTANCE</span>
          <div className="text-[#00F0FF]">{coords.distance}px</div>
        </div>
      </div>

      {/* Magnetic Strength Slider */}
      <div className="space-y-2 rounded-xl border border-white/10 bg-white/[0.02] p-4">
        <div className="flex justify-between font-mono-tech text-xs">
          <span className="text-zinc-400">Magnetic Strength</span>
          <span className="text-[#00F0FF]">{Math.round(strength * 100)}%</span>
        </div>
        <input
          type="range"
          min="0.1"
          max="0.8"
          step="0.05"
          value={strength}
          onChange={(e) => setStrength(parseFloat(e.target.value))}
          className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-zinc-800 accent-[#00F0FF]"
        />
      </div>
    </div>
  );
}

/** 2. TACTILE AUDIO SYNTHESIZER */
function TactileAudioDemo() {
  const [lastPlayed, setLastPlayed] = useState<string | null>(null);

  const pads: { id: SoundType; label: string; desc: string; icon: string }[] = [
    { id: 'thock', label: 'Lubed Thock', desc: 'Mechanical keyboard switch sound (sine ramp down)', icon: '⌨️' },
    { id: 'spark', label: 'Electric Spark', desc: 'High-frequency particle burst (triangle 1600Hz)', icon: '⚡' },
    { id: 'hit', label: 'Sub Kick', desc: 'Low-frequency bass thump for heavy impact', icon: '🎯' },
    { id: 'combo', label: 'Juicy Pop', desc: 'Arcade celebratory ascending chord', icon: '✨' },
    { id: 'click', label: 'Tactile Tick', desc: 'Crisp micro-interaction feedback', icon: '🔘' },
    { id: 'key', label: 'Soft Typing', desc: 'Subtle terminal keypress sound', icon: '💻' },
  ];

  const handlePlay = (id: SoundType, label: string) => {
    playTactileClick(id);
    setLastPlayed(label);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-white">Synthesized Web Audio Engine</h3>
        <p className="mt-1 text-xs text-zinc-400">
          Zero external MP3 audio files. Every sound is procedurally synthesized in real-time with Web Audio oscillators and micro-pitch jitter.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {pads.map((pad) => (
          <motion.button
            key={pad.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => handlePlay(pad.id, pad.label)}
            className="flex flex-col items-start rounded-xl border border-white/10 bg-white/[0.03] p-4 text-left transition-all hover:border-[#F5B83D]/50 hover:bg-[#F5B83D]/10 hover:shadow-[0_0_20px_rgba(245,184,61,0.15)]"
          >
            <span className="text-xl">{pad.icon}</span>
            <span className="mt-2 text-sm font-bold text-white">{pad.label}</span>
            <span className="mt-1 text-[11px] text-zinc-400">{pad.desc}</span>
          </motion.button>
        ))}
      </div>

      {lastPlayed && (
        <div className="flex items-center justify-between rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 font-mono-tech text-xs text-emerald-400">
          <span>TRIGGERED: {lastPlayed}</span>
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
        </div>
      )}
    </div>
  );
}

/** 3. 3D GLASS HOLOGRAM CARD */
function HologramDemo() {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  const springRotX = useSpring(rotX, { stiffness: 300, damping: 20 });
  const springRotY = useSpring(rotY, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    rotX.set(-((y - centerY) / centerY) * 16);
    rotY.set(((x - centerX) / centerX) * 16);
    glareX.set((x / rect.width) * 100);
    glareY.set((y / rect.height) * 100);
  };

  const handleMouseLeave = () => {
    rotX.set(0);
    rotY.set(0);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-white">3D Holographic Parallax Card</h3>
        <p className="mt-1 text-xs text-zinc-400">
          Hardware-accelerated perspective tilt with dynamic specular reflection and layered Z-depth typography.
        </p>
      </div>

      <div className="flex items-center justify-center py-4" style={{ perspective: 1000 }}>
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX: springRotX,
            rotateY: springRotY,
            transformStyle: 'preserve-3d',
          }}
          className="relative h-72 w-full max-w-sm cursor-grab rounded-2xl border border-white/20 bg-gradient-to-br from-neutral-900/90 via-black to-neutral-950 p-6 shadow-2xl active:cursor-grabbing"
        >
          {/* Specular glare overlay */}
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-40 mix-blend-overlay"
            style={{
              background: `radial-gradient(circle at ${glareX.get()}% ${glareY.get()}%, rgba(255,255,255,0.8), transparent 60%)`,
            }}
          />

          {/* Hologram Card Body */}
          <div className="flex h-full flex-col justify-between" style={{ transform: 'translateZ(30px)' }}>
            <div className="flex items-center justify-between">
              <span className="font-mono-tech text-[10px] tracking-widest text-[#00F0FF]">
                HOLOGRAM // 001
              </span>
              <span className="rounded-full border border-white/20 bg-white/10 px-2 py-0.5 font-mono-tech text-[9px] text-zinc-300">
                120 FPS
              </span>
            </div>

            <div>
              <h4 className="text-xl font-black tracking-tight text-white">
                NIKHIL.ARJUN
              </h4>
              <p className="font-mono-tech text-xs text-zinc-400">
                Senior Creative Technologist
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-4 font-mono-tech text-[11px] text-zinc-400">
              <span>TILT TO EXPLORE</span>
              <span className="text-[#F5B83D]">3D DEPTH</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
