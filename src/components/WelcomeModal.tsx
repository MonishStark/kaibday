import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Sparkles, Heart, Clock, Calendar, Rewind } from 'lucide-react';
import { soundFx } from '../utils/sound';

interface WelcomeModalProps {
  onOpen: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ onOpen }) => {
  const [timeTravelState, setTimeTravelState] = useState<'rewinding' | 'complete'>('rewinding');
  const [displayDate, setDisplayDate] = useState(22);
  const [displayHour24, setDisplayHour24] = useState(15); // 15 = 03:00 PM
  const [displayMinute, setDisplayMinute] = useState(0);

  useEffect(() => {
    // Start at: 22 August, 15:00 (03:00 PM)
    // Target at: 20 August, 05:00 (05:00 AM)
    let currentDay = 22;
    let currentHour24 = 15;
    let currentMin = 0;

    const targetDay = 20;
    const targetHour24 = 5;
    const targetMin = 0;

    // Fast sequential minute-by-minute step interval (1.2ms per minute)
    // This ensures EVERY SINGLE MINUTE (3:00 -> 2:59 -> 2:58 -> 2:57...) is hit sequentially without skipping!
    const interval = setInterval(() => {
      // Check if target reached
      if (currentDay === targetDay && currentHour24 === targetHour24 && currentMin === targetMin) {
        clearInterval(interval);
        setTimeout(() => {
          setTimeTravelState('complete');
        }, 600);
        return;
      }

      // Decrement by exactly 1 minute
      currentMin--;
      if (currentMin < 0) {
        currentMin = 59;
        currentHour24--;
        if (currentHour24 < 0) {
          currentHour24 = 23;
          currentDay--;
        }
      }

      setDisplayDate(currentDay);
      setDisplayHour24(currentHour24);
      setDisplayMinute(currentMin);
    }, 1.2);

    return () => clearInterval(interval);
  }, []);

  const handleOpenCard = () => {
    soundFx.playClick();
    soundFx.restartBirthdaySong();
    onOpen();
  };

  // Format Display Values
  const ampm = displayHour24 >= 12 ? 'PM' : 'AM';
  const hour12 = displayHour24 % 12 === 0 ? 12 : displayHour24 % 12;
  const formattedHour = hour12.toString().padStart(2, '0');
  const formattedMin = displayMinute.toString().padStart(2, '0');
  const displayTimeString = `${formattedHour}:${formattedMin} ${ampm}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] bg-slate-950/92 backdrop-blur-md p-4 flex items-center justify-center select-none"
    >
      {/* Background Subtle Sparkle Ornaments */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-12 left-10 w-2 h-2 bg-amber-300 rounded-full animate-twinkle" />
        <div className="absolute top-24 right-20 w-1.5 h-1.5 bg-rose-300 rounded-full animate-twinkle" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-amber-200 rounded-full animate-twinkle" style={{ animationDelay: '2s' }} />
      </div>

      <AnimatePresence mode="wait">
        {timeTravelState === 'rewinding' ? (
          /* STEP 1: SEQUENTIAL MINUTE-BY-MINUTE TIME REWIND (3:00 -> 2:59 -> 2:58...) */
          <motion.div
            key="time-travel"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 0.4 }}
            className="bg-slate-900/90 rounded-3xl p-8 sm:p-10 max-w-sm w-full text-center shadow-2xl relative border border-amber-400/40 space-y-6 text-amber-100"
          >
            <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 text-amber-300 px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-widest uppercase animate-pulse">
              <Rewind className="w-3.5 h-3.5 animate-spin" /> REWINDING TIME...
            </div>

            {/* Glowing Retro Digital Clock Display */}
            <div className="py-6 px-4 bg-black/70 rounded-2xl border border-amber-300/40 shadow-inner space-y-3">
              <div className="flex items-center justify-center gap-2 text-rose-400 font-mono text-sm font-bold tracking-widest uppercase">
                <Calendar className="w-4 h-4 text-rose-400" />
                <span className="text-xl font-extrabold text-rose-300 font-mono tracking-wider">
                  {displayDate} AUGUST
                </span>
              </div>

              <div className="flex items-center justify-center gap-2 text-amber-300 font-mono text-4xl sm:text-5xl font-extrabold tracking-wider">
                <Clock className="w-7 h-7 text-amber-400 animate-spin" style={{ animationDuration: '1s' }} />
                <span className="drop-shadow-[0_0_15px_rgba(251,191,36,0.7)] font-mono">
                  {displayTimeString}
                </span>
              </div>
            </div>

            <p className="text-xs font-serif italic text-amber-200/70">
              Rewinding to 20 August • 05:00 AM... ⏳✨
            </p>
          </motion.div>
        ) : (
          /* STEP 2: OPENING ENVELOPE BIRTHDAY CARD (REVEALED AFTER TIME TRAVEL) */
          <motion.div
            key="birthday-card"
            initial={{ scale: 0.85, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="bg-white rounded-3xl p-8 sm:p-12 max-w-md w-full text-center shadow-2xl relative border border-amber-200/80 space-y-6"
          >
            {/* Washi Tape */}
            <div className="washi-tape -top-3 left-1/2 -translate-x-1/2 -rotate-2 bg-pink-200/90" />

            {/* Envelope & Wax Seal Graphic */}
            <div className="relative inline-block">
              <div className="w-20 h-20 bg-gradient-to-tr from-rose-400 via-pink-400 to-amber-300 rounded-full flex items-center justify-center shadow-xl mx-auto border-4 border-white">
                <Mail className="w-10 h-10 text-white animate-bounce" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-amber-400 text-slate-950 p-1.5 rounded-full shadow-md">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>

            {/* Header Text */}
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-rose-500 bg-rose-50 px-3.5 py-1 rounded-full border border-rose-200 inline-block">
                20 AUGUST • SPECIAL DELIVERY
              </span>

              <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-slate-900 leading-tight">
                You've received a birthday card.
              </h2>

              <p className="text-sm font-serif italic text-slate-500">
                For Kai • From Monish <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400 inline" />
              </p>
            </div>

            {/* Action Button to Open Card & Play Song */}
            <div className="pt-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleOpenCard}
                className="w-full py-4 bg-gradient-to-r from-rose-500 via-amber-500 to-rose-500 text-white font-extrabold rounded-2xl text-base tracking-wide shadow-xl hover:shadow-2xl transition-all cursor-pointer flex items-center justify-center gap-2 border border-rose-300"
              >
                <span>Open Birthday Card 💌</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
