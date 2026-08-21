import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, X } from 'lucide-react';
import { soundFx } from '../../utils/sound';
import { ScrollReveal } from '../ScrollReveal';

interface PaintingsSceneProps {
  onNext?: () => void;
}

interface PaintingCard {
  id: string;
  src: string;
  title: string;
  caption: string;
  rotation: string;
  featured?: boolean;
}

export const PaintingsScene: React.FC<PaintingsSceneProps> = () => {
  const [selectedPainting, setSelectedPainting] = useState<PaintingCard | null>(null);

  const paintings: PaintingCard[] = [
    {
      id: 'crescent',
      src: '/img/kai-painting-crescent-moon.jpg',
      title: 'Crescent Moon & Pines',
      caption: '"MY MOST FAVVVV. 🌙"',
      rotation: 'rotate-[-2deg]',
      featured: true,
    },
    {
      id: 'aurora',
      src: '/img/kai-painting-aurora.jpg',
      title: 'Aurora Night Sky',
      caption: '"And then the sky gets a little more dramatic."',
      rotation: 'rotate-[3deg]',
    },
    {
      id: 'fullmoon',
      src: '/img/kai-painting-full-moon.jpg',
      title: 'Full Moon & Blossom Cliff',
      caption: '"Gives the anime vibes.🌸"',
      rotation: 'rotate-[-1deg]',
    },
  ];

  return (
    <section className="relative min-h-screen py-24 px-4 bg-gradient-to-b from-[#181824] via-[#241E38] to-[#121420] text-white overflow-hidden flex flex-col justify-center items-center">
      
      {/* Subtle Moon & Stars Overlay Background */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-12 left-10 w-1.5 h-1.5 bg-amber-200 rounded-full animate-twinkle" />
        <div className="absolute top-24 right-1/4 w-2 h-2 bg-white rounded-full animate-twinkle" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-purple-200 rounded-full animate-twinkle" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-5xl mx-auto w-full text-center space-y-12 relative z-10">
        
        {/* Title */}
        <ScrollReveal direction="down">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono tracking-widest uppercase bg-purple-900/60 border border-purple-500/40 px-4 py-1.5 rounded-full text-purple-200 shadow-lg">
              <Moon className="w-3.5 h-3.5 text-amber-300" /> A Little Piece of Kai
            </span>

            <h2 className="text-4xl sm:text-6xl font-serif font-extrabold text-amber-100 tracking-tight">
              The girl who paints.
            </h2>

            <div className="space-y-2 text-base sm:text-xl font-serif italic text-purple-200/90 max-w-xl mx-auto">
              
              <p className="pt-2 text-purple-300 text-sm font-sans not-italic font-medium">
                 My favs 😍
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* 3 Real Paintings Presentation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-4xl mx-auto">
          {paintings.map((p, idx) => (
            <ScrollReveal key={p.id} direction="up" delay={idx * 0.15}>
              <motion.div
                whileHover={{ scale: 1.04, rotate: 0, zIndex: 30 }}
                onClick={() => {
                  soundFx.playClick();
                  setSelectedPainting(p);
                }}
                className={`bg-white text-slate-900 p-3 pb-6 rounded-lg shadow-2xl cursor-pointer transition-all duration-300 ${p.rotation} relative group`}
              >
                <div className="washi-tape -top-3 left-1/2 -translate-x-1/2 -rotate-2 bg-purple-300/60" />

                <div className="aspect-[4/3] overflow-hidden rounded bg-slate-900">
                  <img
                    src={p.src}
                    alt={p.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="mt-3 text-center space-y-1">
                  <h4 className="font-serif font-bold text-sm text-slate-900">
                    {p.title}
                  </h4>
                  <p className="font-handwritten text-xl text-purple-700 font-bold">
                    {p.caption}
                  </p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedPainting && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPainting(null)}
              className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md p-4 flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0.85, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.85, y: 30 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl p-4 sm:p-6 max-w-xl w-full shadow-2xl relative space-y-4 text-slate-900"
              >
                <button
                  onClick={() => setSelectedPainting(null)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="w-full overflow-hidden rounded-xl bg-slate-900">
                  <img
                    src={selectedPainting.src}
                    alt={selectedPainting.title}
                    className="w-full h-auto object-contain max-h-[70vh] mx-auto"
                  />
                </div>

                <div className="text-center space-y-1">
                  <h3 className="font-serif font-bold text-xl text-slate-900">
                    {selectedPainting.title}
                  </h3>
                  <p className="font-handwritten text-2xl text-purple-700 font-bold">
                    {selectedPainting.caption}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
