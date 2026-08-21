import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import { soundFx } from '../../utils/sound';
import { ScrollReveal } from '../ScrollReveal';

interface ScrapbookSceneProps {
  onNext?: () => void;
}

interface PhotoCard {
  id: string;
  src: string;
  title: string;
  caption: string;
  rotation: string;
}

export const ScrapbookScene: React.FC<ScrapbookSceneProps> = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoCard | null>(null);

  const photos: PhotoCard[] = [
    {
      id: 'finisher',
      src: '/img/kai-marathon-finisher.png',
      title: 'Marathon Finisher',
      caption: '“16 km done — pure determination and pride.”',
      rotation: 'rotate-[-3deg]',
    },
    {
      id: 'portrait',
      src: '/img/kai-portrait.png',
      title: 'Coffee & Morning',
      caption: '“Black coffee was definitely involved.”',
      rotation: 'rotate-[2deg]',
    },
    {
      id: 'gym',
      src: '/img/kai-gym.png',
      title: 'Gym Session',
      caption: '“Early morning gym mode activated!”',
      rotation: 'rotate-[-2deg]',
    },
    {
      id: 'stadium',
      src: '/img/kai-marathon-stadium.png',
      title: 'Stadium Vibe',
      caption: '“Before the rain and 16 km of running.”',
      rotation: 'rotate-[4deg]',
    },
    {
      id: 'cat',
      src: '/img/kai-cat.png',
      title: 'Cat Buddy',
      caption: '“With one of her four cats in her natural habitat.”',
      rotation: 'rotate-[-1deg]',
    },
  ];

  return (
    <section className="relative min-h-screen py-24 px-4 bg-[#F5EBE0] paper-texture flex flex-col items-center justify-center overflow-hidden">
      
      <div className="max-w-5xl mx-auto w-full text-center space-y-12">
        
        {/* Title */}
        <ScrollReveal direction="down">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1 text-xs font-mono tracking-widest uppercase bg-white/80 px-3 py-1 rounded-full text-kai-charcoal shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-kai-gold" /> Personal Scrapbook
            </span>

            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-kai-charcoal">
              A few pieces of Kai
            </h2>

            <p className="text-sm sm:text-base text-kai-muted italic font-serif">
              Tap any photograph to take a closer look ✨
            </p>
          </div>
        </ScrollReveal>

        {/* Scrapbook Table Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto px-2">
          {photos.map((photo, index) => (
            <ScrollReveal key={photo.id} direction="rotate" delay={index * 0.1} amount={0.15}>
              <motion.div
                whileHover={{ scale: 1.05, rotate: 0, zIndex: 30 }}
                transition={{ type: 'spring', stiffness: 300 }}
                onClick={() => {
                  soundFx.playClick();
                  setSelectedPhoto(photo);
                }}
                className={`polaroid bg-white cursor-pointer relative group transition-all duration-300 ${photo.rotation}`}
              >
                <div className="washi-tape -top-3 left-1/2 -translate-x-1/2 -rotate-2" />

                <div className="aspect-[4/5] overflow-hidden rounded bg-gray-100">
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
                  />
                </div>

                <p className="font-handwritten text-xl text-center mt-3 text-kai-charcoal font-semibold">
                  {photo.title}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* K-Drama Easter Egg Card */}
        <ScrollReveal direction="up" delay={0.4}>
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-md border border-kai-beige max-w-sm mx-auto flex items-center gap-4 text-left">
            <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center text-2xl shrink-0">
              📺
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-rose-600 tracking-wider">
                Kai's Watchlist
              </span>
              <h4 className="font-serif font-bold text-slate-900 text-sm">
                Crash Landing on You
              </h4>
              <p className="text-xs text-slate-500 italic font-serif">
                "Kai-approved. Apparently I have homework now. 😅"
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
              className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm p-4 flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0.85, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.85, y: 30 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl p-4 sm:p-6 max-w-md w-full shadow-2xl relative space-y-4"
              >
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="aspect-[4/5] w-full overflow-hidden rounded-xl bg-gray-100">
                  <img
                    src={selectedPhoto.src}
                    alt={selectedPhoto.title}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                <div className="text-center space-y-2">
                  <h3 className="font-serif font-bold text-xl text-kai-charcoal">
                    {selectedPhoto.title}
                  </h3>
                  <p className="font-handwritten text-2xl text-kai-pink font-semibold">
                    {selectedPhoto.caption}
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
