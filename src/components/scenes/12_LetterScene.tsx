import React from 'react';
import { Mail, Heart } from 'lucide-react';
import { ScrollReveal } from '../ScrollReveal';

interface LetterSceneProps {
  onNext?: () => void;
}

export const LetterScene: React.FC<LetterSceneProps> = () => {
  return (
    <section className="relative min-h-screen py-24 px-4 bg-[#FAF6F0] paper-texture flex flex-col items-center justify-center">
      <div className="max-w-2xl mx-auto w-full text-center space-y-10">
        
        {/* Title */}
        <ScrollReveal direction="down">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1 text-xs font-mono tracking-widest uppercase bg-rose-100/70 border border-rose-200 px-3 py-1 rounded-full text-rose-800 shadow-sm">
              <Mail className="w-3.5 h-3.5" /> A Letter For You
            </span>

            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-kai-charcoal">
              Dear Kai,
            </h2>
          </div>
        </ScrollReveal>

        {/* Paper Letter Card */}
        <ScrollReveal direction="zoom" delay={0.2}>
          <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-2xl border border-kai-beige/80 text-left space-y-6 relative overflow-hidden">
            <div className="washi-tape -top-3 left-1/2 -translate-x-1/2 -rotate-1 bg-amber-200/80" />

            <div className="space-y-4 text-base sm:text-lg font-serif leading-relaxed text-kai-charcoal/90">
              <p>
                Happy Birthday! 🎈
              </p>
              <p>
                When we first started writing to each other almost three months ago, I didn't expect our letters to become such a meaningful part of my days.
              </p>
              <p>
                From your 5 AM mornings and coffee routines, to your runs, your love for animals, and your painting quarantine stories — every little detail you've shared has been a joy to read.
              </p>
              <p>
                Thank you for your warmth, your humor, your thoughtful words, and for calling me your "calm, steady one". I hope today brings you as much happiness as your letters bring to others.
              </p>
              <p className="pt-2 font-semibold">
                May this year ahead be filled with peaceful mornings, good coffee, exciting runs, and everything that makes your heart smile.
              </p>
            </div>

            <div className="pt-6 border-t border-kai-beige/60 flex justify-between items-center font-handwritten text-2xl text-kai-pink font-bold">
              <span>Warmly,</span>
              <span className="flex items-center gap-1">Monish <Heart className="w-4 h-4 fill-kai-pink text-kai-pink inline" /></span>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
