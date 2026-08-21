import React, { useEffect, useRef } from 'react';

// Exact 8 Keyframe Stops for Orb from Specification
const STOPS = [
  { t: 0.00, orb: '#FFD8A0', glow: 'rgba(255,216,160,0.55)', shadow: '0 0 46px 8px rgba(255,200,140,0.55)', top: 12 },
  { t: 0.16, orb: '#FFEFC2', glow: 'rgba(255,239,194,0.55)', shadow: '0 0 44px 6px rgba(255,236,180,0.55)', top: 8  },
  { t: 0.34, orb: '#FFF7DE', glow: 'rgba(255,247,222,0.6)',  shadow: '0 0 36px 4px rgba(255,247,222,0.7)', top: 5  },
  { t: 0.50, orb: '#FFF7DE', glow: 'rgba(255,247,222,0.6)',  shadow: '0 0 36px 4px rgba(255,247,222,0.7)', top: 6  },
  { t: 0.62, orb: '#FFD97E', glow: 'rgba(255,217,126,0.55)', shadow: '0 0 42px 6px rgba(255,190,110,0.55)', top: 9  },
  { t: 0.74, orb: '#FF9A56', glow: 'rgba(255,154,86,0.6)',   shadow: '0 0 48px 10px rgba(255,120,70,0.6)', top: 16 },
  { t: 0.86, orb: '#FF6E52', glow: 'rgba(255,110,82,0.45)',  shadow: '0 0 40px 8px rgba(255,90,70,0.4)',   top: 22 },
  { t: 1.00, orb: '#E9ECF4', glow: 'rgba(233,236,244,0.35)', shadow: '0 0 30px 6px rgba(210,220,255,0.45)', top: 8  }
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
  const orbRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const orbWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let animFrameId: number;
    const updateFrame = () => {
      const doc = document.documentElement;
      const maxScroll = doc.scrollHeight - doc.clientHeight;
      const t = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
      
      // Check if user is past Chapter 1 (second section onwards)
      const isPastSectionOne = window.scrollY > window.innerHeight * 0.45;

      // Find bracketing stops
      let i = 0;
      while (i < STOPS.length - 2 && t > STOPS[i + 1].t) {
        i++;
      }
      const s1 = STOPS[i];
      const s2 = STOPS[i + 1];
      const span = s2.t - s1.t || 1;
      const f = Math.min(1, Math.max(0, (t - s1.t) / span));

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
        orbWrapRef.current.style.opacity = isPastSectionOne ? '1' : '0';
        orbWrapRef.current.style.transform = isPastSectionOne ? 'scale(1)' : 'scale(0.7)';
      }

      animFrameId = requestAnimationFrame(updateFrame);
    };

    animFrameId = requestAnimationFrame(updateFrame);
    return () => cancelAnimationFrame(animFrameId);
  }, []);

  return (
    <>
      {/* Fixed Sun/Moon Celestial Orb (Hidden in Section 1, Fades In Smoothly in Section 2) */}
      <div
        id="orb-wrap"
        ref={orbWrapRef}
        className="fixed top-[6%] right-[4%] max-sm:right-[3%] z-[30] w-[90px] h-[90px] max-sm:w-[64px] max-sm:h-[64px] pointer-events-none transition-[top,opacity,transform] duration-500 ease-out select-none opacity-0 scale-75"
      >
        <div id="orb-glow" ref={glowRef} className="absolute inset-[-45px] max-sm:inset-[-30px] rounded-full transition-[background] duration-150 ease-linear" />
        <div id="orb" ref={orbRef} className="absolute inset-[14px] max-sm:inset-[10px] rounded-full transition-[background,box-shadow] duration-150 ease-linear">
          {/* Moon craters pseudo-element via CSS */}
        </div>
      </div>
    </>
  );
};
