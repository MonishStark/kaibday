import React from 'react';
import { Mail } from 'lucide-react';
import { ScrollReveal } from '../ScrollReveal';

interface FriendshipSceneProps {
  onNext?: () => void;
}

export const FriendshipScene: React.FC<FriendshipSceneProps> = () => {
  return (
    <section className="relative min-h-screen py-24 px-4 bg-kai-cream paper-texture flex flex-col items-center justify-center">
      <div className="max-w-2xl mx-auto w-full text-center space-y-10">
        
        {/* Slowly Envelope Breadcrumbs */}
        <ScrollReveal direction="down">
          <div className="flex justify-center items-center gap-2 text-rose-400">
            <Mail className="w-4 h-4 animate-bounce" />
            <Mail className="w-5 h-5 animate-bounce" style={{ animationDelay: '0.2s' }} />
            <Mail className="w-4 h-4 animate-bounce" style={{ animationDelay: '0.4s' }} />
            <span className="text-xs font-mono text-kai-muted uppercase tracking-widest ml-2">Slowly Letters</span>
          </div>
        </ScrollReveal>

        {/* Title */}
        <ScrollReveal direction="up" delay={0.1}>
          <h2 className="text-4xl sm:text-6xl font-serif font-bold text-kai-charcoal tracking-tight">
            Almost three months.
          </h2>
        </ScrollReveal>

        {/* Story Text */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="space-y-4 text-base sm:text-xl font-serif italic text-kai-muted leading-relaxed">
            <p>It's kind of funny when you think about it.</p>
            <p>We've only known each other for almost three months.</p>
            <p>That's really not that long.</p>
            <p className="text-kai-charcoal font-semibold not-italic font-sans text-lg sm:text-2xl pt-2 text-kai-pink">
              And somehow, you've become someone whose letters I genuinely look forward to.
            </p>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
