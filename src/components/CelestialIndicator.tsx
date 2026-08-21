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
  // 0.00 - 0.35: Radiant Midday Sun
  // 0.35 - 0.65: Deep Crimson Sunset
  // 0.65 - 1.00: Luminous Crescent Moon

  const isMoon = scrollProgress > 0.62;
  const isSunset = scrollProgress > 0.35 && scrollProgress <= 0.62;

  // Calculate moon phase mask position (moves from right to left across orb)
  // At scrollProgress 0.65 -> moon mask covers 35%
  // At scrollProgress 1.00 -> moon mask reveals crescent
  const moonCrescentOffset = isMoon ? Math.max(20, 75 - (scrollProgress - 0.62) * 120) : 100;

  return (
    <div className="fixed top-4 right-4 sm:right-8 z-50 pointer-events-none select-none">
      
      {/* Outer Glowing Celestial Canvas */}
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
        
        {/* Ambient Outer Halo Aura Glow */}
        <motion.div
          animate={{
            scale: [1, 1.12, 1],
            opacity: isMoon ? 0.6 : isSunset ? 0.85 : 0.95,
            backgroundColor: isMoon
              ? 'rgba(165, 180, 252, 0.4)'
              : isSunset
              ? 'rgba(251, 113, 133, 0.6)'
              : 'rgba(251, 191, 36, 0.65)',
            boxShadow: isMoon
              ? '0 0 40px rgba(165, 180, 252, 0.6), 0 0 70px rgba(129, 140, 248, 0.3)'
              : isSunset
              ? '0 0 45px rgba(251, 113, 133, 0.7), 0 0 80px rgba(225, 29, 72, 0.4)'
              : '0 0 45px rgba(251, 191, 36, 0.8), 0 0 80px rgba(245, 158, 11, 0.45)',
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 rounded-full blur-xl"
        />

        {/* 1. PASSING LIGHT WISPY CLOUDS (Drifting across orb) */}
        <div className="absolute inset-x-[-15px] inset-y-[-10px] overflow-hidden rounded-full pointer-events-none z-20">
          {/* Cloud 1 */}
          <motion.div
            animate={{
              x: ['-60%', '160%'],
              opacity: isMoon ? [0, 0.3, 0] : [0, 0.65, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
              delay: 0,
            }}
            className="absolute top-2 left-0 w-12 h-4 bg-white/70 rounded-full blur-[1px]"
          />
          {/* Cloud 2 */}
          <motion.div
            animate={{
              x: ['-70%', '170%'],
              opacity: isMoon ? [0, 0.25, 0] : [0, 0.55, 0],
            }}
            transition={{
              duration: 11,
              repeat: Infinity,
              ease: 'linear',
              delay: 3.5,
            }}
            className="absolute bottom-3 left-0 w-14 h-5 bg-white/60 rounded-full blur-[1.5px]"
          />
        </div>

        {/* 2. THE ACTUAL CSS SUN & MOON CELESTIAL ORB */}
        <motion.div
          animate={{
            rotate: scrollProgress * 180,
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden shadow-2xl z-10"
        >
          {/* Base Sun/Moon Shader Canvas */}
          <motion.div
            animate={{
              background: isMoon
                ? 'radial-gradient(circle at 35% 35%, #FFFFFF 0%, #CBD5E1 45%, #64748B 100%)'
                : isSunset
                ? 'radial-gradient(circle at 35% 35%, #FFE4E6 0%, #FB7185 50%, #BE123C 100%)'
                : 'radial-gradient(circle at 35% 35%, #FFFDF7 0%, #FDE047 45%, #F59E0B 100%)',
            }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="w-full h-full rounded-full relative"
          >
            {/* Sun Rays Flares (Visible during Day/Sunset) */}
            {!isMoon && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-[-6px] pointer-events-none"
              >
                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                  <div
                    key={deg}
                    className="absolute top-1/2 left-1/2 w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{
                      transform: `rotate(${deg}deg) translateY(-26px)`,
                      backgroundColor: isSunset ? '#FDA4AF' : '#FDE047',
                      boxShadow: isSunset ? '0 0 6px #FB7185' : '0 0 6px #FDE047',
                    }}
                  />
                ))}
              </motion.div>
            )}

            {/* Moon Craters (Visible when morphed to Moon) */}
            {isMoon && (
              <g className="absolute inset-0 pointer-events-none opacity-40">
                <div className="absolute top-2.5 left-3 w-2.5 h-2.5 bg-slate-400/50 rounded-full shadow-inner" />
                <div className="absolute bottom-3 left-5 w-3.5 h-3.5 bg-slate-400/40 rounded-full shadow-inner" />
                <div className="absolute top-6 right-3 w-2 h-2 bg-slate-400/50 rounded-full shadow-inner" />
              </g>
            )}

            {/* Moon Phase Shadow Mask (Carves out Moon Crescent) */}
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

        {/* 3. TWINKLING STARS AROUND MOON (Visible at Night) */}
        {isMoon && (
          <div className="absolute inset-[-10px] pointer-events-none z-30">
            <motion.span
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1 left-1 text-xs text-amber-200"
            >
              ✨
            </motion.span>
            <motion.span
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
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
