'use client';

import { motion } from 'framer-motion';

export default function AboutSection() {
  const features = [
    {
      emoji: '🚀',
      title: 'Execution Focused',
      description: 'We ship fast. No endless meetings or bureaucracy. Just results.'
    },
    {
      emoji: '🎯',
      title: 'Tech Agnostic',
      description: 'Right tool for the job. We adapt to your needs, not the other way around.'
    },
    {
      emoji: '📈',
      title: 'Built to Scale',
      description: 'Every solution is designed with growth in mind. Start small, scale big.'
    },
    {
      emoji: '🐱',
      title: 'Human Touch',
      description: 'We believe in genuine connections. Like cats, we\'re independent but loyal.'
    }
  ];

  return (
    <section id="about" className="py-24 bg-muted/30">
      <div className="container-width section-padding">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-section">Why choose Neqo360?</h2>

            <div className="space-y-6">
              {features.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 10 }}
                >
                  <motion.div
                    className="w-8 h-8 rounded-full gradient-accent flex items-center justify-center flex-shrink-0 mt-1"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span className="text-white text-sm">{item.emoji}</span>
                  </motion.div>
                  <div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="glass p-8 rounded-3xl"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="space-y-6">
                <div className="text-center">
                  <motion.div
                    className="text-4xl mb-2"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    ⚡
                  </motion.div>
                  <h3 className="font-semibold">Lightning Fast</h3>
                  <p className="text-sm text-muted-foreground">Sub-second load times</p>
                </div>

                <div className="border-t border-border pt-6">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                    >
                      <div className="text-2xl font-bold gradient-text">99.9%</div>
                      <div className="text-xs text-muted-foreground">Uptime</div>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                    >
                      <div className="text-2xl font-bold gradient-text">24/7</div>
                      <div className="text-xs text-muted-foreground">Support</div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 