import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Flame, Activity } from 'lucide-react';
import { ScrollReveal } from '../ScrollReveal';

interface GymSceneProps {
  onNext?: () => void;
}

export const GymScene: React.FC<GymSceneProps> = () => {
  return (
    <section className="relative min-h-screen py-24 px-4 bg-[#1E293B] text-white flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background Accent Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full text-center space-y-12 relative z-10">
        
        {/* Title */}
        <ScrollReveal direction="down">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono tracking-widest uppercase bg-sky-500/20 border border-sky-400/30 px-4 py-1.5 rounded-full text-sky-300 shadow-lg">
              <Dumbbell className="w-3.5 h-3.5" /> Early Morning Routine
            </span>

            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
              The Gym Girl Training Log 🏋️‍♀️
            </h2>

            <p className="text-sm sm:text-base text-slate-400 italic font-serif max-w-lg mx-auto">
              "Gym mornings, consistency, and showing up every single day."
            </p>
          </div>
        </ScrollReveal>

        {/* Gym Photo & Training Log Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-3xl mx-auto text-left">
          
          {/* Gym Photo */}
          <ScrollReveal direction="left" delay={0.2}>
            <motion.div
              whileHover={{ rotate: 1, scale: 1.03 }}
              className="polaroid bg-white text-kai-charcoal shadow-2xl rotate-[-2deg]"
            >
              <div className="aspect-[4/5] overflow-hidden rounded">
                <img
                  src="/img/kai-gym.png"
                  alt="Kai at the Gym"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <p className="font-handwritten text-2xl text-center mt-3 text-kai-charcoal font-bold flex items-center justify-center gap-1">
                No days off <Flame className="w-5 h-5 text-orange-500 fill-orange-500 inline" />
              </p>
            </motion.div>
          </ScrollReveal>

          {/* Training Log Dashboard Card */}
          <ScrollReveal direction="right" delay={0.3}>
            <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-6 border border-slate-700 shadow-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-serif font-bold text-base text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-sky-400" />
                  KAI'S FITNESS LOG
                </h3>
                <span className="text-[10px] font-mono text-slate-400 uppercase bg-slate-800 px-2.5 py-1 rounded-full">
                  Verified
                </span>
              </div>

              <div className="space-y-4 font-sans text-xs">
                <div>
                  <div className="flex justify-between text-slate-300 font-medium mb-1">
                    <span>Morning Gym Consistency</span>
                    <span className="text-sky-400 font-bold">100%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-sky-500 to-emerald-400 w-[100%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 font-medium mb-1">
                    <span>Stiffness Recovery (Home Workouts)</span>
                    <span className="text-emerald-400 font-bold font-mono">Active</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-300 w-[85%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 font-medium mb-1">
                    <span>Resting</span>
                    <span className="text-amber-400 font-bold font-mono">30%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-500 to-rose-400 w-[30%]" />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 bg-slate-950/40 p-3 rounded-xl border border-slate-800 text-xs font-mono text-amber-300">
                <span className="font-bold block text-rose-400 mb-0.5">⚠️ DIAGNOSIS:</span>
                "You may actually enjoy suffering. 😂"
              </div>
            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
};
