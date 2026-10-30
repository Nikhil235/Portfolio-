'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';

// Hand-drawn single-stroke cursive "hello"
const HELLO_PATH =
  'M20 92 C40 70 58 38 52 22 C46 8 30 30 28 60 C26 80 24 96 24 100 C30 78 44 62 54 66 C64 70 56 98 66 98 C76 98 84 86 92 78 C104 66 116 66 112 76 C108 88 92 96 92 86 C92 74 110 64 122 82 C130 96 146 90 156 70 C168 46 170 18 160 22 C148 28 146 74 152 92 C158 104 172 90 184 70 C196 46 198 18 188 22 C176 28 174 74 180 92 C186 104 200 96 212 80 C220 70 236 68 238 82 C240 96 222 102 216 90 C210 78 226 66 240 74 C248 78 254 76 262 70';

export const PRELOADER_SEEN_KEY = 'na:preloader-seen';
const INTRO_MS = 1650; // Crisp ~1.65s draw + 0.45s curtain lift

/**
 * Only skip automatically in headless Playwright test runners when they opt out;
 * in a real browser, always play the signature "hello" intro loader on page load/refresh.
 */
export function shouldSkipPreloader(): boolean {
  if (typeof window === 'undefined') return true;
  if (window.navigator.webdriver) {
    try {
      if (sessionStorage.getItem(PRELOADER_SEEN_KEY)) return true;
    } catch {
      /* ignore */
    }
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return true;
  }
  return false;
}

export default function Preloader({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      onDone();
    };

    const intro = setTimeout(finish, INTRO_MS);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        finish();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(intro);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onDone]);

  return (
    <motion.div
      role="status"
      aria-label="Loading portfolio"
      onClick={onDone}
      className="fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center bg-[#050505]"
      exit={{ y: '-100%', transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] } }}
    >
      <motion.svg
        viewBox="0 0 280 120"
        className="w-[min(58vw,340px)]"
        aria-hidden
        exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.25 } }}
      >
        <motion.path
          d={HELLO_PATH}
          fill="none"
          stroke="#fff"
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.35, ease: [0.65, 0, 0.35, 1] }}
        />
      </motion.svg>

      <div className="font-mono-tech absolute bottom-10 flex flex-col items-center gap-3">
        <span className="text-xs tracking-[0.3em] text-zinc-300">LOADING / NIKHIL.ARJUN</span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDone();
          }}
          className="rounded-full border border-white/20 bg-zinc-900/90 px-4 py-1.5 text-xs font-medium tracking-[0.18em] text-white transition-colors hover:border-[#00F0FF] hover:text-[#00F0FF]"
        >
          SKIP INTRO →
        </button>
      </div>
    </motion.div>
  );
}
