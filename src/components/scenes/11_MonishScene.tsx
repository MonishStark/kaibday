import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Sparkles, Edit3, Check, ChevronRight, Heart } from 'lucide-react';
import { soundFx } from '../../utils/sound';
import { ScrollReveal } from '../ScrollReveal';

interface MonishSceneProps {
  onNext: () => void;
}

export const MonishScene: React.FC<MonishSceneProps> = ({ onNext }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [monishMessage, setMonishMessage] = useState(
    "Happy Birthday, Kai! 🎉 I'm genuinely so glad our paths crossed almost three months ago. Wishing you the happiest birthday filled with good coffee, cake, and endless reasons to smile!"
  );

  const handleOpen = () => {
    soundFx.playClick();
    setIsOpen(true);
  };

  return (
    <section className="relative min-h-screen py-24 px-4 bg-[#FFF9F0] paper-texture flex flex-col items-center justify-center">
      <div className="max-w-2xl mx-auto w-full text-center space-y-8">
        
        {/* Title */}
        <ScrollReveal direction="down">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono tracking-widest uppercase bg-kai-beige/80 px-4 py-1.5 rounded-full text-kai-charcoal shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-kai-pink" /> Special Note
            </span>

            <h3 className="text-2xl sm:text-3xl font-serif text-kai-muted italic">
              Oh... by the way.
            </h3>

            <h2 className="text-4xl sm:text-6xl font-serif font-extrabold text-kai-charcoal">
              Monish.
            </h2>
          </div>
        </ScrollReveal>

        {/* Speech Card Trigger */}
        <ScrollReveal direction="zoom" delay={0.2}>
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-kai-beige max-w-md mx-auto space-y-6">
            <div className="w-16 h-16 bg-kai-pink/20 rounded-full flex items-center justify-center mx-auto text-3xl animate-bounce">
              🙋‍♂️
            </div>

            <p className="text-base sm:text-lg font-serif italic text-kai-charcoal">
              Monish has a little message for you...
            </p>

            <button
              onClick={handleOpen}
              className="inline-flex items-center gap-2 bg-kai-pink hover:bg-kai-blush text-kai-charcoal px-7 py-3 rounded-full font-bold text-sm transition-all shadow-md hover:scale-105"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Read Monish's Note →</span>
            </button>
          </div>
        </ScrollReveal>

        {/* Revealed Message Modal */}
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
                  <Heart className="w-4 h-4 text-kai-pink fill-kai-pink" /> Note from Monish
                </span>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-xs text-kai-pink hover:text-kai-charcoal flex items-center gap-1 font-mono"
                  title="Customize Monish's message"
                >
                  {isEditing ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Edit3 className="w-3.5 h-3.5" />}
                  {isEditing ? 'Done' : 'Edit'}
                </button>
              </div>

              {isEditing ? (
                <textarea
                  value={monishMessage}
                  onChange={(e) => setMonishMessage(e.target.value)}
                  className="w-full h-28 p-3 text-sm font-sans border rounded-xl focus:ring-2 focus:ring-kai-pink outline-none text-kai-charcoal"
                  placeholder="Type custom message from Monish..."
                />
              ) : (
                <p className="font-serif text-lg italic text-kai-charcoal leading-relaxed p-3 bg-kai-cream/60 rounded-xl border border-kai-beige/60">
                  "{monishMessage}"
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
