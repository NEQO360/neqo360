'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface FloatingActionButtonProps {
  onBookMeeting: () => void;
}

export default function FloatingActionButton({ onBookMeeting }: FloatingActionButtonProps) {
  const rocketSymbols = ['</>', '{ }', '[ ]', '( )', '/* */', '=>', ':'];
  const sizeClasses = ['text-xs', 'text-sm', 'text-base', 'text-lg'];

  const rocketParticles = useMemo(() =>
    Array.from({ length: 8 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      deltaX: Math.random() * 300 - 150,
      deltaY: Math.random() * 300 - 150,
      duration: 10 + Math.random() * 5,
      delay: Math.random() * 4,
      symbol: rocketSymbols[Math.floor(Math.random() * rocketSymbols.length)],
      size: sizeClasses[Math.floor(Math.random() * sizeClasses.length)] as string,
    })),
    []);

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-40"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 300 }}
    >
      <motion.button
        className="w-16 h-16 bg-gradient-to-r from-accent to-accent-hover rounded-full text-white shadow-2xl flex items-center justify-center cursor-pointer group relative overflow-hidden"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        onClick={onBookMeeting}
        animate={{
          boxShadow: [
            "0 10px 30px rgba(99, 102, 241, 0.3)",
            "0 15px 40px rgba(99, 102, 241, 0.5)",
            "0 10px 30px rgba(99, 102, 241, 0.3)"
          ]
        }}
        transition={{
          boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        {/* Logo */}
        <motion.img
          src="/logo.png"
          alt="Book Meeting"
          className="w-8 h-8 object-contain relative z-10 cursor-pointer"
          animate={{
            rotate: [0, 5, -5, 0],
            y: [0, -1, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Rocket fire trails */}
        <motion.div
          className="absolute bottom-2.5 left-5 transform rotate-[40deg] opacity-60 z-10"
        >
          {rocketParticles.map((p, idx) => (
            <motion.div
              key={`rp-${idx}`}
              className={`absolute ${p.size} opacity-30`}
              style={{ left: `${p.left}%`, top: `${p.top}%` }}
              animate={{
                x: [0, p.deltaX, 0],
                y: [0, p.deltaY, 0],
                rotate: [0, 360],
                opacity: [0.1, 0.5, 0.1],
                scale: [0.3, 1.5, 0.3],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: 'easeInOut',
              }}
            >
              {p.symbol}
            </motion.div>
          ))}
        </motion.div>

        {/* Tooltip */}
        <motion.div
          className="absolute -top-14 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg backdrop-blur-sm"
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          whileHover={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          🚀 Let's blast off together!
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90"></div>
        </motion.div>
      </motion.button>
    </motion.div>
  );
} 