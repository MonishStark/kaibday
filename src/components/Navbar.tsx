import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

interface NavbarProps {
  currentChapter: number;
  totalChapters: number;
}

export const Navbar: React.FC<NavbarProps> = ({ currentChapter, totalChapters }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const progressPercent = Math.min(100, Math.max(0, (currentChapter / totalChapters) * 100));

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      scrolled ? 'bg-kai-cream/90 backdrop-blur-md border-b border-kai-beige/60 py-2.5 shadow-sm' : 'py-4'
    }`}>
      {/* Top progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-kai-beige/40">
        <div
          className="h-full bg-gradient-to-r from-kai-peach via-kai-pink to-kai-gold transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-serif text-sm font-semibold tracking-wide text-kai-charcoal">
            Kai's Birthday
          </span>
          <span className="text-xs text-kai-muted font-sans hidden sm:inline-block">
            • 20 August
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-kai-muted bg-kai-beige/40 px-3 py-1 rounded-full border border-kai-beige/60">
          <Heart className="w-3 h-3 text-kai-pink fill-kai-pink animate-pulse" />
          <span>A Day in the Life</span>
        </div>
      </div>
    </header>
  );
};
