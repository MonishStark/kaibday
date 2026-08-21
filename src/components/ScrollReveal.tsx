import React from 'react';
import { motion } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'zoom' | 'rotate';
  delay?: number;
  duration?: number;
  className?: string;
  amount?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  className = '',
  amount = 0.2,
}) => {
  const getVariants = () => {
    switch (direction) {
      case 'up':
        return {
          hidden: { opacity: 0, y: 50, scale: 0.98 },
          visible: { opacity: 1, y: 0, scale: 1 },
        };
      case 'down':
        return {
          hidden: { opacity: 0, y: -50, scale: 0.98 },
          visible: { opacity: 1, y: 0, scale: 1 },
        };
      case 'left':
        return {
          hidden: { opacity: 0, x: -60, rotate: -2 },
          visible: { opacity: 1, x: 0, rotate: 0 },
        };
      case 'right':
        return {
          hidden: { opacity: 0, x: 60, rotate: 2 },
          visible: { opacity: 1, x: 0, rotate: 0 },
        };
      case 'zoom':
        return {
          hidden: { opacity: 0, scale: 0.85 },
          visible: { opacity: 1, scale: 1 },
        };
      case 'rotate':
        return {
          hidden: { opacity: 0, scale: 0.9, rotate: -6 },
          visible: { opacity: 1, scale: 1, rotate: 0 },
        };
      default:
        return {
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0 },
        };
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // Smooth custom cubic bezier
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
