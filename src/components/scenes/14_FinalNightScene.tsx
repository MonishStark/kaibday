import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Coffee, Moon, Star, Sparkles } from 'lucide-react';
import { soundFx } from '../../utils/sound';
import { ScrollReveal } from '../ScrollReveal';

interface FinalNightSceneProps {
  onReplay: () => void;
}

export const FinalNightScene: React.FC<FinalNightSceneProps> = ({ onReplay }) => {
  const [activeStar, setActiveStar] = useState<number | null>(null);

  const starThoughts = [
    "For all those 5 AM mornings. ☕",
    "For every kilometer you keep going. 🏃",
    "For every animal you've taken care of. 🐾",
    "For all the letters we've somehow managed to write. 💌",
    "For all the little things that make you, you. ✨",
  ];

  const handleStarClick = (idx: number) => {
    soundFx.playClick();
    setActiveStar(activeStar === idx ? null : idx);
  };

  return (
    <section className="relative min-h-screen py-24 px-4 bg-[#090D16] text-white flex flex-col items-center justify-center overflow-hidden">
      
      {/* Subtle Moon in Night Sky */}
      <div className="absolute top-12 right-12 text-5xl opacity-40 pointer-events-none animate-pulse">
        🌙
      </div>

      {/* 5 Clickable Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {starThoughts.map((t, idx) => {
          const positions = [
            { top: '18%', left: '20%' },
            { top: '28%', right: '22%' },
            { top: '45%', left: '15%' },
            { top: '65%', right: '18%' },
            { top: '75%', left: '25%' },
          ];
          return (
            <button
              key={idx}
              onClick={() => handleStarClick(idx)}
              style={positions[idx]}
              className="absolute pointer-events-auto p-2 hover:scale-125 transition-transform group"
              title="Click star for a birthday thought"
            >
              <Star className="w-5 h-5 text-amber-200 fill-amber-200 animate-twinkle" style={{ animationDelay: `${idx * 0.4}s` }} />
            </button>
          );
        })}
      </div>

      <div className="max-w-2xl mx-auto w-full text-center space-y-10 relative z-10">
        
        {/* Star Thought Popup Note */}
        <AnimatePresence>
          {activeStar !== null && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              className="bg-amber-100/90 text-slate-900 px-5 py-2.5 rounded-full font-handwritten text-xl font-bold border border-amber-300 shadow-2xl inline-block max-w-sm"
            >
              {starThoughts[activeStar]}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Highlight Polaroid Frame */}
        <ScrollReveal direction="rotate" delay={0.1}>
          <motion.div
            whileHover={{ scale: 1.04, rotate: 0 }}
            className="polaroid bg-white text-kai-charcoal max-w-xs mx-auto shadow-2xl"
          >
            <div className="aspect-[4/5] overflow-hidden rounded">
              <img
                src="/img/kai-portrait.png"
                alt="Happy Birthday Kai"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <p className="font-handwritten text-2xl text-center mt-3 text-kai-charcoal font-bold">
              Kai ✨ 20 August
            </p>
          </motion.div>
        </ScrollReveal>

        {/* Closing Text */}
        <ScrollReveal direction="up" delay={0.3}>
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-amber-100">
              Here's to another year of you.
            </h2>

            <p className="text-lg sm:text-2xl font-serif italic text-amber-200/80">
              "I hope it's a really, really good one."
            </p>

            <div className="pt-4 space-y-2">
              <p className="text-3xl sm:text-4xl font-serif font-bold text-amber-100">
                Happy Birthday, Kai. ❤️
              </p>
              <p className="font-handwritten text-3xl text-kai-pink font-bold">
                — Monish
              </p>
            </div>

            <p className="text-sm font-sans text-amber-200/70 pt-2 flex items-center justify-center gap-1.5 font-medium">
              <Coffee className="w-4 h-4 text-amber-300" />
              Now go get your birthday coffee. ☕
            </p>
          </div>
        </ScrollReveal>

        {/* Replay Journey Button */}
        <ScrollReveal direction="up" delay={0.5}>
          <div className="pt-6">
            <button
              onClick={() => {
                soundFx.playClick();
                onReplay();
              }}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-full text-xs font-mono font-medium transition-all shadow-md hover:scale-105"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>↻ Start again from 05:00 AM</span>
            </button>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
