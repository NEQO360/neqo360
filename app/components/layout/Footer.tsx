'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslation } from '../../providers/TranslationProvider';
import { SITE_CONFIG } from '../../lib/constants';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="container-width section-padding py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <Image
                src="/logo.png"
                alt={SITE_CONFIG.name}
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-xl font-bold">{SITE_CONFIG.name}</span>
            </div>
            <p className="text-muted-foreground text-sm">
              {t('footer.tagline')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center md:text-left"
          >
            <h3 className="font-semibold mb-4">{t('footer.services')}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>{t('footer.webApps')}</li>
              <li>{t('footer.mobileApps')}</li>
              <li>{t('footer.systemIntegration')}</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center md:text-right"
          >
            <h3 className="font-semibold mb-4">{t('footer.contact')}</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>{SITE_CONFIG.email}</p>
              <p>{t('contact.contactInfo.location')}</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="border-t border-border mt-8 pt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-sm text-muted-foreground">
            {t('footer.copyright')} • {t('footer.rightsReserved')}
          </p>
        </motion.div>
      </div>
    </footer>
  );
} 