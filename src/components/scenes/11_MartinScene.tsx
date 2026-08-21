import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Sparkles, Edit3, Check, ChevronRight } from 'lucide-react';
import { soundFx } from '../../utils/sound';
import { ScrollReveal } from '../ScrollReveal';

interface MartinSceneProps {
  onNext: () => void;
}

export const MartinScene: React.FC<MartinSceneProps> = ({ onNext }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [martinMessage, setMartinMessage] = useState(
    "Happy Birthday, Kai! 🎉 Wishing you the happiest birthday filled with good coffee, cake, and endless smiles!"
  );

  const handleOpen = () => {
    soundFx.playClick();
    setIsOpen(true);
  };

  return (
    <section className="relative min-h-screen py-24 px-4 bg-kai-cream paper-texture flex flex-col items-center justify-center">
      <div className="max-w-2xl mx-auto w-full text-center space-y-8">
        
        {/* Title */}
        <ScrollReveal direction="down">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1 text-xs font-mono tracking-widest uppercase bg-kai-beige/80 px-3 py-1 rounded-full text-kai-charcoal shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-kai-gold" /> Special Mention
            </span>

            <h3 className="text-2xl sm:text-3xl font-serif text-kai-muted italic">
              Oh... we forgot someone.
            </h3>

            <h2 className="text-4xl sm:text-6xl font-serif font-extrabold text-kai-charcoal">
              Martin.
            </h2>
          </div>
        </ScrollReveal>

        {/* Martin Speech Card Trigger */}
        <ScrollReveal direction="zoom" delay={0.2}>
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-kai-beige max-w-md mx-auto space-y-6">
            <div className="w-16 h-16 bg-kai-peach/30 rounded-full flex items-center justify-center mx-auto text-3xl animate-bounce">
              💬
            </div>

            <p className="text-base sm:text-lg font-serif italic text-kai-charcoal">
              Martin has something to say...
            </p>

            <button
              onClick={handleOpen}
              className="inline-flex items-center gap-2 bg-kai-peach hover:bg-kai-pink text-kai-charcoal px-7 py-3 rounded-full font-bold text-sm transition-all shadow-sm hover:scale-105"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Let Martin speak →</span>
            </button>
          </div>
        </ScrollReveal>

        {/* Revealed Message Modal / Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="bg-white rounded-2xl p-6 shadow-2xl border border-kai-pink/40 max-w-md mx-auto text-left space-y-4 relative"
            >
              <div className="flex justify-between items-center border-b border-kai-beige pb-3">
                <span className="font-serif font-bold text-kai-charcoal flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-kai-gold" /> Message from Martin
                </span>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-xs text-kai-pink hover:text-kai-charcoal flex items-center gap-1 font-mono"
                  title="Customize Martin's message"
                >
                  {isEditing ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Edit3 className="w-3.5 h-3.5" />}
                  {isEditing ? 'Done' : 'Edit'}
                </button>
              </div>

              {isEditing ? (
                <textarea
                  value={martinMessage}
                  onChange={(e) => setMartinMessage(e.target.value)}
                  className="w-full h-28 p-3 text-sm font-sans border rounded-xl focus:ring-2 focus:ring-kai-pink outline-none text-kai-charcoal"
                  placeholder="Type custom message for Martin..."
                />
              ) : (
                <p className="font-handwritten text-2xl text-kai-charcoal leading-relaxed p-3 bg-kai-cream/60 rounded-xl border border-kai-beige/60">
                  "{martinMessage}"
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Continue Button */}
        <ScrollReveal direction="up" delay={0.4}>
          <button
            onClick={() => {
              soundFx.playClick();
              onNext();
            }}
            className="inline-flex items-center gap-2 bg-kai-beige hover:bg-kai-blush text-kai-charcoal px-7 py-3 rounded-full font-medium text-sm transition-all shadow-sm hover:shadow-md hover:scale-105"
          >
            <span>Next: The Birthday Letter 💌</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </ScrollReveal>

      </div>
    </section>
  );
};
