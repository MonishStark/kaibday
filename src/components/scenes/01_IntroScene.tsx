import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Clock, Sun } from 'lucide-react';
import { soundFx } from '../../utils/sound';

interface IntroSceneProps {
  onNext: () => void;
  isActive?: boolean;
}

export const IntroScene: React.FC<IntroSceneProps> = ({ onNext, isActive = true }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Only start sunrise animation timers once the card modal is opened!
    if (!isActive) {
      setStep(0);
      return;
    }

    const timer1 = setTimeout(() => setStep(1), 1000); // "Good morning, Kai."
    const timer2 = setTimeout(() => setStep(2), 2600); // "Yes... I know you wake up at 5 AM."
    const timer3 = setTimeout(() => setStep(3), 4400); // Alarm joke
    const timer4 = setTimeout(() => setStep(4), 6200); // Dawn Sunrise begins
    const timer5 = setTimeout(() => setStep(5), 7800); // "Today is your birthday. 🎂"

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [isActive]);

  const handleUserInteraction = () => {
    soundFx.unlockAudio();
    if (!soundFx.isBirthdaySongActive()) {
      soundFx.playBirthdaySong();
    }
  };

  const isDawn = step >= 4;

  return (
    <section
      onClick={handleUserInteraction}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden transition-all duration-[2500ms] ease-in-out cursor-pointer select-none"
    >
      
      {/* Dynamic Background Gradient Interpolation */}
      <div
        className="absolute inset-0 transition-opacity duration-[2500ms] ease-in-out bg-[#0B0F19]"
        style={{ opacity: isDawn ? 0 : 1 }}
      />
      <div
        className="absolute inset-0 transition-opacity duration-[2500ms] ease-in-out bg-gradient-to-b from-[#1E1B4B] via-[#85392C] to-[#F5C7A9]"
        style={{ opacity: isDawn ? 1 : 0 }}
      />

      {/* Starfield */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-[2000ms] ${isDawn ? 'opacity-25' : 'opacity-70'}`}>
        <div className="absolute top-12 left-1/4 w-1.5 h-1.5 bg-amber-100 rounded-full animate-twinkle" />
        <div className="absolute top-24 right-1/3 w-2 h-2 bg-white rounded-full animate-twinkle" style={{ animationDelay: '1s' }} />
        <div className="absolute top-44 left-1/6 w-1.5 h-1.5 bg-amber-200 rounded-full animate-twinkle" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-32 right-1/4 w-1.5 h-1.5 bg-white rounded-full animate-twinkle" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Rising Sun Glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6, y: 150 }}
        animate={{
          opacity: isDawn ? 0.85 : 0,
          scale: isDawn ? 1.25 : 0.6,
          y: isDawn ? 0 : 150,
        }}
        transition={{ duration: 2.8, ease: 'easeOut' }}
        className="absolute bottom-0 w-[550px] h-[550px] bg-gradient-to-t from-amber-300 via-rose-300 to-transparent rounded-full blur-3xl pointer-events-none"
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
        
        {/* Digital Clock */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/20 px-6 py-2 rounded-full text-amber-200 tracking-widest font-mono text-xs sm:text-sm shadow-2xl"
        >
          <Clock className="w-4 h-4 text-amber-300 animate-pulse" />
          <span className="font-bold tracking-widest">05:00 AM</span>
        </motion.div>

        {/* Step 1: Good morning, Kai */}
        {step >= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0 }}
            className="space-y-2"
          >
            <h1 className="font-handwritten text-5xl sm:text-7xl font-bold text-white drop-shadow-lg leading-tight">
              Good morning, Kai.
            </h1>
          </motion.div>
        )}

        {/* Step 2: Yes... I know you wake up at 5 AM */}
        {step >= 2 && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0 }}
            className="font-handwritten text-3xl sm:text-5xl text-amber-100 drop-shadow"
          >
            Yes... I know you wake up at 5 AM.
          </motion.p>
        )}

        {/* Step 3: Alarm joke */}
        {step >= 3 && (
          <motion.p
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="font-handwritten text-xl sm:text-2xl text-amber-200/90 drop-shadow-sm"
          >
            (Meanwhile, some of us are still negotiating with our alarms. 😭)
          </motion.p>
        )}

        {/* Step 4: Dawn Sunrise */}
        {step >= 4 && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="pt-4 space-y-3"
          >
            <div className="flex justify-center items-center gap-2 text-amber-200/90">
              <Sun className="w-5 h-5 animate-spin" style={{ animationDuration: '25s' }} />
              <span className="text-[11px] uppercase font-mono tracking-widest font-bold">Dawn Sunrise</span>
            </div>
            <p className="font-handwritten text-3xl sm:text-5xl font-bold text-white drop-shadow-lg leading-snug">
              But today isn't just another morning.
            </p>
          </motion.div>
        )}

        {/* Step 5: TODAY IS YOUR BIRTHDAY */}
        {step >= 5 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, ease: 'easeOut' }}
            className="pt-2 space-y-4"
          >
            <h2 className="font-handwritten text-5xl sm:text-8xl font-bold text-white drop-shadow-2xl leading-tight">
              Today is your birthday. 🎂
            </h2>

            <p className="font-handwritten text-4xl sm:text-6xl text-amber-100 font-bold drop-shadow-xl">
              Happy Birthday, Kai. ❤️
            </p>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              onClick={(e) => {
                e.stopPropagation();
                soundFx.playClick();
                if (!soundFx.isBirthdaySongActive()) {
                  soundFx.playBirthdaySong();
                }
                onNext();
              }}
              className="mt-6 inline-flex items-center gap-2 bg-amber-100 hover:bg-white text-slate-950 px-8 py-3.5 rounded-full font-bold text-sm transition-all shadow-2xl hover:scale-105 cursor-pointer font-sans"
            >
              <span>Begin Birthday Journey</span>
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </motion.button>
          </motion.div>
        )}

      </div>
    </section>
  );
};
