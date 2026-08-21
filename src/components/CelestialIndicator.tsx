import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Sunset } from 'lucide-react';

export const CelestialIndicator: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(1, Math.max(0, window.scrollY / totalHeight));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine Celestial State based on scroll depth
  let isMoon = scrollProgress > 0.55;
  let isSunset = scrollProgress > 0.38 && scrollProgress <= 0.55;

  let timeText = '05:00 AM';
  let modeBadge = 'Sunrise ☀️';

  if (scrollProgress < 0.15) {
    timeText = '05:00 AM';
    modeBadge = 'Dawn 🌅';
  } else if (scrollProgress < 0.38) {
    timeText = '10:00 AM';
    modeBadge = 'Morning ☀️';
  } else if (scrollProgress < 0.55) {
    timeText = '05:30 PM';
    modeBadge = 'Sunset 🌇';
  } else if (scrollProgress < 0.80) {
    timeText = '09:00 PM';
    modeBadge = 'Evening 🌙';
  } else {
    timeText = '12:00 AM';
    modeBadge = 'Night Sky ✨';
  }

  return (
    <div className="fixed top-3.5 right-4 z-50 flex items-center gap-2 select-none pointer-events-none sm:pointer-events-auto">
      <motion.div
        layout
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border backdrop-blur-md shadow-lg transition-colors duration-700 ${
          isMoon
            ? 'bg-slate-950/80 border-indigo-500/40 text-indigo-200'
            : isSunset
            ? 'bg-rose-950/80 border-rose-400/40 text-rose-200'
            : 'bg-amber-950/70 border-amber-300/40 text-amber-200'
        }`}
      >
        {/* Animated Morphing Sun / Sunset / Moon Icon */}
        <AnimatePresence mode="wait">
          {isMoon ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <Moon className="w-4 h-4 text-indigo-300 fill-indigo-300/30" />
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-1 -right-1.5 text-[9px]"
              >
                ✨
              </motion.span>
            </motion.div>
          ) : isSunset ? (
            <motion.div
              key="sunset"
              initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Sunset className="w-4 h-4 text-rose-300" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <Sun className="w-4 h-4 text-amber-300 fill-amber-300/40" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Time & State Indicator */}
        <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold tracking-wider">
          <span>{timeText}</span>
          <span className="hidden sm:inline opacity-60">•</span>
          <span className="hidden sm:inline font-sans text-[10px] uppercase opacity-80">{modeBadge}</span>
        </div>
      </motion.div>
    </div>
  );
};
