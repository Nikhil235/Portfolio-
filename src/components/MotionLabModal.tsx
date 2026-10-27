'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sliders, Copy, Check, Play, Sparkles } from 'lucide-react';
import { playTactileClick } from '../hooks/useSound';

interface Preset {
  name: string;
  stiffness: number;
  damping: number;
  mass: number;
  desc: string;
}

const PRESETS: Preset[] = [
  { name: 'Apple iOS Sheet', stiffness: 300, damping: 30, mass: 1, desc: 'Critically damped, zero overshoot' },
  { name: 'Linear Micro-Bounce', stiffness: 460, damping: 26, mass: 0.5, desc: 'Snappy UI response with crisp settling' },
  { name: 'Game Juice Pop', stiffness: 380, damping: 14, mass: 0.8, desc: 'High overshoot, juicy arcade recoil' },
  { name: 'Heavy Friction', stiffness: 180, damping: 38, mass: 1.4, desc: 'Weighted mechanical resistance' },
];

export default function MotionLabModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [stiffness, setStiffness] = useState(460);
  const [damping, setDamping] = useState(26);
  const [mass, setMass] = useState(0.5);
  const [testTrigger, setTestTrigger] = useState(0);
  const [copied, setCopied] = useState(false);
  const [exportTab, setExportTab] = useState<'framer' | 'swift' | 'css'>('framer');

  // Calculate approximate spring settling metrics
  const dampingRatio = damping / (2 * Math.sqrt(stiffness * mass));
  const isUnderDamped = dampingRatio < 1;
  const overshootPct = isUnderDamped ? Math.round(Math.exp((-dampingRatio * Math.PI) / Math.sqrt(1 - dampingRatio * dampingRatio)) * 100) : 0;
  const settlingTimeMs = Math.round((4 / (damping / (2 * mass))) * 1000);

  const applyPreset = (p: Preset) => {
    playTactileClick('click');
    setStiffness(p.stiffness);
    setDamping(p.damping);
    setMass(p.mass);
    triggerTest();
  };

  const triggerTest = () => {
    playTactileClick('spark');
    setTestTrigger((prev) => prev + 1);
  };

  const getExportCode = () => {
    if (exportTab === 'framer') {
      return `transition: {\n  type: 'spring',\n  stiffness: ${stiffness},\n  damping: ${damping},\n  mass: ${mass}\n}`;
    }
    if (exportTab === 'swift') {
      const response = ((2 * Math.PI) / Math.sqrt(stiffness / mass)).toFixed(2);
      const fraction = dampingRatio.toFixed(2);
      return `withAnimation(.spring(response: ${response}, dampingFraction: ${fraction})) {\n  isExpanded.toggle()\n}`;
    }
    return `/* Design Token // Spring ${stiffness}-${damping} */\n--spring-duration: ${settlingTimeMs}ms;\n--spring-easing: cubic-bezier(${dampingRatio < 1 ? '0.16, 1.25, 0.38, 1' : '0.16, 1, 0.3, 1'});`;
  };

  const copyToClipboard = () => {
    playTactileClick('thock');
    navigator.clipboard.writeText(getExportCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate SVG curve points for displacement preview
  const generateCurvePath = () => {
    const points: string[] = [];
    const w = 320;
    const h = 80;
    const midY = 50;

    for (let x = 0; x <= w; x += 4) {
      const t = (x / w) * 1.0; // 0 to 1 sec
      const decay = Math.exp((-damping / (2 * mass)) * t);
      const omega = Math.sqrt(Math.max(0.1, stiffness / mass - Math.pow(damping / (2 * mass), 2)));
      const yVal = 1 - decay * Math.cos(omega * t);
      const pixelY = midY - (yVal - 1) * 32;
      points.push(`${x === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${pixelY.toFixed(1)}`);
    }
    return points.join(' ');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              playTactileClick('thock');
              onClose();
            }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-zinc-700 bg-zinc-950 p-6 md:p-8 shadow-[0_30px_90px_rgba(0,240,255,0.25)]"
          >
            {/* Header */}
            <div className="mb-6 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 font-mono-tech text-[10px] tracking-[0.25em] text-[#00F0FF]">
                  <Sliders className="h-3.5 w-3.5" />
                  <span>MOTION PHYSICS LAB // SPRING CALIBRATION</span>
                </div>
                <h3 className="mt-1 font-syne text-2xl font-extrabold text-white md:text-3xl">
                  Spring Token Tuner
                </h3>
              </div>
              <button
                onClick={() => {
                  playTactileClick('thock');
                  onClose();
                }}
                className="grid h-8 w-8 place-items-center rounded-full border border-zinc-800 text-zinc-400 transition-colors hover:border-zinc-600 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Presets */}
            <div className="mb-6 flex flex-wrap gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p.name}
                  onClick={() => applyPreset(p)}
                  className={`rounded-full border px-3 py-1 font-mono-tech text-[10px] transition-all ${
                    stiffness === p.stiffness && damping === p.damping
                      ? 'border-[#00F0FF] bg-[#00F0FF]/15 text-[#00F0FF] shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                      : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700 hover:text-white'
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>

            {/* Interactive Spring Test Stage */}
            <div className="mb-6 grid gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 md:grid-cols-2">
              {/* Live Test Card */}
              <div className="flex flex-col items-center justify-center gap-3 border-b border-zinc-800 pb-4 md:border-b-0 md:border-r md:pr-4">
                <span className="font-mono-tech text-[10px] text-zinc-500">CLICK TO TRIGGER TEST</span>
                <motion.div
                  key={testTrigger}
                  animate={{
                    scale: [0.82, 1],
                    y: [20, 0],
                    rotate: [-4, 0],
                  }}
                  transition={{
                    type: 'spring',
                    stiffness,
                    damping,
                    mass,
                  }}
                  onClick={triggerTest}
                  data-cursor="hover"
                  className="grid h-24 w-32 cursor-pointer place-items-center rounded-2xl border border-[#00F0FF]/50 bg-gradient-to-br from-[#00F0FF]/20 to-[#00F0FF]/5 p-4 text-center shadow-[0_15px_30px_rgba(0,240,255,0.2)]"
                >
                  <Sparkles className="h-6 w-6 text-[#00F0FF]" />
                  <span className="font-mono-tech text-[10px] font-bold text-white">TEST SPRING</span>
                </motion.div>
                <button
                  onClick={triggerTest}
                  className="inline-flex items-center gap-1 font-mono-tech text-[10px] text-zinc-400 hover:text-[#00F0FF]"
                >
                  <Play className="h-2.5 w-2.5" /> Retrigger physics
                </button>
              </div>

              {/* Waveform Visualization */}
              <div className="flex flex-col justify-between">
                <div>
                  <div className="flex justify-between font-mono-tech text-[10px] text-zinc-400">
                    <span>DISPLACEMENT CURVE</span>
                    <span className="text-[#00F0FF]">{overshootPct}% OVERSHOOT</span>
                  </div>
                  <div className="mt-2 h-20 w-full overflow-hidden rounded-lg bg-black/50 p-1">
                    <svg className="h-full w-full" viewBox="0 0 320 80" preserveAspectRatio="none">
                      {/* Target baseline line */}
                      <line x1="0" y1="50" x2="320" y2="50" stroke="#3f3f46" strokeDasharray="2 2" strokeWidth="1" />
                      {/* Spring curve */}
                      <path d={generateCurvePath()} fill="none" stroke="#00F0FF" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
                <div className="mt-2 flex justify-between font-mono-tech text-[10px] text-zinc-500">
                  <span>SETTLING: ~{settlingTimeMs}ms</span>
                  <span>RATIO (ζ): {dampingRatio.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Sliders */}
            <div className="mb-6 space-y-4 font-mono-tech text-xs">
              <div>
                <div className="flex justify-between text-zinc-400">
                  <span>STIFFNESS ({stiffness})</span>
                  <span className="text-zinc-600">Speed / Tension</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="800"
                  step="10"
                  value={stiffness}
                  onChange={(e) => {
                    setStiffness(Number(e.target.value));
                    triggerTest();
                  }}
                  className="mt-1 w-full accent-[#00F0FF]"
                />
              </div>

              <div>
                <div className="flex justify-between text-zinc-400">
                  <span>DAMPING ({damping})</span>
                  <span className="text-zinc-600">Friction / Oscillation suppression</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="60"
                  step="1"
                  value={damping}
                  onChange={(e) => {
                    setDamping(Number(e.target.value));
                    triggerTest();
                  }}
                  className="mt-1 w-full accent-[#00F0FF]"
                />
              </div>

              <div>
                <div className="flex justify-between text-zinc-400">
                  <span>MASS ({mass}x)</span>
                  <span className="text-zinc-600">Inertia / Weight</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="2.0"
                  step="0.1"
                  value={mass}
                  onChange={(e) => {
                    setMass(Number(e.target.value));
                    triggerTest();
                  }}
                  className="mt-1 w-full accent-[#00F0FF]"
                />
              </div>
            </div>

            {/* Code Export Tabs */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex gap-2">
                  {(['framer', 'swift', 'css'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => {
                        playTactileClick('click');
                        setExportTab(tab);
                      }}
                      className={`font-mono-tech text-[10px] uppercase transition-colors ${
                        exportTab === tab ? 'text-[#00F0FF] underline underline-offset-4' : 'text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      {tab === 'framer' ? 'Framer Motion' : tab === 'swift' ? 'SwiftUI' : 'CSS Tokens'}
                    </button>
                  ))}
                </div>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-2.5 py-1 font-mono-tech text-[10px] text-zinc-300 transition-colors hover:border-[#00F0FF]/60 hover:text-white"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-400" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" /> Copy Token
                    </>
                  )}
                </button>
              </div>
              <pre className="overflow-x-auto font-mono-tech text-[11px] text-zinc-400">
                <code>{getExportCode()}</code>
              </pre>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
