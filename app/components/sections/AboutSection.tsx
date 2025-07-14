'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '../../providers/TranslationProvider';
import { ABOUT_FEATURES, SITE_CONFIG } from '../../lib/constants';
import { Rocket, Target, BarChart2, Hand, Zap } from 'lucide-react';

export default function AboutSection() {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-20 sm:py-24" style={{ background: 'var(--section-about-bg, var(--muted))' }}>
      <div className="container-width section-padding flex flex-col gap-12">
        {/* Friendly Company Introduction */}
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-section mb-4">{t('about.title')}</h2>
          <p className="text-lg text-muted-foreground">
            Welcome to <span className="font-semibold text-accent">{SITE_CONFIG.name}</span>, a new digital studio passionate about building modern, scalable, and delightful web experiences. We’re a small, ambitious team working with early clients and growing our portfolio. Our mission: <span className="italic">to help you launch, scale, and succeed online</span>.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto w-full">
          {ABOUT_FEATURES.map((item, index) => (
            <motion.div
              key={index}
              className="flex items-start space-x-4 glass rounded-2xl shadow-md p-6"
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
                {item.icon === 'Rocket' && <Rocket className="w-5 h-5 text-white" />}
                {item.icon === 'Target' && <Target className="w-5 h-5 text-white" />}
                {item.icon === 'BarChart2' && <BarChart2 className="w-5 h-5 text-white" />}
                {item.icon === 'Hand' && <Hand className="w-5 h-5 text-white" />}
              </motion.div>
              <div>
                <h3 className="font-semibold mb-2">{t(item.titleKey)}</h3>
                <p className="text-muted-foreground">{t(item.descriptionKey)}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightning Fast Card
        <motion.div
          className="max-w-lg mx-auto w-full"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <motion.div
            className="glass p-8 rounded-3xl w-full"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="space-y-6">
              <div className="text-center">
                <motion.div
                  className="mb-2 flex justify-center"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Zap className="w-8 h-8 text-accent" />
                </motion.div>
                <h3 className="font-semibold">{t('about.lightningFast')}</h3>
                <p className="text-sm text-muted-foreground">{t('about.subSecondLoad')}</p>
              </div>
              <div className="border-t border-border pt-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <div className="text-2xl font-bold gradient-text">99.9%</div>
                    <div className="text-xs text-muted-foreground">{t('about.uptime')}</div>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <div className="text-2xl font-bold gradient-text">24/7</div>
                    <div className="text-xs text-muted-foreground">{t('about.support')}</div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div> */}

        {/* Call to Action */}
        <motion.div
          className="max-w-xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="text-lg font-semibold text-accent mb-2">Let’s build something great together.</div>
          <div className="text-muted-foreground mb-4">We’re open for new projects and collaborations. <br />Reach out and let’s make your idea a reality!</div>
          <a
            href="#contact"
            className="inline-block rounded-full bg-gradient-to-r from-accent to-accent-hover text-white px-8 py-3 font-semibold shadow-md hover:from-accent-hover hover:to-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 transition"
          >
            Start a Project
          </a>
        </motion.div>
      </div>
    </section>
  );
} 