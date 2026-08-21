import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Sparkles, Heart } from 'lucide-react';
import { soundFx } from '../utils/sound';

interface WelcomeModalProps {
  onOpen: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ onOpen }) => {
  const handleOpenCard = () => {
    soundFx.playClick();
    soundFx.restartBirthdaySong();
    onOpen();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-md p-4 flex items-center justify-center select-none"
    >
      {/* Background Subtle Sparkle Ornaments */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-12 left-10 w-2 h-2 bg-amber-300 rounded-full animate-twinkle" />
        <div className="absolute top-24 right-20 w-1.5 h-1.5 bg-rose-300 rounded-full animate-twinkle" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-amber-200 rounded-full animate-twinkle" style={{ animationDelay: '2s' }} />
      </div>

      {/* Opening Envelope Card */}
      <motion.div
        initial={{ scale: 0.88, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="bg-white rounded-3xl p-8 sm:p-12 max-w-md w-full text-center shadow-2xl relative border border-amber-200/80 space-y-6"
      >
        {/* Washi Tape */}
        <div className="washi-tape -top-3 left-1/2 -translate-x-1/2 -rotate-2 bg-pink-200/90" />

        {/* Envelope & Wax Seal Graphic */}
        <div className="relative inline-block">
          <div className="w-20 h-20 bg-gradient-to-tr from-rose-400 via-pink-400 to-amber-300 rounded-full flex items-center justify-center shadow-xl mx-auto border-4 border-white">
            <Mail className="w-10 h-10 text-white animate-bounce" />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-amber-400 text-slate-950 p-1.5 rounded-full shadow-md">
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        {/* Header Text */}
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-rose-500 bg-rose-50 px-3.5 py-1 rounded-full border border-rose-200 inline-block">
            20 AUGUST • SPECIAL DELIVERY
          </span>

          <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-slate-900 leading-tight">
            You've received a birthday card.
          </h2>

          <p className="text-sm font-serif italic text-slate-500">
            For Kai • From Monish <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400 inline" />
          </p>
        </div>

        {/* Action Button to Open Card & Play Song */}
        <div className="pt-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleOpenCard}
            className="w-full py-4 bg-gradient-to-r from-rose-500 via-amber-500 to-rose-500 text-white font-extrabold rounded-2xl text-base tracking-wide shadow-xl hover:shadow-2xl transition-all cursor-pointer flex items-center justify-center gap-2 border border-rose-300"
          >
            <span>Open Birthday Card 💌</span>
          </motion.button>
        </div>

        <p className="text-[11px] font-mono text-slate-400 pt-1">
          ✨ Includes music & interactive memories
        </p>

      </motion.div>
    </motion.div>
  );
};
