import React, { useState, useEffect, useRef } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Navbar } from './components/Navbar';
import { CinematicLyrics } from './components/CinematicLyrics';
import { CelestialIndicator } from './components/CelestialIndicator';
import { WelcomeModal } from './components/WelcomeModal';
import { soundFx } from './utils/sound';
import { IntroScene } from './components/scenes/01_IntroScene';
import { CoffeeScene } from './components/scenes/02_CoffeeScene';
import { MorningScene } from './components/scenes/03_MorningScene';
import { MarathonScene } from './components/scenes/04_MarathonScene';
import { GymScene } from './components/scenes/05_GymScene';
import { AnimalsScene } from './components/scenes/07_AnimalsScene';
import { SoftKaiScene } from './components/scenes/06_SoftKaiScene';
import { ScrapbookScene } from './components/scenes/08_ScrapbookScene';
import { PaintingsScene } from './components/scenes/09_PaintingsScene';
import { BirthdayCafeScene } from './components/scenes/10_BirthdayCafeScene';
import { FriendshipScene } from './components/scenes/11_FriendshipScene';
import { LetterScene } from './components/scenes/12_LetterScene';
import { WishScene } from './components/scenes/13_WishScene';
import { FinalNightScene } from './components/scenes/14_FinalNightScene';
import { AnimatePresence } from 'framer-motion';

export function App() {
  const [showModal, setShowModal] = useState(true);
  const [currentChapter, setCurrentChapter] = useState(1);
  const totalChapters = 14;
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize soundFx audio binding
  useEffect(() => {
    soundFx.initAudioElement();
  }, []);

  const handleOpenCard = () => {
    setShowModal(false);
    soundFx.restartBirthdaySong();
  };

  const scrollToChapter = (chapterNum: number) => {
    setCurrentChapter(chapterNum);
    const element = document.getElementById(`chapter-${chapterNum}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (currentChapter < totalChapters) {
      scrollToChapter(currentChapter + 1);
    }
  };

  const handleReplay = () => {
    soundFx.stopBirthdaySong();
    soundFx.restartBirthdaySong();
    scrollToChapter(1);
  };

  // Track active scene on manual scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      for (let i = 1; i <= totalChapters; i++) {
        const el = document.getElementById(`chapter-${i}`);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setCurrentChapter(i);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-kai-cream text-kai-charcoal font-sans selection:bg-kai-blush selection:text-kai-charcoal">
      {/* Vercel Analytics */}
      <Analytics />

      {/* Top Right Scroll-Driven Celestial Sun-to-Moon Indicator */}
      <CelestialIndicator />

      {/* Welcome Envelope Modal */}
      <AnimatePresence>
        {showModal && <WelcomeModal onOpen={handleOpenCard} />}
      </AnimatePresence>

      {/* Native HTML Audio Element for React DOM Playback */}
      <audio
        ref={audioRef}
        id="kai-birthday-song-audio"
        src="/song/Happy Birthday, Kai.mp3"
        preload="auto"
        className="hidden"
      />

      {/* Synchronized Cinematic Lyrics Overlay */}
      <CinematicLyrics currentChapter={currentChapter} />

      {/* Floating Header Progress */}
      <Navbar currentChapter={currentChapter} totalChapters={totalChapters} />

      {/* 14 Chapters */}
      <main>
        <div id="chapter-1">
          <IntroScene onNext={handleNext} isActive={!showModal} />
        </div>

        <div id="chapter-2">
          <CoffeeScene onNext={handleNext} />
        </div>

        <div id="chapter-3">
          <MorningScene onNext={handleNext} />
        </div>

        <div id="chapter-4">
          <MarathonScene onNext={handleNext} />
        </div>

        <div id="chapter-5">
          <GymScene onNext={handleNext} />
        </div>

        <div id="chapter-6">
          <AnimalsScene onNext={handleNext} />
        </div>

        <div id="chapter-7">
          <SoftKaiScene onNext={handleNext} />
        </div>

        <div id="chapter-8">
          <ScrapbookScene onNext={handleNext} />
        </div>

        <div id="chapter-9">
          <PaintingsScene onNext={handleNext} />
        </div>

        <div id="chapter-10">
          <BirthdayCafeScene onNext={handleNext} />
        </div>

        <div id="chapter-11">
          <FriendshipScene onNext={handleNext} />
        </div>

        <div id="chapter-12">
          <LetterScene onNext={handleNext} />
        </div>

        <div id="chapter-13">
          <WishScene onNext={handleNext} />
        </div>

        <div id="chapter-14">
          <FinalNightScene onReplay={handleReplay} />
        </div>
      </main>

      {/* Footer Signature */}
      <footer className="py-6 bg-kai-navy border-t border-white/10 text-center text-xs font-mono text-amber-200/50">
        Created for Kai with love & thoughtfulness • 20 August
      </footer>
    </div>
  );
}

export default App;
