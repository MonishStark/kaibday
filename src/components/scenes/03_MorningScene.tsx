import React from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal } from '../ScrollReveal';

interface MorningSceneProps {
  onNext?: () => void;
}

export const MorningScene: React.FC<MorningSceneProps> = () => {
  return (
    <section className="relative min-h-screen py-24 px-4 flex flex-col items-center justify-center bg-kai-cream paper-texture overflow-hidden">
      <div className="max-w-4xl mx-auto w-full text-center space-y-12">
        
        {/* Physical Pinned Photo & Greeting */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center text-left">
          
          {/* Polaroid Pinned to Wall Motion Animation */}
          <ScrollReveal direction="down" delay={0.1}>
            <div className="relative justify-self-center max-w-sm w-full">
              
              {/* Pinned Pushpin / Washi Tape Graphic */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
                <div className="w-6 h-6 bg-rose-400 rounded-full border-2 border-white shadow-md flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
                <div className="w-1 h-3 bg-amber-900/60" />
              </div>

              <motion.div
                initial={{ rotate: -8, y: -20 }}
                whileInView={{ rotate: -2, y: 0 }}
                viewport={{ once: false, amount: 0.4 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                whileHover={{ rotate: 0, scale: 1.04 }}
                className="polaroid shadow-2xl bg-white border border-kai-beige relative pt-6"
              >
                <div className="washi-tape -top-3 left-1/2 -translate-x-1/2 -rotate-3 bg-pink-200/80" />
                
                <div className="aspect-[3/4] overflow-hidden rounded bg-kai-beige/30">
                  <img
                    src="/img/kai-portrait.png"
                    alt="Kai Birthday Morning"
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                <p className="font-handwritten text-2xl text-center text-kai-charcoal mt-3 font-semibold">
                  Birthday Girl ✨
                </p>
              </motion.div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.2}>
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-widest text-kai-muted font-mono bg-kai-beige/60 px-3 py-1 rounded-full">
                Chapter 3 • Birthday Morning
              </span>

              <h2 className="text-4xl sm:text-5xl font-serif font-bold text-kai-charcoal leading-tight">
                And then there's you.
              </h2>

              <div className="space-y-4 text-base sm:text-lg text-kai-muted leading-relaxed font-serif italic">
                <p>I hope your birthday starts gently.</p>
                <p>No rushing.</p>
                <p>No unnecessary stress.</p>
                <p className="text-kai-charcoal font-semibold not-italic font-sans text-lg">
                  Just a good morning, good coffee, and a reason to smile. And I wish that smile never fades from the sweet face.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
};
