'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '../../providers/TranslationProvider';
import { SERVICES, ANIMATION_VARIANTS } from '../../lib/constants';

const getServiceIcon = (iconType: string) => {
  switch (iconType) {
    case 'web':
      return (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case 'mobile':
      return (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      );
    case 'integration':
      return (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      );
    default:
      return null;
  }
};

export default function ServicesSection() {
  const { t } = useTranslation();

  return (
    <section id="services" className="py-24 bg-muted/30">
      <div className="container-width section-padding">
        <motion.div
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-section">{t('services.title')}</h2>
          <p className="text-large text-muted-foreground max-w-2xl mx-auto text-balance">
            {t('services.subtitle')}
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={ANIMATION_VARIANTS.staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {SERVICES.map((service, index) => (
            <motion.div
              key={index}
              variants={ANIMATION_VARIANTS.fadeInUp}
              className="glass-subtle p-8 rounded-3xl hover-lift group cursor-pointer"
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <motion.div
                className="w-12 h-12 rounded-2xl gradient-accent flex items-center justify-center mb-6"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {getServiceIcon(service.icon)}
              </motion.div>
              <h3 className="text-xl font-semibold mb-3">{t(service.titleKey)}</h3>
              <p className="text-muted-foreground">{t(service.descriptionKey)}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 