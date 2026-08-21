import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const CelestialIndicator: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(1, Math.max(0, window.scrollY / totalHeight));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Phase thresholds:
  // 0.00 - 0.35: Radiant Golden Sun
  // 0.35 - 0.62: Rich Sunset / Golden Hour
  // 0.62 - 1.00: Luminous Crescent Moon

  const isMoon = scrollProgress > 0.62;
  const isSunset = scrollProgress > 0.35 && scrollProgress <= 0.62;

  // Crescent mask offset for moon phase
  const moonCrescentOffset = isMoon ? Math.max(18, 72 - (scrollProgress - 0.62) * 125) : 100;

  return (
    <div className="fixed top-4 right-4 sm:right-8 z-50 pointer-events-none select-none">
      
      {/* Outer Glowing Celestial Canvas */}
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
        
        {/* 1. ULTRA-PREMIUM VOLUMETRIC SUNBEAMS & HALO AURA */}
        {!isMoon && (
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-[-12px] flex items-center justify-center pointer-events-none"
          >
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 origin-center -translate-x-1/2 -translate-y-1/2"
                style={{ transform: `rotate(${i * 30}deg)` }}
              >
                <div
                  className={`w-1 sm:w-1.5 h-16 sm:h-20 rounded-full blur-[1.5px] transition-colors duration-1000 ${
                    isSunset
                      ? 'bg-gradient-to-t from-transparent via-rose-400/40 to-transparent'
                      : 'bg-gradient-to-t from-transparent via-amber-300/50 to-transparent'
                  }`}
                />
              </div>
            ))}
          </motion.div>
        )}

        {/* Ambient Pulsing Corona Glow */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: isMoon ? 0.6 : isSunset ? 0.85 : 0.95,
            boxShadow: isMoon
              ? '0 0 35px rgba(165, 180, 252, 0.5), 0 0 70px rgba(129, 140, 248, 0.3)'
              : isSunset
              ? '0 0 45px rgba(251, 113, 133, 0.8), 0 0 85px rgba(225, 29, 72, 0.45)'
              : '0 0 50px rgba(251, 191, 36, 0.85), 0 0 90px rgba(245, 158, 11, 0.5)',
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-1 rounded-full blur-lg"
        />

        {/* 2. PASSING LAYERED LIGHT CLOUDS */}
        <div className="absolute inset-x-[-20px] inset-y-[-10px] overflow-hidden rounded-full pointer-events-none z-20">
          {/* Cloud 1 */}
          <motion.div
            animate={{
              x: ['-70%', '180%'],
              opacity: isMoon ? [0, 0.25, 0] : [0, 0.7, 0],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: 'linear',
              delay: 0,
            }}
            className="absolute top-3 left-0 w-14 h-5 bg-white/80 rounded-full blur-[1px] shadow-sm"
          />
          {/* Cloud 2 */}
          <motion.div
            animate={{
              x: ['-80%', '190%'],
              opacity: isMoon ? [0, 0.2, 0] : [0, 0.6, 0],
            }}
            transition={{
              duration: 13,
              repeat: Infinity,
              ease: 'linear',
              delay: 4,
            }}
            className="absolute bottom-4 left-0 w-16 h-6 bg-white/70 rounded-full blur-[1.5px] shadow-sm"
          />
        </div>

        {/* 3. 3D CELESTIAL ORB (Sun morphs into Moon) */}
        <motion.div
          animate={{
            scale: [1, 1.03, 1],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.3)] z-10 border border-white/30"
        >
          {/* Base Shader Layer */}
          <motion.div
            animate={{
              background: isMoon
                ? 'radial-gradient(circle at 32% 32%, #FFFFFF 0%, #E2E8F0 40%, #94A3B8 75%, #475569 100%)'
                : isSunset
                ? 'radial-gradient(circle at 32% 32%, #FFF1F2 0%, #FDA4AF 30%, #F43F5E 65%, #9F1239 100%)'
                : 'radial-gradient(circle at 32% 32%, #FFFFFF 0%, #FEF08A 25%, #F59E0B 65%, #B45309 100%)',
            }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="w-full h-full rounded-full relative"
          >
            {/* Sun Lens Shimmer Ring */}
            {!isMoon && (
              <motion.div
                animate={{
                  scale: [1, 1.12, 1],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-1 rounded-full border-2 border-white/60 blur-[0.5px]"
              />
            )}

            {/* Moon Craters (Visible when morphed to Moon) */}
            {isMoon && (
              <g className="absolute inset-0 pointer-events-none opacity-45">
                <div className="absolute top-3 left-3 w-3 h-3 bg-slate-400/50 rounded-full shadow-inner" />
                <div className="absolute bottom-3 left-5 w-4 h-4 bg-slate-400/40 rounded-full shadow-inner" />
                <div className="absolute top-6 right-3 w-2.5 h-2.5 bg-slate-400/50 rounded-full shadow-inner" />
              </g>
            )}

            {/* Moon Phase Shadow Mask (Carves out Luminous Crescent) */}
            {isMoon && (
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: `${moonCrescentOffset}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="absolute inset-0 rounded-full bg-[#0B0F19] shadow-2xl"
              />
            )}
          </motion.div>
        </motion.div>

        {/* 4. TWINKLING NIGHT STARS (Visible at Night) */}
        {isMoon && (
          <div className="absolute inset-[-12px] pointer-events-none z-30">
            <motion.span
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.3, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1 left-1 text-xs text-amber-200"
            >
              ✨
            </motion.span>
            <motion.span
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.3, 0.8] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.8 }}
              className="absolute bottom-0 right-1 text-xs text-indigo-200"
            >
              ✨
            </motion.span>
          </div>
        )}

      </div>
    </div>
  );
};
