'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '../../providers/TranslationProvider';

interface FloatingActionButtonProps {
  onBookMeeting: () => void;
}

export default function FloatingActionButton({ onBookMeeting }: FloatingActionButtonProps) {
  const { t } = useTranslation();

  return (
    <motion.button
      className="fixed bottom-8 right-8 w-16 h-16 bg-accent text-white rounded-full shadow-lg flex items-center justify-center cursor-pointer z-40"
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.9 }}
      onClick={onBookMeeting}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 300 }}
      title={t('floatingActionButton.tooltip')}
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    </motion.button>
  );
} 