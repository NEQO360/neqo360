'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../../providers/TranslationProvider';

const LANGUAGE_NAMES = {
  en: 'English',
  si: 'සිංහල',
  ta: 'தமிழ்',
} as const;

export default function LanguageSwitcher() {
  const { currentLanguage, setLanguage, availableLanguages } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <motion.button
        className="flex items-center space-x-2 px-3 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-sm font-medium">{LANGUAGE_NAMES[currentLanguage]}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          ▼
        </motion.span>
      </motion.button>

      {isOpen && (
        <motion.div
          className="absolute top-full right-0 mt-2 bg-background border border-border rounded-2xl shadow-lg z-10 overflow-hidden min-w-[120px]"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {availableLanguages.map((language) => (
            <motion.button
              key={language}
              className={`w-full px-4 py-3 text-left hover:bg-accent/10 transition-colors cursor-pointer ${
                currentLanguage === language ? 'bg-accent/20 text-accent' : ''
              }`}
              onClick={() => {
                setLanguage(language);
                setIsOpen(false);
              }}
              whileHover={{ backgroundColor: 'rgba(99, 102, 241, 0.1)' }}
            >
              {LANGUAGE_NAMES[language]}
            </motion.button>
          ))}
        </motion.div>
      )}
    </div>
  );
} 