'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container-width section-padding">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <motion.div
            className="flex items-center space-x-3 group"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div className="relative">
              <motion.img
                src="/logo.png"
                alt="Neqo360"
                className="w-8 h-8 object-contain cursor-pointer"
                whileHover={{
                  rotate: [0, 10, -10, 0],
                  y: [0, -2, 0]
                }}
                transition={{ duration: 0.6 }}
              />
              {/* Mini rocket fire on hover */}
              <motion.div
                className="absolute bottom-1 left-1/4 transform rotate-[40deg] -translate-x-1/2 opacity-0 group-hover:opacity-100"
              >
                <motion.div
                  className="w-0.5 h-2 bg-gradient-to-b from-orange-400 to-transparent rounded-full"
                  animate={{
                    height: [4, 8, 4],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 0.4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </motion.div>
            <span className="font-semibold">Neqo360</span>
          </motion.div>

          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <span>© 2025 Neqo360</span>
          </div>
        </div>
      </div>
    </footer>
  );
} 