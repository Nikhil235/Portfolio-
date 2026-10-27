'use client';

import { useCallback, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useLenis } from './hooks/useLenis';
import CustomCursor from './components/CustomCursor';
import Preloader, { shouldSkipPreloader } from './components/Preloader';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PhilosophySection from './components/PhilosophySection';
import StatsSection from './components/StatsSection';
import BentoGrid from './components/BentoGrid';
import ExperienceSection from './components/ExperienceSection';
import GallerySection, { Footer } from './components/GallerySection';
import MotionLabModal from './components/MotionLabModal';
import GameHud from './components/GameHud';

export default function App() {
  // Lazy initializer: decided before first paint, so refreshes / reduced-motion
  // users never see even a frame of the black intro screen.
  const [loading, setLoading] = useState(() => !shouldSkipPreloader());
  const [motionLabOpen, setMotionLabOpen] = useState(false);
  const [gameModeActive, setGameModeActive] = useState(false);

  const { scrollTo } = useLenis(!loading);
  const done = useCallback(() => setLoading(false), []);

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <CustomCursor />
      <AnimatePresence>{loading && <Preloader onDone={done} />}</AnimatePresence>
      {!loading && (
        <>
          <Navbar
            onNav={scrollTo}
            onOpenMotionLab={() => setMotionLabOpen(true)}
            onToggleGameMode={() => setGameModeActive((prev) => !prev)}
            isGameModeActive={gameModeActive}
          />
          <main>
            <HeroSection
              onNav={scrollTo}
              onOpenMotionLab={() => setMotionLabOpen(true)}
              onToggleGameMode={() => setGameModeActive((prev) => !prev)}
            />
            <PhilosophySection />
            <StatsSection />
            <BentoGrid />
            <ExperienceSection />
            <GallerySection />
          </main>
          <Footer />

          {/* FAANG Motion Engineering & Game Feel Labs */}
          <MotionLabModal
            isOpen={motionLabOpen}
            onClose={() => setMotionLabOpen(false)}
          />
          <GameHud
            isActive={gameModeActive}
            onClose={() => setGameModeActive(false)}
          />
        </>
      )}
    </div>
  );
}

