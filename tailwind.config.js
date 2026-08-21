/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kai: {
          cream: '#FFF9F0',
          beige: '#F3E7D3',
          blush: '#EFC6C2',
          pink: '#DFA7A5',
          peach: '#F2B88B',
          sage: '#A9B9A3',
          forest: '#617765',
          navy: '#101827',
          midnight: '#17243A',
          charcoal: '#252321',
          muted: '#706B65',
          gold: '#C9A86A',
          goldLight: '#E8D5B5',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        handwritten: ['"Dancing Script"', '"Caveat"', '"Patrick Hand"', 'cursive'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'steam': 'steam 3s ease-out infinite',
        'flicker': 'flicker 1.5s ease-in-out infinite alternate',
        'twinkle': 'twinkle 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        steam: {
          '0%': { opacity: '0', transform: 'translateY(0) scaleX(1)' },
          '50%': { opacity: '0.6', transform: 'translateY(-15px) scaleX(1.3)' },
          '100%': { opacity: '0', transform: 'translateY(-30px) scaleX(1.6)' },
        },
        flicker: {
          '0%': { opacity: '0.8', transform: 'scale(1) rotate(-1deg)' },
          '100%': { opacity: '1', transform: 'scale(1.15) rotate(1deg)' },
        },
        twinkle: {
          '0%': { opacity: '0.2', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1.2)' },
        }
      }
    },
  },
  plugins: [],
}
