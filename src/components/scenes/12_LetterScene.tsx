import React from 'react';
import { Mail, Heart } from 'lucide-react';
import { ScrollReveal } from '../ScrollReveal';

interface LetterSceneProps {
  onNext?: () => void;
}

export const LetterScene: React.FC<LetterSceneProps> = () => {
  return (
    <section className="relative min-h-screen py-24 px-4 bg-[#F5EBE0] paper-texture flex flex-col items-center justify-center">
      <div className="max-w-2xl mx-auto w-full text-center space-y-10">
        
        {/* Title */}
        <ScrollReveal direction="down">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1 text-xs font-mono tracking-widest uppercase bg-rose-100/80 border border-rose-200 px-3.5 py-1 rounded-full text-rose-900 shadow-sm">
              <Mail className="w-3.5 h-3.5" /> A Letter For You
            </span>

            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-kai-charcoal">
              Dear Kai,
            </h2>
          </div>
        </ScrollReveal>

        {/* Vintage Parchment Paper Letter Card */}
        <ScrollReveal direction="zoom" delay={0.2}>
          <div className="bg-[#FAF2E4] bg-[radial-gradient(#e5d9c5_1px,transparent_1px)] [background-size:16px_16px] rounded-2xl p-6 sm:p-12 shadow-[0_20px_50px_rgba(78,52,46,0.18)] border-2 border-[#D7C4A5] text-left space-y-6 relative overflow-hidden shadow-[inset_0_0_40px_rgba(180,140,90,0.25)]">
            
            {/* Washi Tape Accent */}
            <div className="washi-tape -top-3 left-1/2 -translate-x-1/2 -rotate-1 bg-pink-200/90" />

            {/* Handwritten Script Letter Content */}
            <div className="space-y-5 font-handwritten text-xl sm:text-2xl font-bold leading-relaxed text-[#3E2723]">
              <p className="text-2xl sm:text-3xl text-rose-800 font-extrabold">
                Happy Birthday, Kai! 🎂❤️
              </p>
              <p>
                I hope today brings you the happiness, love, and warmth that you truly deserve. On your special day, I just wanted to take a moment to thank you for all the wonderful memories, stories, and little pieces of your life that you've shared with me.
              </p>
              <p>
                Even though it has only been almost three months since we started writing to each other, I’m genuinely grateful for all the conversations we've had the random stories, the funny moments, the thoughtful words, and all the little details that have made every letter special.
              </p>
              <p>
                Thank you for sharing your world with me your mornings, your coffee moments, your adventures, your achievements, your love for animals, your paintings, and all those small things that make your days unique. It has been really special getting to know these little pieces of your life.
              </p>
              <p>
                For this new year of your life, I wish you endless happiness, peace, good health, and countless beautiful moments. May you achieve everything you dream of, reach every goal you work towards, and always have the strength and courage to chase new adventures.
              </p>
              <p>
                I hope your days are filled with peaceful mornings, exciting journeys, proud achievements, people who make you smile, and memories that you will cherish forever.
              </p>
              <p>
                May this year bring you more reasons to laugh, more moments to celebrate, and more happiness than you can imagine.
              </p>
              <p className="pt-2 text-2xl sm:text-3xl text-amber-900 font-extrabold">
                Happy Birthday once again, Kai! 🎈✨
              </p>
              <p className="pt-1 text-xl sm:text-2xl text-rose-800 font-extrabold">
                Wishing you a beautiful year ahead filled with love, success, peace, and everything your heart hopes for. ❤️
              </p>
            </div>

            {/* Fountain Pen Sign-Off */}
            <div className="pt-6 border-t-2 border-dashed border-[#D7C4A5] flex justify-between items-center font-handwritten text-3xl sm:text-4xl text-rose-800 font-extrabold">
              <span>Warmly,</span>
              <span className="flex items-center gap-1.5">Monish <Heart className="w-5 h-5 fill-rose-600 text-rose-600 inline" /></span>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
