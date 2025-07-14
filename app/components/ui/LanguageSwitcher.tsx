'use client';

import { useTranslation } from '../../providers/TranslationProvider';
import { Globe } from 'lucide-react';

const LANGUAGE_CODES = {
  en: 'EN',
  si: 'SI',
  ta: 'TA',
} as const;

interface LanguageSwitcherProps {
  iconOnly?: boolean;
}

export default function LanguageSwitcher({ iconOnly = false }: LanguageSwitcherProps) {
  const { currentLanguage, setLanguage, availableLanguages } = useTranslation();

  // Cycle to next language
  const handleSwitch = () => {
    const idx = availableLanguages.indexOf(currentLanguage);
    const nextIdx = (idx + 1) % availableLanguages.length;
    setLanguage(availableLanguages[nextIdx]);
  };

  return (
    <button
      className={iconOnly
        ? "flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-all text-xl shadow-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
        : "flex items-center space-x-1 px-2 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-all cursor-pointer text-sm font-semibold"
      }
      onClick={handleSwitch}
      title="Change language"
      aria-label="Change language"
      type="button"
    >
      <Globe className={iconOnly ? "w-5 h-5" : "w-4 h-4"} aria-label="Language" />
      {!iconOnly && <span>{LANGUAGE_CODES[currentLanguage]}</span>}
    </button>
  );
} 