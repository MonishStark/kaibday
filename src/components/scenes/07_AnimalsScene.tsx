import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Cat, Dog, Sparkles } from 'lucide-react';
import { soundFx } from '../../utils/sound';
import { ScrollReveal } from '../ScrollReveal';

interface AnimalsSceneProps {
  onNext?: () => void;
}

export const AnimalsScene: React.FC<AnimalsSceneProps> = () => {
  const [petMessage, setPetMessage] = useState<string | null>(null);

  const handleCatClick = () => {
    soundFx.playMeow();
    setPetMessage('🐱 Meow! Kai is my favorite hooman!');
  };

  const handleDogClick = () => {
    soundFx.playWoof();
    setPetMessage('🐶 Woof! The best pawson in the world!');
  };

  return (
    <section className="relative min-h-screen py-24 px-4 bg-[#FFFBEB] paper-texture flex flex-col items-center justify-center overflow-hidden">
      
      {/* Floating Paw Prints */}
      <div className="absolute inset-0 pointer-events-none opacity-15">
        <div className="absolute top-20 left-10 text-3xl">🐾</div>
        <div className="absolute top-40 right-16 text-2xl rotate-12">🐾</div>
        <div className="absolute bottom-32 left-1/4 text-4xl -rotate-12">🐾</div>
        <div className="absolute bottom-20 right-10 text-3xl">🐾</div>
      </div>

      <div className="max-w-3xl mx-auto w-full text-center space-y-10 relative z-10">
        
        {/* Title */}
        <ScrollReveal direction="down">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1 text-xs font-mono tracking-widest uppercase bg-amber-200/60 border border-amber-300 px-3 py-1 rounded-full text-amber-900 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Animal Lover
            </span>

            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-amber-950">
              Certified animal lover. 🐱🐶
            </h2>

            <p className="text-sm sm:text-base text-amber-800 italic font-serif max-w-lg mx-auto">
              "Four cats. Two dogs. Basically her children."
            </p>
          </div>
        </ScrollReveal>

        {/* Photo & Rating Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-2xl mx-auto">
          
          {/* Kai with Cat Photo */}
          <ScrollReveal direction="left" delay={0.2}>
            <motion.div
              whileHover={{ rotate: 0, scale: 1.04 }}
              className="polaroid bg-white shadow-xl rotate-[-2deg]"
            >
              <div className="aspect-[3/4] overflow-hidden rounded">
                <img
                  src="/img/kai-cat.png"
                  alt="Kai cuddling ginger cat"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <p className="font-handwritten text-2xl text-center mt-3 text-amber-950 font-bold">
                Cat Approved 🐱(Still scared of Gingers look)
              </p>
            </motion.div>
          </ScrollReveal>

          {/* Ratings & Pet Buttons */}
          <ScrollReveal direction="right" delay={0.3}>
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-amber-200 text-left space-y-6">
              <h3 className="font-serif font-bold text-lg text-amber-950 border-b border-amber-100 pb-3">
                Official Animal Ratings
              </h3>

              {/* Cat Rating */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="flex items-center gap-2 text-amber-950">
                    <Cat className="w-5 h-5 text-amber-600" /> CATS
                  </span>
                  <span className="text-xs text-amber-800 font-mono">1000/10</span>
                </div>
                <div className="flex gap-1 text-rose-400">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: [0, 1.4, 1], opacity: 1 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{
                        delay: 0.4 + i * 0.12,
                        duration: 0.4,
                        type: 'spring',
                        stiffness: 400,
                        damping: 15,
                      }}
                    >
                      <Heart className="w-5 h-5 fill-rose-400 text-rose-400" />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Dog Rating */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="flex items-center gap-2 text-amber-950">
                    <Dog className="w-5 h-5 text-amber-700" /> DOGS
                  </span>
                  <span className="text-xs text-amber-800 font-mono">1000/10</span>
                </div>
                <div className="flex gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: [0, 1.4, 1], opacity: 1 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{
                        delay: 0.9 + i * 0.12,
                        duration: 0.4,
                        type: 'spring',
                        stiffness: 400,
                        damping: 15,
                      }}
                    >
                      <Heart className="w-5 h-5 fill-amber-400 text-amber-400" />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Interactive Pet Sound Triggers */}
              <div className="pt-2 border-t border-amber-100 flex gap-3">
                <button
                  onClick={handleCatClick}
                  className="flex-1 flex items-center justify-center gap-2 bg-amber-50 hover:bg-amber-100 text-amber-800 py-2.5 rounded-xl text-xs font-bold transition-all border border-amber-200 shadow-sm hover:scale-105 cursor-pointer"
                >
                  <span>Pet Cat 🐱</span>
                </button>

                <button
                  onClick={handleDogClick}
                  className="flex-1 flex items-center justify-center gap-2 bg-amber-50 hover:bg-amber-100 text-amber-800 py-2.5 rounded-xl text-xs font-bold transition-all border border-amber-200 shadow-sm hover:scale-105 cursor-pointer"
                >
                  <span>Pet Dog 🐶</span>
                </button>
              </div>

              {/* Speech Bubble */}
              {petMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs font-sans font-medium text-amber-900 text-center shadow-sm"
                >
                  {petMessage}
                </motion.div>
              )}
            </div>
          </ScrollReveal>

        </div>

        {/* Animal Shelter Dream Callout */}
        <ScrollReveal direction="up" delay={0.4}>
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-md border border-amber-200 text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-700">
              ONE DAY... 🐾
            </span>
            <p className="text-base sm:text-lg font-serif italic text-amber-950">
              "I hope the dream of building an animal shelter comes true soooon...."
            </p>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
