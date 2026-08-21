import React from 'react';
import { CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { ScrollReveal } from '../ScrollReveal';
import { InteractiveCoffeeCarafe } from '../InteractiveCoffeeCarafe';

interface CoffeeSceneProps {
  onNext?: () => void;
}

export const CoffeeScene: React.FC<CoffeeSceneProps> = () => {
  return (
    <section className="relative min-h-screen py-24 px-4 flex flex-col items-center justify-center bg-kai-cream paper-texture overflow-hidden">
      <div className="max-w-xl mx-auto w-full text-center space-y-8">
        
        {/* Title */}
        <ScrollReveal direction="down">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-widest text-kai-muted font-mono bg-kai-beige/60 px-3 py-1 rounded-full shadow-sm">
              05:15 AM • Morning Ritual
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-kai-charcoal">
              First things first.
            </h2>
            <p className="text-4xl sm:text-6xl font-serif font-bold text-kai-peach flex items-center justify-center gap-2">
              Black Coffee. ☕
            </p>
            <p className="text-sm sm:text-base text-kai-muted italic font-serif">
              "Black coffee. No sugar. Apparently coffee is part of the morning protocol."
            </p>
          </div>
        </ScrollReveal>

        {/* Premium Handcrafted Interactive Coffee Carafe */}
        <ScrollReveal direction="zoom" delay={0.2}>
          <InteractiveCoffeeCarafe />
        </ScrollReveal>

        {/* Morning Protocol Checklist Card */}
        <ScrollReveal direction="up" delay={0.3}>
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-kai-beige text-left max-w-sm mx-auto space-y-4">
            <div className="flex items-center justify-between border-b border-kai-beige/60 pb-3">
              <h3 className="font-serif font-bold text-kai-charcoal text-base flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-kai-gold" />
                KAI'S MORNING PROTOCOL
              </h3>
              <span className="text-[11px] font-mono text-kai-muted">20 Aug</span>
            </div>

            <ul className="space-y-3 text-sm font-sans">
              <li className="flex items-center justify-between text-kai-charcoal">
                <span className="font-medium">Black Coffee (No sugar)</span>
                <span className="flex items-center gap-1 text-emerald-600 font-semibold text-xs">
                  <CheckCircle2 className="w-4 h-4" /> Ready
                </span>
              </li>
              <li className="flex items-center justify-between text-kai-charcoal">
                <span className="font-medium">Birthday</span>
                <span className="flex items-center gap-1 text-emerald-600 font-semibold text-xs">
                  <CheckCircle2 className="w-4 h-4" /> Active 🎉
                </span>
              </li>
              <li className="flex items-center justify-between text-kai-charcoal">
                <span className="font-medium">Good mood</span>
                <span className="flex items-center gap-1 text-amber-600 font-medium text-xs">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Loading...
                </span>
              </li>
              <li className="flex items-center justify-between text-kai-charcoal">
                <span className="font-medium">Cake</span>
                <span className="text-kai-muted text-xs italic">Pending</span>
              </li>
              <li className="flex items-center justify-between text-kai-charcoal">
                <span className="font-medium">Ice cream</span>
                <span className="text-kai-pink font-semibold text-xs">Absolutely necessary</span>
              </li>
            </ul>

            <div className="pt-3 border-t border-kai-beige/60 text-center">
              <p className="text-xs font-semibold text-kai-forest">
                ✓ Morning protocol successfully activated.
              </p>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
