'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

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

export default function CalendarModal({ isOpen, onClose, onSubmit, isSubmitting }: CalendarModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [meetingForm, setMeetingForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const isDateAvailable = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dayOfWeek = date.getDay();
    return date >= today && dayOfWeek !== 0 && dayOfWeek !== 6; // Not Sunday or Saturday
  };

  const handleMeetingSubmit = () => {
    if (!selectedDate || !selectedTime || !meetingForm.name || !meetingForm.email) {
      alert('Please fill in all required fields');
      return;
    }

    onSubmit({
      ...meetingForm,
      date: selectedDate,
      time: selectedTime
    });
  };

  const handleClose = () => {
    setSelectedDate(null);
    setSelectedTime('');
    setMeetingForm({ name: '', email: '', phone: '', message: '' });
    setCurrentMonth(new Date());
    onClose();
  };

  if (!isOpen) return null;

  const days = getDaysInMonth(currentMonth);
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleClose}
    >
      <motion.div
        className="glass max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-3xl p-6 modal-scrollbar"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Schedule a Meeting</h2>
          <motion.button
            className="w-8 h-8 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center cursor-pointer hover:bg-red-500/30"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleClose}
          >
            ✕
          </motion.button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calendar */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Choose Date</h3>
              <div className="flex items-center space-x-2">
                <motion.button
                  className="p-2 rounded-full hover:bg-white/10 cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                >
                  ←
                </motion.button>
                <span className="font-medium min-w-[140px] text-center">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </span>
                <motion.button
                  className="p-2 rounded-full hover:bg-white/10 cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                >
                  →
                </motion.button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {days.map((day, index) => {
                if (!day) return <div key={index} />;

                const isAvailable = isDateAvailable(day);
                const isSelected = selectedDate?.toDateString() === day.toDateString();

                return (
                  <motion.button
                    key={day.toDateString()}
                    className={`p-3 rounded-xl text-sm font-medium cursor-pointer transition-all ${isSelected
                      ? 'bg-accent text-white shadow-lg'
                      : isAvailable
                        ? 'hover:bg-accent/20 hover:scale-110'
                        : 'text-muted-foreground/50 cursor-not-allowed'
                      }`}
                    whileHover={isAvailable ? { scale: 1.1 } : {}}
                    whileTap={isAvailable ? { scale: 0.95 } : {}}
                    onClick={() => isAvailable && setSelectedDate(day)}
                    disabled={!isAvailable}
                  >
                    {day.getDate()}
                  </motion.button>
                );
              })}
            </div>

            {/* Time Slots */}
            {selectedDate && (
              <motion.div
                className="mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h4 className="font-semibold mb-3">Available Times</h4>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    <motion.button
                      key={time}
                      className={`p-3 rounded-xl text-sm font-medium cursor-pointer transition-all ${selectedTime === time
                        ? 'bg-accent text-white shadow-lg'
                        : 'bg-white/10 hover:bg-accent/20 hover:scale-105'
                        }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Form */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Your Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name *</label>
                <input
                  type="text"
                  value={meetingForm.name}
                  onChange={(e) => setMeetingForm({ ...meetingForm, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <input
                  type="email"
                  value={meetingForm.email}
                  onChange={(e) => setMeetingForm({ ...meetingForm, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <input
                  type="tel"
                  value={meetingForm.phone}
                  onChange={(e) => setMeetingForm({ ...meetingForm, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                  placeholder="+94 xxx xxx xxx"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  value={meetingForm.message}
                  onChange={(e) => setMeetingForm({ ...meetingForm, message: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 rounded-2xl border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                  placeholder="What would you like to discuss?"
                />
              </div>

              {selectedDate && selectedTime && (
                <motion.div
                  className="bg-accent/10 p-4 rounded-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <h4 className="font-semibold mb-2">Meeting Summary</h4>
                  <p className="text-sm text-muted-foreground">
                    📅 {selectedDate.toDateString()}<br />
                    🕐 {selectedTime}<br />
                    ⏱️ Duration: 30 minutes
                  </p>
                </motion.div>
              )}

              <motion.button
                className="w-full btn-primary hover-glow cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: selectedDate && selectedTime ? 1.02 : 1 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleMeetingSubmit}
                disabled={!selectedDate || !selectedTime || isSubmitting}
              >
                {isSubmitting ? 'Booking...' : 'Book Meeting'}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
} 