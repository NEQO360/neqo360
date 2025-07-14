'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
  isLoading?: boolean;
}

export default function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'info',
  isLoading = false
}: ConfirmationDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstButtonRef = useRef<HTMLButtonElement>(null);

  // Focus management
  useEffect(() => {
    if (isOpen && firstButtonRef.current) {
      setTimeout(() => {
        firstButtonRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const variantStyles = {
    danger: {
      icon: (
        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      ),
      confirmButton: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
      iconBg: 'bg-red-100'
    },
    warning: {
      icon: (
        <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      ),
      confirmButton: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500',
      iconBg: 'bg-yellow-100'
    },
    info: {
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      confirmButton: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
      iconBg: 'bg-blue-100'
    }
  };

  const styles = variantStyles[variant];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
          aria-describedby="dialog-message"
        >
          <motion.div
            ref={dialogRef}
            className="bg-background rounded-2xl p-6 max-w-md w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start space-x-4">
              <div className={`w-12 h-12 rounded-full ${styles.iconBg} flex items-center justify-center flex-shrink-0`}>
                {styles.icon}
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 id="dialog-title" className="text-lg font-semibold text-foreground mb-2">
                  {title}
                </h3>
                <p id="dialog-message" className="text-muted-foreground mb-6">
                  {message}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                  <button
                    ref={firstButtonRef}
                    onClick={onClose}
                    disabled={isLoading}
                    className="btn-secondary order-2 sm:order-1"
                    aria-label="Cancel action"
                  >
                    {cancelText}
                  </button>
                  <button
                    onClick={onConfirm}
                    disabled={isLoading}
                    className={`btn-primary ${styles.confirmButton} order-1 sm:order-2`}
                    aria-label="Confirm action"
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Processing...</span>
                      </div>
                    ) : (
                      confirmText
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Hook for easy confirmation dialog usage
export function useConfirmationDialog() {
  const [dialogState, setDialogState] = React.useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    variant?: 'danger' | 'warning' | 'info';
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });

  const showConfirmation = (
    title: string,
    message: string,
    onConfirm: () => void,
    variant: 'danger' | 'warning' | 'info' = 'info'
  ) => {
    setDialogState({
      isOpen: true,
      title,
      message,
      onConfirm,
      variant,
    });
  };

  const hideConfirmation = () => {
    setDialogState(prev => ({ ...prev, isOpen: false }));
  };

  const handleConfirm = () => {
    dialogState.onConfirm();
    hideConfirmation();
  };

  return {
    showConfirmation,
    hideConfirmation,
    dialogProps: {
      isOpen: dialogState.isOpen,
      onClose: hideConfirmation,
      onConfirm: handleConfirm,
      title: dialogState.title,
      message: dialogState.message,
      variant: dialogState.variant,
    },
  };
} 