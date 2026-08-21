import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundFx } from '../utils/sound';

export const InteractiveCoffeeCarafe: React.FC = () => {
  const [steamIntensity, setSteamIntensity] = useState(1);
  const [tapCount, setTapCount] = useState(0);
  const [showReadyMessage, setShowReadyMessage] = useState(false);
  const [isRippling, setIsRippling] = useState(false);

  const handleClick = () => {
    soundFx.playSteam();
    setIsRippling(true);
    setTimeout(() => setIsRippling(false), 800);

    setSteamIntensity((prev) => (prev >= 3 ? 1 : prev + 1));
    setTapCount((prev) => {
      const next = prev + 1;
      if (next >= 3) {
        setShowReadyMessage(true);
        setTimeout(() => setShowReadyMessage(false), 3500);
        return 0;
      }
      return next;
    });
  };

  return (
    <div className="relative my-8 sm:my-12 inline-block cursor-pointer group select-none">
      
      {/* Floating Easter Egg Message */}
      <AnimatePresence>
        {showReadyMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.85 }}
            animate={{ opacity: 1, y: -25, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 z-50 bg-amber-100/95 text-amber-950 px-4 py-1.5 rounded-full font-handwritten text-lg font-bold border border-amber-300 shadow-xl whitespace-nowrap pointer-events-none"
          >
            Okay okay... coffee is ready 😭
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Handcrafted Glass Carafe SVG Illustration */}
      <motion.div
        whileHover={{ y: -6, scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleClick}
        className="relative w-[230px] sm:w-[300px] h-[280px] sm:h-[350px] mx-auto flex items-center justify-center"
      >
        {/* Soft Drop Shadow Underneath */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-44 sm:w-60 h-6 bg-amber-950/20 rounded-full blur-md group-hover:scale-105 transition-transform duration-500" />

        {/* SVG Glass Carafe */}
        <svg
          viewBox="0 0 320 380"
          className="w-full h-full drop-shadow-2xl overflow-visible"
        >
          <defs>
            {/* Glass Body Tint Gradient */}
            <linearGradient id="glassTint" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
              <stop offset="30%" stopColor="#FAF7F2" stopOpacity="0.15" />
              <stop offset="70%" stopColor="#5D4037" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#3E2723" stopOpacity="0.3" />
            </linearGradient>

            {/* Glass Left Highlight */}
            <linearGradient id="glassHighlight" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
            </linearGradient>

            {/* Coffee Liquid Dark Gradient */}
            <linearGradient id="coffeeLiquid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3E2723" />
              <stop offset="40%" stopColor="#2A1612" />
              <stop offset="100%" stopColor="#150806" />
            </linearGradient>

            {/* Coffee Surface Ellipse Highlight */}
            <linearGradient id="coffeeSurface" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#6D4C41" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#4E342E" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#3E2723" stopOpacity="0.9" />
            </linearGradient>

            {/* Wooden Lid Gradient */}
            <linearGradient id="woodLid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8D6E63" />
              <stop offset="50%" stopColor="#5D4037" />
              <stop offset="100%" stopColor="#3E2723" />
            </linearGradient>

            {/* Handle Wood/Glass Gradient */}
            <linearGradient id="handleGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6D4C41" />
              <stop offset="50%" stopColor="#4E342E" />
              <stop offset="100%" stopColor="#2A1612" />
            </linearGradient>
          </defs>

          {/* 1. STEAM PATHS (SVG Animated Steam Trails) */}
          <g className="pointer-events-none">
            {[0, 1, 2, 3].map((idx) => {
              const xOffsets = [105, 130, 155, 175];
              const speeds = [2.4, 2.8, 2.2, 3.0];
              const delays = [0, 0.4, 0.8, 1.2];
              return (
                <motion.path
                  key={idx}
                  d={`M ${xOffsets[idx]} 65 C ${xOffsets[idx] - 10} 45, ${xOffsets[idx] + 15} 25, ${xOffsets[idx]} 5`}
                  fill="none"
                  stroke="rgba(243, 231, 211, 0.7)"
                  strokeWidth={2.5 + (idx % 2)}
                  strokeLinecap="round"
                  animate={{
                    d: [
                      `M ${xOffsets[idx]} 65 C ${xOffsets[idx] - 10} 45, ${xOffsets[idx] + 15} 25, ${xOffsets[idx]} 5`,
                      `M ${xOffsets[idx]} 65 C ${xOffsets[idx] + 15} 45, ${xOffsets[idx] - 10} 25, ${xOffsets[idx] + 5} 5`,
                      `M ${xOffsets[idx]} 65 C ${xOffsets[idx] - 10} 45, ${xOffsets[idx] + 15} 25, ${xOffsets[idx]} 5`,
                    ],
                    opacity: [0.1, 0.85 * steamIntensity, 0],
                    translateY: [0, -15 * steamIntensity],
                  }}
                  transition={{
                    duration: speeds[idx] / steamIntensity,
                    repeat: Infinity,
                    delay: delays[idx],
                    ease: 'easeInOut',
                  }}
                />
              );
            })}
          </g>

          {/* 2. CURVED HANDLE (Right Side) */}
          <path
            d="M 230 115 C 295 125, 300 240, 220 270"
            fill="none"
            stroke="url(#handleGrad)"
            strokeWidth="18"
            strokeLinecap="round"
          />
          <path
            d="M 230 115 C 290 125, 295 240, 220 270"
            fill="none"
            stroke="#8D6E63"
            strokeWidth="6"
            strokeLinecap="round"
            opacity="0.4"
          />

          {/* 3. CARAFE GLASS SILHOUETTE (Body + Spout Left) */}
          {/* Main Glass Outer Path */}
          <path
            d="M 85 95 L 70 85 L 105 85 L 105 105 L 85 130 C 55 170, 50 260, 80 300 C 110 335, 210 335, 240 300 C 270 260, 265 170, 235 130 L 215 105 L 215 85 L 250 85 L 235 95 Z"
            fill="url(#glassTint)"
            stroke="#5D4037"
            strokeWidth="2.5"
            strokeOpacity="0.4"
          />

          {/* Handcrafted Organic Glass Body Main Inner Container */}
          <path
            d="M 105 100 Q 75 140 65 210 Q 55 285 100 320 Q 160 340 220 320 Q 265 285 255 210 Q 245 140 215 100 Z"
            fill="url(#glassTint)"
            stroke="#4E342E"
            strokeWidth="3"
            strokeOpacity="0.5"
          />

          {/* 4. COFFEE LIQUID FILL (68% Volume) */}
          <g>
            {/* Dark Coffee Liquid Mass */}
            <path
              d="M 72 205 Q 60 275 100 315 Q 160 335 220 315 Q 260 275 248 205 Q 160 215 72 205 Z"
              fill="url(#coffeeLiquid)"
            />

            {/* Coffee Liquid Top Ellipse Surface */}
            <motion.ellipse
              cx="160"
              cy="205"
              rx="88"
              ry="16"
              fill="url(#coffeeSurface)"
              animate={{
                ry: isRippling ? [16, 22, 14, 16] : 16,
                rx: isRippling ? [88, 92, 86, 88] : 88,
              }}
              transition={{ duration: 0.6 }}
            />

            {/* Surface Golden Foam Ring */}
            <ellipse
              cx="160"
              cy="205"
              rx="84"
              ry="13"
              fill="none"
              stroke="#D7CCC8"
              strokeWidth="1.5"
              strokeOpacity="0.35"
            />
          </g>

          {/* 5. MEASUREMENT MARKINGS (Right Glass Wall) */}
          <g opacity="0.4" fill="#E0D7CD" fontSize="9" fontFamily="monospace">
            <line x1="225" y1="140" x2="238" y2="140" stroke="#E0D7CD" strokeWidth="1.5" />
            <text x="242" y="143">600 ml</text>

            <line x1="230" y1="170" x2="242" y2="170" stroke="#E0D7CD" strokeWidth="1.5" />
            <text x="246" y="173">500</text>

            <line x1="234" y1="200" x2="245" y2="200" stroke="#E0D7CD" strokeWidth="1.5" />
            <text x="249" y="203">400</text>

            <line x1="232" y1="230" x2="242" y2="230" stroke="#E0D7CD" strokeWidth="1.5" />
            <text x="246" y="233">300</text>

            <line x1="225" y1="260" x2="235" y2="260" stroke="#E0D7CD" strokeWidth="1.5" />
            <text x="239" y="263">200</text>
          </g>

          {/* 6. PRINTED GLASS LABELS */}
          {/* Label 1: BLACK • NO SUGAR */}
          <text
            x="160"
            y="255"
            textAnchor="middle"
            fill="#F5EBE0"
            fontSize="11"
            fontFamily="monospace"
            fontWeight="bold"
            letterSpacing="2.5"
            opacity="0.9"
          >
            BLACK • NO SUGAR
          </text>

          {/* Label 2: Fuel first. Birthday later. */}
          <text
            x="160"
            y="275"
            textAnchor="middle"
            fill="#E0D7CD"
            fontSize="14"
            fontFamily="'Dancing Script', 'Caveat', cursive"
            fontStyle="italic"
            opacity="0.85"
          >
            "Fuel first. Birthday later."
          </text>

          {/* 7. GLASS INNER HIGHLIGHTS & SHIMMER */}
          {/* Left Vertical Curve Reflection */}
          <path
            d="M 80 115 Q 68 200 85 295"
            fill="none"
            stroke="url(#glassHighlight)"
            strokeWidth="7"
            strokeLinecap="round"
            opacity="0.6"
          />

          {/* Right Subtle Rim Reflection */}
          <path
            d="M 235 120 Q 250 200 232 290"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.25"
          />

          {/* 8. WOODEN LID (Top Rim & Cap) */}
          <g>
            {/* Lower Wooden Ring */}
            <rect
              x="96"
              y="76"
              width="128"
              height="20"
              rx="10"
              fill="url(#woodLid)"
              stroke="#3E2723"
              strokeWidth="2"
            />
            {/* Top Knob/Cap */}
            <path
              d="M 120 76 Q 160 55 200 76 Z"
              fill="url(#woodLid)"
              stroke="#3E2723"
              strokeWidth="2"
            />
            {/* Engraved "KAI ♡" Logo on Wooden Cap */}
            <text
              x="160"
              y="72"
              textAnchor="middle"
              fill="#D7CCC8"
              fontSize="10"
              fontFamily="serif"
              fontWeight="bold"
              letterSpacing="1.5"
              opacity="0.9"
            >
              KAI ♡
            </text>
          </g>

          {/* 9. PLAYFUL BOTTOM PILL DETAIL */}
          <g transform="translate(160, 345)">
            <rect
              x="-65"
              y="-12"
              width="130"
              height="24"
              rx="12"
              fill="#2C1810"
              fillOpacity="0.85"
              stroke="#6D4C41"
              strokeWidth="1.5"
            />
            <text
              x="0"
              y="4"
              textAnchor="middle"
              fill="#F5EBE0"
              fontSize="10"
              fontFamily="monospace"
              fontWeight="bold"
            >
              careful... it's hot ☕
            </text>
          </g>

        </svg>
      </motion.div>
    </div>
  );
};
