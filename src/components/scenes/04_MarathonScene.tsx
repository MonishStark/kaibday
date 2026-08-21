import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Award, MapPin, Calendar, CloudRain } from 'lucide-react';
import { soundFx } from '../../utils/sound';
import { ScrollReveal } from '../ScrollReveal';

interface MarathonSceneProps {
  onNext?: () => void;
}

export const MarathonScene: React.FC<MarathonSceneProps> = () => {
  const [runnerMode, setRunnerMode] = useState(false);

  const toggleRunnerMode = () => {
    soundFx.playClick();
    setRunnerMode(!runnerMode);
  };

  return (
    <section className="relative min-h-screen py-24 px-4 bg-gradient-to-b from-kai-forest via-[#3D5241] to-kai-navy text-white overflow-hidden">
      
      {/* Background Track Lines Accent */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="h-full w-full border-r-4 border-l-4 border-dashed border-white max-w-4xl mx-auto" />
      </div>

      <div className="max-w-4xl mx-auto w-full relative z-10 space-y-10 text-center">
        
        {/* Header Title */}
        <ScrollReveal direction="down">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono tracking-widest uppercase bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-emerald-200 shadow-lg">
              <Trophy className="w-3.5 h-3.5" /> 16 KM Marathon Finisher
            </span>

            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-emerald-50 leading-tight">
              Then there's the Kai who refuses to sit still.
            </h2>

            {/* Interactive Runner Mode ON/OFF Switch */}
            <div className="flex items-center justify-center gap-4 pt-2">
              <span className="text-lg sm:text-2xl font-mono text-emerald-200 font-semibold tracking-wider">
                Runner mode: {runnerMode ? 'ON. 🏃‍♀️💨' : 'OFF. 😴'}
              </span>

              {/* Custom Toggle Switch */}
              <button
                onClick={toggleRunnerMode}
                className={`relative w-16 h-9 rounded-full p-1 transition-colors duration-300 focus:outline-none shadow-lg border border-white/20 ${
                  runnerMode ? 'bg-emerald-400' : 'bg-slate-700'
                }`}
                title="Toggle Runner Mode"
              >
                <motion.div
                  layout
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className={`w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center text-xs font-bold font-mono ${
                    runnerMode ? 'text-emerald-800' : 'text-slate-700'
                  }`}
                  style={{ float: runnerMode ? 'right' : 'left' }}
                >
                  {runnerMode ? 'ON' : 'OFF'}
                </motion.div>
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Content visible when Runner Mode is ON */}
        <AnimatePresence>
          {runnerMode ? (
            <motion.div
              initial={{ opacity: 0, height: 0, y: 20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="space-y-10"
            >
              {/* Marathon Event Banner & Detailed Stats Grid */}
              <ScrollReveal direction="zoom" delay={0.1}>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8 shadow-2xl max-w-3xl mx-auto text-center space-y-6">
                  <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-emerald-300">
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> New Clark City Athletics Stadium</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> August 16, 2026</span>
            
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-serif text-white">
                    NEW CLARK CITY MARATHON
                  </h3>

                  {/* Real Stats Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-left">
                    <div className="bg-black/30 p-3 rounded-xl border border-white/10">
                      <span className="text-[10px] font-mono text-emerald-300 uppercase block">Distance</span>
                      <span className="text-xl font-bold font-mono text-white">16 KM</span>
                    </div>
                    <div className="bg-black/30 p-3 rounded-xl border border-white/10">
                      <span className="text-[10px] font-mono text-emerald-300 uppercase block">Pace</span>
                      <span className="text-xl font-bold font-mono text-white">~7:00 /km</span>
                    </div>
                    <div className="bg-black/30 p-3 rounded-xl border border-white/10">
                      <span className="text-[10px] font-mono text-emerald-300 uppercase block">Finish Time</span>
                      <span className="text-xl font-bold font-mono text-white">&lt; 2 Hours</span>
                    </div>
                    <div className="bg-black/30 p-3 rounded-xl border border-white/10">
                      <span className="text-[10px] font-mono text-emerald-300 uppercase block">16k Category</span>
                      <span className="text-xl font-bold font-mono text-white">~600 Runners</span>
                    </div>
                  </div>

                  
                </div>
              </ScrollReveal>

              {/* Stadium & Finisher Dual Photos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-3xl mx-auto">
                <ScrollReveal direction="left" delay={0.2}>
                  <motion.div
                    whileHover={{ rotate: 1, scale: 1.03 }}
                    className="polaroid bg-white text-kai-charcoal shadow-2xl"
                  >
                    <div className="aspect-[4/5] overflow-hidden rounded">
                      <img
                        src="/img/kai-marathon-stadium.png"
                        alt="Kai at New Clark City Marathon Stadium"
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    <p className="font-handwritten text-xl text-center mt-3 text-kai-charcoal">
                      The Champ
                    </p>
                  </motion.div>
                </ScrollReveal>

                <ScrollReveal direction="right" delay={0.3}>
                  <motion.div
                    whileHover={{ rotate: -1, scale: 1.03 }}
                    className="polaroid bg-white text-kai-charcoal shadow-2xl relative"
                  >
                    <div className="absolute -top-3 -right-3 z-20 bg-amber-400 text-kai-charcoal px-3 py-1 rounded-full text-xs font-bold font-mono shadow-md flex items-center gap-1">
                      <Award className="w-4 h-4" /> FINISHER
                    </div>
                    <div className="aspect-[4/5] overflow-hidden rounded">
                      <img
                        src="/img/kai-marathon-finisher.png"
                        alt="Kai Marathon Finisher Medal & Banner"
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    <p className="font-handwritten text-xl text-center mt-3 text-kai-charcoal font-bold">
                      Finisher🏅
                    </p>
                  </motion.div>
                </ScrollReveal>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="pt-6"
            >
              <p className="text-sm sm:text-base font-serif italic text-emerald-200/80">
                (Tap the switch above to activate 16 KM Marathon Runner Mode! 🏃‍♀️)
              </p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
