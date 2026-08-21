import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface SoftKaiSceneProps {
  onNext?: () => void;
}

export const SoftKaiScene: React.FC<SoftKaiSceneProps> = () => {
  return (
    <section className="relative min-h-screen py-24 px-4 bg-kai-cream paper-texture flex flex-col items-center justify-center">
      <div className="max-w-3xl mx-auto w-full text-center space-y-10">
        
        {/* Soft Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-1.5 bg-kai-blush/40 border border-kai-pink/40 px-4 py-1.5 rounded-full text-xs font-mono text-kai-charcoal"
        >
          <Sparkles className="w-3.5 h-3.5 text-kai-pink" />
          <span>Gentle Pause</span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-5xl font-serif font-bold text-kai-charcoal leading-tight"
        >
          But that's only one side of you.
        </motion.h2>

        {/* Soft Portrait Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="polaroid bg-white max-w-xs mx-auto shadow-xl"
        >
          <div className="aspect-[4/5] overflow-hidden rounded">
            <img
              src="/img/kai-portrait.png"
              alt="Kind & Sweet Kai"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <p className="font-handwritten text-xl text-center mt-3 text-kai-charcoal">
            Kind & Sweet ✨
          </p>
        </motion.div>

        {/* Appreciation Sentences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="space-y-4 max-w-lg mx-auto text-lg sm:text-2xl font-serif italic text-kai-charcoal/90 leading-relaxed"
        >
          <p>There's also the kind Kai.</p>
          <p>The sweet Kai.</p>
          <p>The one who loves little things.</p>
          <p>The one who loves animals.</p>
          <p className="font-sans not-italic font-semibold text-kai-pink text-base sm:text-xl pt-2">
            The one who can make an ordinary conversation feel special.
          </p>
        </motion.div>

      </div>
    </section>
  );
};
