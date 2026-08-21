import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, ShoppingCart, Check, Receipt, Tag } from 'lucide-react';
import { soundFx } from '../../utils/sound';
import { ScrollReveal } from '../ScrollReveal';

interface BirthdayCafeSceneProps {
  onNext?: () => void;
}

interface MenuItem {
  id: string;
  emoji: string;
  name: string;
  subtitle: string;
  price: number;
  image: string;
  desc: string;
  tag: string;
}

export const BirthdayCafeScene: React.FC<BirthdayCafeSceneProps> = () => {
  const [cart, setCart] = useState<string[]>(['coffee', 'icecream', 'cake']);
  const [showBill, setShowBill] = useState(false);
  const [scratched, setScratched] = useState(false);

  const menu: MenuItem[] = [
    {
      id: 'coffee',
      emoji: '☕',
      name: 'Black Coffee — No Sugar',
      subtitle: 'Birthday Morning Fuel',
      price: 180,
      tag: 'Kai Essential',
      image: '/img/kai-black-coffee.jpg',
      desc: 'Morning protocol. No sugar. No negotiations.',
    },
    {
      id: 'cake',
      emoji: '🍰',
      name: 'Official Birthday Cake',
      subtitle: 'Strawberry Velvet Slice',
      price: 1250,
      tag: 'Mandatory',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
      desc: 'Mandatory on 20 August.',
    },
    {
      id: 'icecream',
      emoji: '🍦',
      name: 'Birthday Happiness Sundae',
      subtitle: 'Double Scoop Gelato',
      price: 250,
      tag: 'Must Have',
      image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80',
      desc: 'Calories temporarily suspended by birthday law.',
    },
    {
      id: 'sandwich',
      emoji: '🥪',
      name: 'Classic Egg Sandwich',
      subtitle: 'Post-Run Fuel',
      price: 220,
      tag: 'Favorite',
      image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80',
      desc: 'Freshly toasted with quiet morning energy.',
    },
    {
      id: 'rest',
      emoji: '🏃',
      name: 'Recovery / Rest Day',
      subtitle: 'One Extra KM Break',
      price: 0,
      tag: 'Rest Day',
      image: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=600&q=80',
      desc: 'Absolutely not today. Take a well-deserved rest!',
    },
  ];

  const toggleItem = (id: string) => {
    soundFx.playClick();
    if (cart.includes(id)) {
      setCart(cart.filter((item) => item !== id));
    } else {
      setCart([...cart, id]);
    }
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, id) => {
      const item = menu.find((m) => m.id === id);
      return total + (item ? item.price : 0);
    }, 0);
  };

  const handlePlaceOrder = () => {
    soundFx.playClick();
    setShowBill(true);
    setScratched(false);
  };

  const handleScratch = () => {
    soundFx.playBlowCandles();
    setScratched(true);
  };

  const subtotal = calculateSubtotal();

  return (
    <section className="relative min-h-screen py-24 px-4 bg-[#FAF7F2] paper-texture flex flex-col items-center justify-center">
      <div className="max-w-4xl mx-auto w-full text-center space-y-10">
        
        {/* App Header */}
        <ScrollReveal direction="down">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 bg-rose-100 border border-rose-300 text-rose-900 px-4 py-1.5 rounded-full text-xs font-mono font-bold shadow-sm">
              <Coffee className="w-3.5 h-3.5" /> KAI'S BIRTHDAY CAFÉ
            </div>

            <h2 className="text-4xl sm:text-6xl font-serif font-extrabold text-slate-900 tracking-tight">
              Kai Birthday Café
            </h2>

            <p className="text-sm sm:text-base font-mono uppercase tracking-wider text-rose-500 font-semibold">
              Open Exclusively on 20 August
            </p>
            <p className="text-xs text-slate-500 font-serif italic">
              "Birthday calories don't count. Scientific evidence: absolutely none. 😂"
            </p>
          </div>
        </ScrollReveal>

        {/* Ordering Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
          {menu.map((item, idx) => {
            const isSelected = cart.includes(item.id);
            return (
              <ScrollReveal key={item.id} direction="up" delay={idx * 0.08}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => toggleItem(item.id)}
                  className={`bg-white rounded-2xl overflow-hidden border cursor-pointer transition-all duration-300 shadow-md relative flex flex-col justify-between ${
                    isSelected
                      ? 'border-rose-400 ring-2 ring-rose-400/40 shadow-xl'
                      : 'border-slate-200 hover:border-rose-300'
                  }`}
                >
                  <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-mono px-2.5 py-1 rounded-full font-bold">
                      {item.tag}
                    </div>

                    <button
                      className={`absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-md ${
                        isSelected ? 'bg-rose-500 text-white scale-110' : 'bg-white/90 text-slate-400'
                      }`}
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif font-bold text-base text-slate-900 leading-snug">
                        {item.name}
                      </h3>
                      <p className="text-xs text-rose-500 font-medium">
                        {item.subtitle}
                      </p>
                      <p className="text-xs text-slate-500 mt-1 italic font-serif leading-relaxed">
                        "{item.desc}"
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                      <span className="font-mono font-extrabold text-sm text-slate-900">
                        ₱{item.price.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                      </span>
                      <span className={`text-xs font-bold font-mono px-3 py-1 rounded-full ${
                        isSelected ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {isSelected ? 'Added ✓' : '+ Add'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Place Order Drawer & Button */}
        <ScrollReveal direction="up" delay={0.4}>
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200 max-w-md mx-auto space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
                <ShoppingCart className="w-4 h-4 text-rose-500" /> Birthday Order ({cart.length})
              </span>
              <span className="font-mono font-extrabold text-base text-slate-900">
                Subtotal: ₱{subtotal.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
              </span>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={cart.length === 0}
              className="w-full py-3.5 bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-extrabold rounded-xl text-sm transition-all shadow-lg hover:shadow-xl hover:scale-102 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Receipt className="w-4 h-4" />
              <span>Place Birthday Order & Generate Bill 🧾</span>
            </button>
          </div>
        </ScrollReveal>

        {/* Bill Receipt & Scratchcard Animation Modal */}
        <AnimatePresence>
          {showBill && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowBill(false)}
              className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm p-4 flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0.9, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 30 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative space-y-6 text-left border border-slate-200"
              >
                <div className="text-center border-b border-dashed border-slate-300 pb-4 space-y-1">
                  <span className="text-2xl">🧾</span>
                  <h3 className="font-serif font-extrabold text-xl text-slate-900">
                    KAI BIRTHDAY CAFÉ RECEIPT
                  </h3>
                  <p className="text-[11px] font-mono text-slate-400 uppercase tracking-widest">
                    Order #20082026 • August 20
                  </p>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  {cart.map((id) => {
                    const item = menu.find((m) => m.id === id);
                    if (!item) return null;
                    return (
                      <div key={id} className="flex justify-between text-slate-700">
                        <span>{item.emoji} {item.name}</span>
                        <span className="font-bold">₱{item.price.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 border-t border-dashed border-slate-300 space-y-4">
                  <div className="flex justify-between items-center font-mono">
                    <span className="text-xs uppercase text-slate-500 font-bold">Total Bill:</span>
                    <span className={`text-xl font-extrabold ${scratched ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                      ₱{subtotal.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                    </span>
                  </div>

                  {!scratched ? (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleScratch}
                      className="w-full py-4 bg-gradient-to-r from-amber-400 via-rose-400 to-amber-400 text-slate-950 font-extrabold rounded-xl text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 border border-amber-300 animate-pulse cursor-pointer"
                    >
                      <Tag className="w-4 h-4" />
                      <span>✨ Scratch to Reveal Birthday Discount ✨</span>
                    </motion.button>
                  ) : (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="bg-emerald-50 border-2 border-dashed border-emerald-400 p-4 rounded-xl text-center space-y-2"
                    >
                      <span className="inline-block bg-emerald-500 text-white font-mono text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full">
                        PROMO APPLIED: KAI100
                      </span>
                      <div className="text-3xl font-extrabold font-mono text-emerald-600">
                        ₱0.00 FREE 🎉
                      </div>
                      <p className="text-xs font-serif italic text-emerald-800 font-semibold">
                        "100% OFF because it's your special day! ❤️"
                      </p>
                    </motion.div>
                  )}
                </div>

                <div className="pt-2 text-center">
                  <button
                    onClick={() => setShowBill(false)}
                    className="text-xs font-mono text-slate-500 hover:text-slate-800 underline cursor-pointer"
                  >
                    Close Receipt
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
