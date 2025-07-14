'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '../../providers/TranslationProvider';
import { PRICING_PLANS, ANIMATION_VARIANTS } from '../../lib/constants';

interface PricingSectionProps {
  onBookMeeting: () => void;
}

export default function PricingSection({ onBookMeeting }: PricingSectionProps) {
  const { t } = useTranslation();

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
          <h2 className="text-section">{t('pricing.title')}</h2>
          <p className="text-large text-muted-foreground max-w-2xl mx-auto text-balance">
            {t('pricing.subtitle')}
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={ANIMATION_VARIANTS.staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {PRICING_PLANS.map((plan, index) => (
            <motion.div
              key={index}
              variants={ANIMATION_VARIANTS.fadeInUp}
              className={`glass-subtle p-8 rounded-3xl hover-lift relative ${
                plan.featured ? 'ring-2 ring-accent' : ''
              }`}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              {plan.featured && (
                <motion.div
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-accent text-white px-4 py-1 rounded-full text-sm font-medium"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {t('pricing.mostPopular')}
                </motion.div>
              )}

              <div className="text-center space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{t(plan.titleKey)}</h3>
                  <p className="text-muted-foreground text-sm">{t(plan.descriptionKey)}</p>
                </div>

                <div>
                  <div className="text-3xl font-bold">
                    {plan.price === 'Custom' ? t('pricing.custom') : `$${plan.price}`}
                  </div>
                  {plan.price !== 'Custom' && (
                    <div className="text-sm text-muted-foreground">{t('pricing.perMonth')}</div>
                  )}
                </div>

                <ul className="space-y-3 text-left">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <motion.div
                        className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center"
                        whileHover={{ scale: 1.2 }}
                      >
                        <svg className="w-3 h-3 text-accent" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </motion.div>
                      <span className="text-sm">{t(feature)}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  className={`w-full py-3 px-6 rounded-2xl font-medium transition-all ${
                    plan.featured
                      ? 'bg-accent text-white hover:bg-accent-hover'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onBookMeeting}
                >
                  {t('pricing.getStarted')}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 