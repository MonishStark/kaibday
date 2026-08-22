import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Sparkles, Heart, Clock, Calendar, Rewind } from 'lucide-react';
import { soundFx } from '../utils/sound';

interface WelcomeModalProps {
  onOpen: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ onOpen }) => {
  const [timeTravelState, setTimeTravelState] = useState<'rewinding' | 'complete'>('rewinding');
  const [currentDate, setCurrentDate] = useState(22);
  const [currentTimeText, setCurrentTimeText] = useState('03:00 PM');

  useEffect(() => {
    // Time travel countdown sequence:
    // 0ms: 22 August 03:00 PM
    // 600ms: 22 August 11:30 AM
    // 1200ms: 21 August 07:00 PM
    // 1800ms: 21 August 10:00 AM
    // 2400ms: 20 August 07:00 AM
    // 2800ms: 20 August 05:00 AM (Target Reached!)

    const timer1 = setTimeout(() => {
      setCurrentDate(22);
      setCurrentTimeText('11:30 AM');
    }, 600);

    const timer2 = setTimeout(() => {
      setCurrentDate(21);
      setCurrentTimeText('07:00 PM');
    }, 1200);

    const timer3 = setTimeout(() => {
      setCurrentDate(21);
      setCurrentTimeText('10:00 AM');
    }, 1800);

    const timer4 = setTimeout(() => {
      setCurrentDate(20);
      setCurrentTimeText('07:00 AM');
    }, 2400);

    const timer5 = setTimeout(() => {
      setCurrentDate(20);
      setCurrentTimeText('05:00 AM');
    }, 2800);

    const timer6 = setTimeout(() => {
      setTimeTravelState('complete');
    }, 3400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
      clearTimeout(timer6);
    };
  }, []);

  const handleOpenCard = () => {
    soundFx.playClick();
    soundFx.restartBirthdaySong();
    onOpen();
  };

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
          /* STEP 1: TIME TRAVEL REWIND ANIMATION */
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
            <div className="py-6 px-4 bg-black/60 rounded-2xl border border-amber-300/30 shadow-inner space-y-3">
              <div className="flex items-center justify-center gap-2 text-rose-400 font-mono text-sm font-bold tracking-widest uppercase">
                <Calendar className="w-4 h-4 text-rose-400" />
                <motion.span
                  key={currentDate}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-lg font-extrabold text-rose-300"
                >
                  {currentDate} AUGUST
                </motion.span>
              </div>

              <div className="flex items-center justify-center gap-2 text-amber-300 font-mono text-3xl sm:text-4xl font-extrabold tracking-wider">
                <Clock className="w-6 h-6 text-amber-400 animate-spin" style={{ animationDuration: '3s' }} />
                <motion.span
                  key={currentTimeText}
                  initial={{ scale: 1.3, opacity: 0.3 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="drop-shadow-[0_0_12px_rgba(251,191,36,0.6)]"
                >
                  {currentTimeText}
                </motion.span>
              </div>
            </div>

            <p className="text-xs font-serif italic text-amber-200/70">
              Traveling back to Kai's Birthday morning... ⏳✨
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
