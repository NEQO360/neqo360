'use client';

import React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../../providers/TranslationProvider';
import { TIME_SLOTS, MONTH_NAMES, DAY_NAMES } from '../../lib/constants';
import { getDaysInMonth, isDateAvailable, formatDate } from '../../lib/utils';

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    email: string;
    phone: string;
    message: string;
    date: Date;
    time: string;
  }) => void;
  isSubmitting: boolean;
}

function CalendarModal({ isOpen, onClose, onSubmit, isSubmitting }: CalendarModalProps) {
  const { t } = useTranslation();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const days = getDaysInMonth(currentDate);

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleDateSelect = (date: Date) => {
    if (isDateAvailable(date)) {
      setSelectedDate(date);
      setSelectedTime('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDate && selectedTime) {
      onSubmit({
        ...formData,
        date: selectedDate,
        time: selectedTime
      });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-background rounded-3xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">{t('calendar.title')}</h2>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">{t('calendar.name')}</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 rounded-2xl border border-border focus:border-accent transition-colors"
                  placeholder={t('calendar.namePlaceholder')}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{t('calendar.email')}</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 rounded-2xl border border-border focus:border-accent transition-colors"
                  placeholder={t('calendar.emailPlaceholder')}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{t('calendar.phone')}</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-3 rounded-2xl border border-border focus:border-accent transition-colors"
                  placeholder={t('calendar.phonePlaceholder')}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{t('calendar.message')}</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-3 rounded-2xl border border-border focus:border-accent transition-colors resize-none"
                  placeholder={t('calendar.messagePlaceholder')}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{t('calendar.selectDate')}</label>
                <div className="border border-border rounded-2xl p-4">
                  <div className="flex justify-between items-center mb-4">
                    <button
                      type="button"
                      onClick={prevMonth}
                      className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80"
                    >
                      ←
                    </button>
                    <h3 className="font-semibold">
                      {MONTH_NAMES[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </h3>
                    <button
                      type="button"
                      onClick={nextMonth}
                      className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80"
                    >
                      →
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {DAY_NAMES.map(day => (
                      <div key={day} className="text-center text-sm text-muted-foreground py-2">
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {days.map((date, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => date && handleDateSelect(date)}
                        disabled={!date || !isDateAvailable(date)}
                        className={`w-8 h-8 rounded-full text-sm transition-colors ${
                          !date || !isDateAvailable(date)
                            ? 'text-muted-foreground/30 cursor-not-allowed'
                            : selectedDate && date && selectedDate.toDateString() === date.toDateString()
                            ? 'bg-accent text-white'
                            : 'hover:bg-muted'
                        }`}
                      >
                        {date?.getDate()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {selectedDate && (
                <div>
                  <label className="block text-sm font-medium mb-2">{t('calendar.selectTime')}</label>
                  <div className="grid grid-cols-2 gap-2">
                    {TIME_SLOTS.map(time => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`py-2 px-4 rounded-xl text-sm transition-colors ${
                          selectedTime === time
                            ? 'bg-accent text-white'
                            : 'bg-muted hover:bg-muted/80'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <motion.button
                type="submit"
                disabled={!selectedDate || !selectedTime || isSubmitting}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? t('calendar.scheduling') : t('calendar.schedule')}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default React.memo(CalendarModal); 