import React, { useEffect, useState, useRef } from 'react';

// Keyframe stops provided in exact spec
const STOPS = [
  { t: 0.00, orb: '#FFD8A0', glow: 'rgba(255,216,160,0.55)', topOffset: 70 }, // Dawn
  { t: 0.34, orb: '#FFF7DE', glow: 'rgba(255,247,222,0.60)', topOffset: 55 }, // Noon (brightest, highest)
  { t: 0.62, orb: '#FFD97E', glow: 'rgba(255,217,126,0.55)', topOffset: 75 }, // Afternoon
  { t: 0.86, orb: '#FF6E52', glow: 'rgba(255,110,82,0.45)',  topOffset: 120 }, // Sunset (lowest, reddest)
  { t: 1.00, orb: '#E9ECF4', glow: 'rgba(233,236,244,0.35)', topOffset: 65 }, // Night / Moon
];

function lerp(a: number, b: number, f: number) {
  return a + (b - a) * f;
}

function hexToRgb(h: string): [number, number, number] {
  const clean = h.replace('#', '');
  const n = parseInt(clean, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function mixHex(h1: string, h2: string, f: number): string {
  const a = hexToRgb(h1);
  const b = hexToRgb(h2);
  const r = Math.round(lerp(a[0], b[0], f));
  const g = Math.round(lerp(a[1], b[1], f));
  const bl = Math.round(lerp(a[2], b[2], f));
  return `#${[r, g, bl].map((v) => v.toString(16).padStart(2, '0')).join('')}`;
}

export const CelestialOrb: React.FC = () => {
  const orbRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let animFrameId: number;

    const updateFrame = () => {
      const doc = document.documentElement;
      const maxScroll = doc.scrollHeight - doc.clientHeight;
      const t = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;

      // Find the two keyframe stops we are currently between
      let i = 0;
      while (i < STOPS.length - 2 && t > STOPS[i + 1].t) {
        i++;
      }
      const s1 = STOPS[i];
      const s2 = STOPS[i + 1];
      const f = Math.min(1, Math.max(0, (t - s1.t) / (s2.t - s1.t)));

      const currentOrbHex = mixHex(s1.orb, s2.orb, f);
      const currentTop = lerp(s1.topOffset, s2.topOffset, f);

      if (orbRef.current) {
        orbRef.current.style.background = currentOrbHex;
        orbRef.current.style.boxShadow = `0 0 35px 5px ${s2.glow}`;
        if (t > 0.85) {
          orbRef.current.classList.add('night');
        } else {
          orbRef.current.classList.remove('night');
        }
      }

      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(circle, ${s2.glow}, rgba(0,0,0,0) 70%)`;
      }

      if (wrapRef.current) {
        wrapRef.current.style.top = `${currentTop}px`;
      }

      animFrameId = requestAnimationFrame(updateFrame);
    };

    animFrameId = requestAnimationFrame(updateFrame);
    return () => cancelAnimationFrame(animFrameId);
  }, []);

  return (
    <div
      ref={wrapRef}
      className="fixed right-[5%] sm:right-[6%] z-30 w-16 h-16 sm:w-20 sm:h-20 pointer-events-none transition-[top] duration-200 ease-out select-none"
    >
      {/* Radial Glow Layer */}
      <div
        ref={glowRef}
        className="absolute inset-[-25px] sm:inset-[-35px] rounded-full transition-colors duration-150 ease-linear pointer-events-none"
      />

      {/* The Sun/Moon Orb */}
      <div
        ref={orbRef}
        className="celestial-orb-inner absolute inset-[8px] sm:inset-[10px] rounded-full transition-all duration-150 ease-linear relative overflow-hidden"
      >
        {/* Moon Craters Overlay (visible when .night class is added) */}
        <div className="moon-craters absolute inset-0 rounded-full pointer-events-none opacity-0 transition-opacity duration-500 ease-linear" />
      </div>
    </div>
  );
};
