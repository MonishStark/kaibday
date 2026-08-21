import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar, MessageSquare, Laugh, Sparkles, ChevronRight } from 'lucide-react';
import { soundFx } from '../../utils/sound';
import { ScrollReveal } from '../ScrollReveal';

interface FriendshipSceneProps {
  onNext: () => void;
}

export const FriendshipScene: React.FC<FriendshipSceneProps> = ({ onNext }) => {
  return (
    <section className="relative min-h-screen py-24 px-4 bg-kai-cream paper-texture flex flex-col items-center justify-center">
      <div className="max-w-2xl mx-auto w-full text-center space-y-10">
        
        {/* Badge */}
        <ScrollReveal direction="down">
          <div className="inline-flex items-center gap-1.5 bg-kai-beige/80 border border-kai-beige px-4 py-1.5 rounded-full text-xs font-mono text-kai-charcoal shadow-sm">
            <Calendar className="w-3.5 h-3.5 text-kai-pink" />
            <span>Timeline Reflection</span>
          </div>
        </ScrollReveal>

        {/* Title */}
        <ScrollReveal direction="up" delay={0.1}>
          <h2 className="text-4xl sm:text-6xl font-serif font-bold text-kai-charcoal tracking-tight">
            Almost three months.
          </h2>
        </ScrollReveal>

        {/* Emotional Text */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="space-y-4 text-base sm:text-xl font-serif italic text-kai-muted leading-relaxed">
            <p>It's kind of funny when you think about it.</p>
            <p>We've only known each other for almost three months.</p>
            <p>That's not really a long time.</p>
            <p className="text-kai-charcoal font-semibold not-italic font-sans text-lg sm:text-2xl pt-2 text-kai-pink">
              And somehow, in those few months, you've become someone whose messages I genuinely look forward to.
            </p>
          </div>
        </ScrollReveal>

        {/* Visual Counter Card */}
        <ScrollReveal direction="zoom" delay={0.3}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/90 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-xl border border-kai-beige text-left max-w-md mx-auto space-y-6"
          >
            <div className="text-center border-b border-kai-beige pb-4 space-y-1">
              <span className="text-4xl sm:text-6xl font-extrabold font-serif text-kai-charcoal tracking-tight">
                ≈ 3 MONTHS
              </span>
              <p className="text-xs uppercase font-mono tracking-widest text-kai-muted">
                Friendship Counter
              </p>
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm font-sans">
              <div className="flex justify-between items-center text-kai-charcoal">
                <span className="flex items-center gap-2 text-kai-muted">
                  <MessageSquare className="w-4 h-4 text-kai-pink" /> Conversations
                </span>
                <span className="font-semibold font-mono">too many to count</span>
              </div>

              <div className="flex justify-between items-center text-kai-charcoal">
                <span className="flex items-center gap-2 text-kai-muted">
                  <Sparkles className="w-4 h-4 text-amber-500" /> Random topics
                </span>
                <span className="font-semibold font-mono">unlimited</span>
              </div>

              <div className="flex justify-between items-center text-kai-charcoal">
                <span className="flex items-center gap-2 text-kai-muted">
                  <Laugh className="w-4 h-4 text-emerald-500" /> Laughs
                </span>
                <span className="font-semibold font-mono">hopefully many</span>
              </div>

              <div className="flex justify-between items-center text-kai-charcoal">
                <span className="flex items-center gap-2 text-kai-muted">
                  😭 Questionable jokes
                </span>
                <span className="font-semibold font-mono text-kai-pink">definitely too many</span>
              </div>

              <div className="pt-2 border-t border-kai-beige/60 flex justify-between items-center">
                <span className="font-semibold text-kai-charcoal">Friendship status</span>
                <span className="text-kai-forest font-mono text-xs flex items-center gap-1 font-bold">
                  <Heart className="w-3.5 h-3.5 fill-kai-pink text-kai-pink animate-pulse" /> Still loading...
                </span>
              </div>
            </div>
          </motion.div>
        </ScrollReveal>

        {/* Conclusion */}
        <ScrollReveal direction="up" delay={0.4}>
          <div className="space-y-2 pt-4">
            <h3 className="text-2xl sm:text-3xl font-serif text-kai-charcoal">
              Hopefully...
            </h3>
            <p className="text-3xl sm:text-5xl font-serif font-bold text-kai-pink">
              ...this is only the beginning. ❤️
            </p>
          </div>
        </ScrollReveal>

        {/* Continue Button */}
        <ScrollReveal direction="up" delay={0.5}>
          <button
            onClick={() => {
              soundFx.playClick();
              onNext();
            }}
            className="inline-flex items-center gap-2 bg-kai-beige hover:bg-kai-blush text-kai-charcoal px-7 py-3 rounded-full font-medium text-sm transition-all shadow-sm hover:shadow-md hover:scale-105"
          >
            <span>Next: Kai Café ☕🍦🎂</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </ScrollReveal>

      </div>
    </section>
  );
};
