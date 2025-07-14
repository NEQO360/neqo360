'use client';

import { motion } from 'framer-motion';
import SpiderWebPricing from '../SpiderWebPricing';

interface PricingSectionProps {
  onBookMeeting: () => void;
}

export default function PricingSection({ onBookMeeting }: PricingSectionProps) {
  return (
    <section id="pricing" className="py-24">
      <div className="container-width section-padding">
        <motion.div
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-section">Build your solution</h2>
          <p className="text-large text-muted-foreground max-w-2xl mx-auto text-balance">
            Interactive pricing that adapts to your needs. Click, explore, and build your perfect solution.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <SpiderWebPricing />
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-muted-foreground mb-4">
            Need something not shown in the web? Let's discuss your custom requirements.
          </p>
          <motion.button
            className="btn-secondary relative group overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBookMeeting}
          >
            <span className="relative z-10">Schedule a Free Consultation</span>

            {/* Mini logo animation on button */}
            <motion.div
              className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100"
              initial={{ x: 20, opacity: 0 }}
              whileHover={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.img
                src="/logo.png"
                alt=""
                className="w-5 h-5 object-contain"
                animate={{
                  rotate: [0, 10, -10, 0],
                  y: [0, -1, 0]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              {/* Mini rocket trail */}
              <motion.div
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
              >
                <motion.div
                  className="w-0.5 h-1 bg-gradient-to-b from-accent to-transparent rounded-full"
                  animate={{
                    height: [1, 3, 1],
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
} 