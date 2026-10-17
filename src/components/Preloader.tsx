'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';

// Hand-drawn single-stroke cursive "hello"
const HELLO_PATH =
  'M20 92 C40 70 58 38 52 22 C46 8 30 30 28 60 C26 80 24 96 24 100 C30 78 44 62 54 66 C64 70 56 98 66 98 C76 98 84 86 92 78 C104 66 116 66 112 76 C108 88 92 96 92 86 C92 74 110 64 122 82 C130 96 146 90 156 70 C168 46 170 18 160 22 C148 28 146 74 152 92 C158 104 172 90 184 70 C196 46 198 18 188 22 C176 28 174 74 180 92 C186 104 200 96 212 80 C220 70 236 68 238 82 C240 96 222 102 216 90 C210 78 226 66 240 74 C248 78 254 76 262 70';

export default function Preloader({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]"
      exit={{ y: '-100%', transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
    >
      <motion.svg
        viewBox="0 0 280 120"
        className="w-[min(60vw,340px)]"
        exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.4 } }}
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
          transition={{ duration: 2.4, ease: [0.65, 0, 0.35, 1] }}
        />
      </motion.svg>
      <motion.span
        className="font-mono-tech absolute bottom-10 text-[10px] tracking-[0.4em] text-zinc-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        LOADING / NIKHIL.ARJUN
      </motion.span>
    </motion.div>
  );
}
