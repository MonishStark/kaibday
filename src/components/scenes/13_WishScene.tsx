import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Flame, Sparkles } from 'lucide-react';
import { soundFx } from '../../utils/sound';
import { ScrollReveal } from '../ScrollReveal';

interface WishSceneProps {
  onNext?: () => void;
}

export const WishScene: React.FC<WishSceneProps> = () => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [blown, setBlown] = useState(false);

  const handleBlowOut = () => {
    if (!candlesLit) return;

    soundFx.playBlowCandles();
    setCandlesLit(false);

    setTimeout(() => {
      setBlown(true);

      // Trigger Birthday Song!
      soundFx.playBirthdaySong();

      // Multi-stage confetti explosion
      const count = 250;
      const defaults = { origin: { y: 0.65 } };

      function fire(particleRatio: number, opts: confetti.Options) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio)
        });
      }

      fire(0.25, { spread: 30, startVelocity: 60 });
      fire(0.2, { spread: 70 });
      fire(0.35, { spread: 110, decay: 0.91, scalar: 0.8 });
      fire(0.1, { spread: 130, startVelocity: 25, decay: 0.92, scalar: 1.2 });
      fire(0.1, { spread: 130, startVelocity: 50 });
    }, 400);
  };

  return (
    <section className="relative min-h-screen py-20 px-4 bg-kai-navy text-white flex flex-col items-center justify-center overflow-hidden">
      
      {/* Dynamic Glow Ambient behind cake */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${candlesLit ? 'bg-gradient-to-b from-[#1E1B4B] via-[#311B92]/40 to-[#0F172A]' : 'bg-[#0F172A]'}`} />

      {/* Twinkling Starfield */}
      {blown && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-2 h-2 bg-amber-300 rounded-full animate-twinkle" />
          <div className="absolute top-20 right-20 w-2 h-2 bg-amber-200 rounded-full animate-twinkle" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-40 left-1/3 w-2 h-2 bg-white rounded-full animate-twinkle" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/3 left-10 w-1.5 h-1.5 bg-rose-200 rounded-full animate-twinkle" style={{ animationDelay: '0.5s' }} />
        </div>
      )}

      <div className="max-w-2xl mx-auto w-full text-center space-y-8 relative z-10">
        
        {/* Header */}
        <ScrollReveal direction="down">
          <div className="space-y-3">
            <p className="text-xl sm:text-2xl font-serif text-amber-200 italic">
              Okay, birthday girl.
            </p>

            <h2 className="text-4xl sm:text-6xl font-serif font-extrabold text-amber-100 tracking-tight">
              Make a wish. ✨
            </h2>
          </div>
        </ScrollReveal>

        {/* Multi-Tier Luxury Birthday Cake */}
        <ScrollReveal direction="zoom" delay={0.2}>
          <div className="relative my-6 inline-block">
            
            {/* Candle Smoke */}
            {!candlesLit && (
              <div className="absolute -top-16 left-0 right-0 flex justify-center gap-8 pointer-events-none z-30">
                {[0, 1, 2, 3, 4].map((i) => (
                  <span
                    key={i}
                    className="w-1.5 h-12 bg-gray-300/40 rounded-full blur-xs animate-steam"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            )}

            {/* Candle Flames */}
            <div className="relative z-20 flex justify-center gap-7 sm:gap-9 -mb-3">
              {[0, 1, 2, 3, 4].map((idx) => (
                <div key={idx} className="flex flex-col items-center">
                  {candlesLit && (
                    <motion.div
                      animate={{
                        scale: [1, 1.15, 1],
                        rotate: [-2, 2, -2],
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        delay: idx * 0.2,
                      }}
                      className="w-5 h-7 bg-gradient-to-t from-amber-500 via-amber-300 to-white rounded-full shadow-[0_0_15px_#F59E0B] mb-0.5"
                    />
                  )}
                  <div className="w-2.5 h-10 bg-gradient-to-b from-amber-100 via-rose-300 to-rose-400 rounded-t-sm shadow-md border-x border-amber-200/40" />
                </div>
              ))}
            </div>

            {/* Cake Tiers Container */}
            <div className="relative flex flex-col items-center">
              
              {/* TOP TIER */}
              <div className="w-48 sm:w-56 h-16 sm:h-20 bg-gradient-to-r from-[#FCE7F3] via-[#FBCFE8] to-[#FCE7F3] rounded-t-2xl border-t-2 border-amber-200/60 shadow-md relative overflow-hidden flex items-center justify-center">
                <div className="absolute top-0 inset-x-0 h-4 bg-white/90 rounded-b-xl shadow-sm" />
                <span className="text-sm font-handwritten text-rose-700 font-bold tracking-wide relative z-10">
                  Happy Birthday Kai ✨
                </span>
              </div>

              {/* MIDDLE TIER */}
              <div className="w-64 sm:w-76 h-20 sm:h-24 bg-gradient-to-r from-[#F3E7D3] via-[#FFF9F0] to-[#F3E7D3] border-t-4 border-rose-300/60 shadow-lg relative flex items-center justify-around px-4">
                <div className="absolute top-1 inset-x-0 flex justify-between px-3">
                  {[...Array(9)].map((_, i) => (
                    <span key={i} className="w-2.5 h-2.5 bg-rose-300 rounded-full shadow-inner" />
                  ))}
                </div>
                <span className="text-xl">🍓</span>
                <span className="text-sm font-mono tracking-widest text-slate-800 font-bold uppercase bg-amber-100/80 px-3 py-1 rounded-full shadow-sm">
                  20 AUGUST
                </span>
                <span className="text-xl">🍓</span>
              </div>

              {/* BOTTOM TIER */}
              <div className="w-80 sm:w-96 h-24 sm:h-28 bg-gradient-to-r from-[#EFC6C2] via-[#DFA7A5] to-[#EFC6C2] rounded-b-2xl border-t-4 border-amber-300/80 shadow-2xl relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-x-0 bottom-2 text-center text-xs font-mono tracking-widest text-rose-900/80 uppercase font-bold">
                  ★ CELEBRATING KAI ★
                </div>
              </div>

              {/* CAKE STAND BASE */}
              <div className="w-96 sm:w-[420px] h-6 bg-gradient-to-r from-amber-300 via-amber-100 to-amber-300 rounded-full shadow-2xl border-t border-white/50 -mt-1" />
            </div>

          </div>
        </ScrollReveal>

        {/* Blow Out Button or Celebration Reveal */}
        {candlesLit ? (
          <ScrollReveal direction="up" delay={0.4}>
            <div className="pt-4">
              <button
                onClick={handleBlowOut}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 hover:from-amber-200 hover:to-amber-300 text-slate-950 font-extrabold px-9 py-4 rounded-full text-base sm:text-lg transition-all shadow-2xl hover:scale-108 border border-amber-100/50 cursor-pointer"
              >
                <Flame className="w-5 h-5 text-amber-900 fill-amber-900 animate-pulse" />
                <span>🕯️ Blow out the candles</span>
              </button>
            </div>
          </ScrollReveal>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-4 pt-4"
          >
            <div className="inline-flex items-center gap-1.5 bg-amber-400/20 border border-amber-400/40 px-4 py-1.5 rounded-full text-xs font-mono text-amber-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" /> WISH MADE!
            </div>

            <h1 className="text-4xl sm:text-7xl font-extrabold font-serif text-amber-100 drop-shadow-2xl">
              HAPPY BIRTHDAY, KAI!!! 🎂🎉
            </h1>

            <p className="text-base sm:text-2xl text-amber-200 font-serif italic">
              "May all your wishes come true this year!"
            </p>
          </motion.div>
        )}

      </div>
    </section>
  );
};
