'use client';

import { motion } from 'framer-motion';
import CodeShowcase from '../CodeShowcase';

interface HeroSectionProps {
  y1: any;
  y2: any;
}

export default function HeroSection({ y1, y2 }: HeroSectionProps) {
  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: 'easeOut' }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-accent-hover/5"></div>
      <motion.div
        className="container-width section-padding relative z-10"
        style={{ y: y1 }}
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-8"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div variants={fadeInUp}>
              <h1 className="text-hero text-balance sm:mt-0 mt-14">
                Software that <span className="gradient-text">just works</span>
              </h1>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <p className="text-large text-muted-foreground text-balance max-w-2xl">
                We're a lean Sri Lankan software development agency. No bloated processes, no complexity.
                Just high-quality web apps, mobile solutions, and integrated systems that scale.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                className="btn-primary hover-glow"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('contact')}
              >
                Start Your Project
              </motion.button>
              <motion.button
                className="btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('pricing')}
              >
                View Pricing
              </motion.button>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex items-center space-x-8 pt-8"
            >
              {[
                { value: '50+', label: 'Projects Delivered' },
                { value: '99%', label: 'Client Satisfaction' },
                { value: '<1s', label: 'Page Load Time' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center w-full"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="relative"
            style={{ y: y2 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="glass p-8 rounded-3xl hover-lift"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-12"
                >
                  <CodeShowcase />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
} 