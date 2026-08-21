import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SONG_LYRICS, LyricSegment, LyricWord } from '../data/songLyrics';
import { soundFx } from '../utils/sound';

interface CinematicLyricsProps {
  currentChapter: number;
}

export const CinematicLyrics: React.FC<CinematicLyricsProps> = ({ currentChapter }) => {
  const [currentTime, setCurrentTime] = useState<number>(0);

  useEffect(() => {
    const handleTimeUpdate = (t: number) => {
      setCurrentTime(t);
    };

    soundFx.onTimeUpdate(handleTimeUpdate);
    return () => {
      soundFx.removeTimeUpdateListener(handleTimeUpdate);
    };
  }, []);

  const isSongActive = soundFx.isBirthdaySongActive() || currentTime > 0;
  if (!isSongActive || currentTime >= 185) return null;

  // Find active segment
  const currentSegment: LyricSegment | undefined = SONG_LYRICS.find(
    seg => currentTime >= seg.start && currentTime <= seg.end
  );

  // Dark chapters: 1, 4, 5, 9, 13, 14
  // Light chapters: 2, 3, 6, 7, 8, 10, 11, 12
  const darkChapters = [1, 4, 5, 9, 13, 14];
  const isDarkChapter = darkChapters.includes(currentChapter);

  // Lower opacity in Chapter 14 so final night sky message remains focus
  const opacityClass = currentChapter === 14 ? 'opacity-70' : 'opacity-100';

  return (
    <div className={`fixed bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-40 max-w-xl w-[90%] text-center pointer-events-none transition-opacity duration-700 ${opacityClass}`}>
      <AnimatePresence mode="wait">
        {currentSegment && (
          <motion.div
            key={currentSegment.start}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-wrap justify-center gap-2 text-xl sm:text-3xl font-handwritten font-bold tracking-wide leading-relaxed"
          >
            {currentSegment.words.map((w: LyricWord, idx: number) => {
              const isWordActive = currentTime >= w.start && currentTime <= w.end + 0.15;
              return (
                <span
                  key={idx}
                  className="relative inline-block transition-all duration-300"
                >
                  {/* Subtle Sparkle Particle on Active Word */}
                  {isWordActive && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.5, y: 4 }}
                      animate={{ opacity: 1, scale: 1.25, y: -8 }}
                      exit={{ opacity: 0 }}
                      className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs text-amber-500 pointer-events-none"
                    >
                      ✨
                    </motion.span>
                  )}

                  {/* Dynamic Dark / Light High Contrast Lyrics Text */}
                  <span
                    className={`transition-all duration-300 ${
                      isWordActive
                        ? isDarkChapter
                          ? 'text-amber-200 font-extrabold drop-shadow-[0_0_18px_rgba(253,224,71,1)] scale-110 inline-block'
                          : 'text-amber-700 font-extrabold drop-shadow-[0_0_12px_rgba(217,119,6,0.6)] scale-110 inline-block'
                        : isDarkChapter
                          ? 'text-amber-100/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-normal'
                          : 'text-[#1E2433] drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)] font-semibold'
                    }`}
                  >
                    {w.word}
                  </span>
                </span>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
