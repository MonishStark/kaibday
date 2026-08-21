import React, { useEffect, useRef } from 'react';

// Exact 8 Keyframe Stops from Specification
const STOPS = [
  { t: 0.00, skyA: '#FFC98B', skyB: '#FF8F6B', orb: '#FFD8A0', glow: 'rgba(255,216,160,0.55)', shadow: '0 0 46px 8px rgba(255,200,140,0.55)', top: 14, star: 0 },
  { t: 0.16, skyA: '#BFE3FF', skyB: '#6FB8F5', orb: '#FFEFC2', glow: 'rgba(255,239,194,0.55)', shadow: '0 0 44px 6px rgba(255,236,180,0.55)', top: 9,  star: 0 },
  { t: 0.34, skyA: '#8FD3FF', skyB: '#3E8FE0', orb: '#FFF7DE', glow: 'rgba(255,247,222,0.6)',  shadow: '0 0 36px 4px rgba(255,247,222,0.7)', top: 5,  star: 0 },
  { t: 0.50, skyA: '#8FD3FF', skyB: '#3E8FE0', orb: '#FFF7DE', glow: 'rgba(255,247,222,0.6)',  shadow: '0 0 36px 4px rgba(255,247,222,0.7)', top: 6,  star: 0 },
  { t: 0.62, skyA: '#A8D6EE', skyB: '#5F87C4', orb: '#FFD97E', glow: 'rgba(255,217,126,0.55)', shadow: '0 0 42px 6px rgba(255,190,110,0.55)', top: 10, star: 0 },
  { t: 0.74, skyA: '#FF9F6B', skyB: '#7A4C86', orb: '#FF9A56', glow: 'rgba(255,154,86,0.6)',   shadow: '0 0 48px 10px rgba(255,120,70,0.6)', top: 18, star: 0.15 },
  { t: 0.86, skyA: '#5A3D74', skyB: '#221338', orb: '#FF6E52', glow: 'rgba(255,110,82,0.45)',  shadow: '0 0 40px 8px rgba(255,90,70,0.4)',   top: 26, star: 0.55 },
  { t: 1.00, skyA: '#161B33', skyB: '#05060F', orb: '#E9ECF4', glow: 'rgba(233,236,244,0.35)', shadow: '0 0 30px 6px rgba(210,220,255,0.45)', top: 9,  star: 1.0 }
];

function lerp(a: number, b: number, f: number) {
  return a + (b - a) * f;
}

function hexToRgb(h: string): [number, number, number] {
  let clean = h.replace('#', '');
  if (clean.length === 3) {
    clean = clean.split('').map((c) => c + c).join('');
  }
  const n = parseInt(clean, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');
}

function mixHex(h1: string, h2: string, f: number): string {
  const a = hexToRgb(h1);
  const b = hexToRgb(h2);
  return rgbToHex(lerp(a[0], b[0], f), lerp(a[1], b[1], f), lerp(a[2], b[2], f));
}

function mixRgbaStr(s1: string, s2: string, f: number): string {
  const parse = (s: string) => {
    const match = s.match(/rgba?\(([^)]+)\)/);
    if (!match) return [0, 0, 0, 1];
    return match[1].split(',').map(Number);
  };
  const a = parse(s1);
  const b = parse(s2);
  const r = lerp(a[0], b[0], f);
  const g = lerp(a[1], b[1], f);
  const bl = lerp(a[2], b[2], f);
  const al = lerp(a[3] !== undefined ? a[3] : 1, b[3] !== undefined ? b[3] : 1, f);
  return `rgba(${Math.round(r)},${Math.round(g)},${Math.round(bl)},${al.toFixed(2)})`;
}

function mixShadow(s1: string, s2: string, f: number): string {
  const re = /0 0 (\d+(?:\.\d+)?)px (\d+(?:\.\d+)?)px (rgba?\([^)]+\))/;
  const m1 = s1.match(re);
  const m2 = s2.match(re);
  if (!m1 || !m2) return s1;
  const blur = lerp(parseFloat(m1[1]), parseFloat(m2[1]), f);
  const spread = lerp(parseFloat(m1[2]), parseFloat(m2[2]), f);
  const color = mixRgbaStr(m1[3], m2[3], f);
  return `0 0 ${blur.toFixed(1)}px ${spread.toFixed(1)}px ${color}`;
}

export const DynamicSkySystem: React.FC = () => {
  const skyRef = useRef<HTMLDivElement | null>(null);
  const starsRef = useRef<HTMLDivElement | null>(null);
  const cloudsRef = useRef<HTMLDivElement | null>(null);
  const orbRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const orbWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Generate Stars
    if (starsRef.current && starsRef.current.children.length === 0) {
      const starCount = 60;
      for (let n = 0; n < starCount; n++) {
        const el = document.createElement('div');
        el.className = 'star';
        el.style.left = Math.random() * 100 + 'vw';
        el.style.top = Math.random() * 70 + 'vh';
        el.style.animationDelay = (Math.random() * 3).toFixed(2) + 's';
        const size = (Math.random() * 1.6 + 1).toFixed(1);
        el.style.width = size + 'px';
        el.style.height = size + 'px';
        starsRef.current.appendChild(el);
      }
    }

    // Generate Clouds
    if (cloudsRef.current && cloudsRef.current.children.length === 0) {
      const cloudSvg = () => `
        <svg viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="55" cy="50" rx="45" ry="22" fill="#fff"/>
          <ellipse cx="100" cy="36" rx="55" ry="28" fill="#fff"/>
          <ellipse cx="145" cy="52" rx="42" ry="20" fill="#fff"/>
        </svg>
      `;
      const cloudCount = 6;
      for (let n = 0; n < cloudCount; n++) {
        const el = document.createElement('div');
        el.className = 'cloud';
        const scale = 0.5 + Math.random() * 1.1;
        const width = 200 * scale;
        el.style.width = width + 'px';
        el.style.height = 80 * scale + 'px';
        el.style.top = 4 + Math.random() * 32 + 'vh';
        el.style.opacity = (0.5 + Math.random() * 0.4).toFixed(2);
        const duration = 55 + Math.random() * 50;
        el.style.animationDuration = duration + 's';
        el.style.animationDelay = -Math.random() * duration + 's';
        el.innerHTML = cloudSvg();
        cloudsRef.current.appendChild(el);
      }
    }

    // Scroll Animation Loop
    let animFrameId: number;
    const updateFrame = () => {
      const doc = document.documentElement;
      const maxScroll = doc.scrollHeight - doc.clientHeight;
      const t = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;

      // Find bracketing stops
      let i = 0;
      while (i < STOPS.length - 2 && t > STOPS[i + 1].t) {
        i++;
      }
      const s1 = STOPS[i];
      const s2 = STOPS[i + 1];
      const span = s2.t - s1.t || 1;
      const f = Math.min(1, Math.max(0, (t - s1.t) / span));

      if (skyRef.current) {
        skyRef.current.style.background = `linear-gradient(180deg, ${mixHex(s1.skyA, s2.skyA, f)}, ${mixHex(s1.skyB, s2.skyB, f)})`;
      }
      if (orbRef.current) {
        orbRef.current.style.background = mixHex(s1.orb, s2.orb, f);
        orbRef.current.style.boxShadow = mixShadow(s1.shadow, s2.shadow, f);
        if (t > 0.8) {
          orbRef.current.classList.add('night');
        } else {
          orbRef.current.classList.remove('night');
        }
      }
      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(circle, ${mixRgbaStr(s1.glow, s2.glow, f)}, rgba(0,0,0,0) 70%)`;
      }
      if (orbWrapRef.current) {
        orbWrapRef.current.style.top = `${lerp(s1.top, s2.top, f)}%`;
      }
      if (starsRef.current) {
        starsRef.current.style.opacity = `${lerp(s1.star, s2.star, f)}`;
      }

      animFrameId = requestAnimationFrame(updateFrame);
    };

    animFrameId = requestAnimationFrame(updateFrame);
    return () => cancelAnimationFrame(animFrameId);
  }, []);

  return (
    <>
      {/* Fixed Dynamic Sky Gradient Layer */}
      <div id="sky" ref={skyRef} className="fixed inset-0 z-0 pointer-events-none transition-[background] duration-150 ease-linear" />

      {/* Fixed Twinkling Stars Layer */}
      <div id="stars" ref={starsRef} className="fixed inset-0 z-[1] pointer-events-none opacity-0 transition-opacity duration-400 ease-linear" />

      {/* Fixed Drifting Clouds Layer */}
      <div id="clouds" ref={cloudsRef} className="fixed inset-0 z-[2] pointer-events-none" />

      {/* Fixed Sun/Moon Celestial Orb in Top Right */}
      <div
        id="orb-wrap"
        ref={orbWrapRef}
        className="fixed top-[6%] right-[8%] z-[3] w-[140px] h-[140px] max-sm:w-[88px] max-sm:h-[88px] max-sm:top-[4%] max-sm:right-[6%] pointer-events-none transition-[top] duration-200 ease-out select-none"
      >
        <div id="orb-glow" ref={glowRef} className="absolute inset-[-70px] max-sm:inset-[-44px] rounded-full transition-[background] duration-150 ease-linear" />
        <div id="orb" ref={orbRef} className="absolute inset-[20px] max-sm:inset-[14px] rounded-full transition-[background,box-shadow] duration-150 ease-linear">
          {/* Moon craters pseudo-element via CSS */}
        </div>
      </div>
    </>
  );
};
