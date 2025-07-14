'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface CustomDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
}

export default function CustomDropdown({ value, onChange, options, placeholder }: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <motion.button
        type="button"
        className={`w-full px-4 py-3 rounded-2xl border bg-background/50 focus:outline-none focus:ring-2 focus:ring-accent transition-all cursor-pointer text-left flex items-center justify-between ${value ? 'border-border' : 'border-border'
          }`}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <span className={value ? 'text-foreground' : 'text-muted-foreground'}>
          {value ? options.find(opt => opt.value === value)?.label : placeholder}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          ▼
        </motion.span>
      </motion.button>

      {isOpen && (
        <motion.div
          className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-2xl shadow-lg z-10 overflow-hidden"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {options.map((option, index) => (
            <motion.button
              key={option.value}
              type="button"
              className="w-full px-4 py-3 text-left hover:bg-accent/10 transition-colors cursor-pointer first:rounded-t-2xl last:rounded-b-2xl"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              whileHover={{ backgroundColor: 'rgba(99, 102, 241, 0.1)' }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              {option.label}
            </motion.button>
          ))}
        </motion.div>
      )}
    </div>
  );
} 