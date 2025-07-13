'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import CodeShowcase from './components/CodeShowcase';

// Form validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  projectType: z.string().min(1, 'Please select a project type'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [meetingForm, setMeetingForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [mounted, setMounted] = useState(false);

  // Hydration safety
  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 200]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const scrollOpacity = useTransform(scrollY, [500, 600], [0, 1]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80; 
      const elementPosition = element.offsetTop - navbarHeight - 20; 
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
  };


  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'pricing', 'about', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus('success');
        reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

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


    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }


    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const isDateAvailable = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dayOfWeek = date.getDay();
    return date >= today && dayOfWeek !== 0 && dayOfWeek !== 6; 
  };

  const handleMeetingSubmit = async () => {
    if (!selectedDate || !selectedTime || !meetingForm.name || !meetingForm.email) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: meetingForm.name,
          email: meetingForm.email,
          date: selectedDate.toDateString(),
          time: selectedTime,
          phone: meetingForm.phone,
          message: meetingForm.message
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setShowCalendar(false);
        setSelectedDate(null);
        setSelectedTime('');
        setMeetingForm({ name: '', email: '', phone: '', message: '' });
        alert(data.message); // Show success message
      } else {
        setSubmitStatus('error');
        alert(data.error || 'Failed to schedule meeting');
      }
    } catch (error) {
      setSubmitStatus('error');
      alert('Failed to schedule meeting. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.5, ease: 'easeOut' }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0
      }
    }
  };

  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Memoize the calendar modal content
  const calendarModalContent = useMemo(() => {
    const days = getDaysInMonth(currentMonth);
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];

    return (
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setShowCalendar(false)}
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
              onClick={() => setShowCalendar(false)}
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
  }, [currentMonth, selectedDate, selectedTime, meetingForm, isSubmitting, setShowCalendar, setCurrentMonth, setSelectedDate, setSelectedTime, setMeetingForm, handleMeetingSubmit]);

  // Custom Dropdown Component (optimized)
  const CustomDropdown = useCallback(({ value, onChange, options, placeholder }: {
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
    placeholder: string;
  }) => {
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
  }, []);



  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Premium Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container-width section-padding">
          <div className="flex items-center justify-between py-2">
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className="relative group logo-container"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {/* Advanced Animated Background */}
                <motion.div
                  className="absolute inset-0 w-12 h-12 rounded-full rocket-trail opacity-0 group-hover:opacity-40 blur-sm -z-10"
                  animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, 360]
                  }}
                  transition={{
                    scale: { duration: 2, repeat: Infinity },
                    rotate: { duration: 6, repeat: Infinity, ease: "linear" }
                  }}
                />

                {/* Orbiting Particles */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={`orbit-${i}`}
                    className="absolute top-1/2 left-1/2 w-1 h-1 opacity-0 group-hover:opacity-60"
                    style={{
                      transformOrigin: '0 0'
                    }}
                    animate={{
                      rotate: [0, 360]
                    }}
                    transition={{
                      duration: 2 + i,
                      repeat: Infinity,
                      ease: "linear",
                      delay: i * 0.5
                    }}
                  >
                    <div
                      className={`w-full h-full rounded-full ${['particle-orange', 'particle-gold', 'particle-red'][i]
                        }`}
                      style={{
                        transform: `translateX(${15 + i * 3}px)`
                      }}
                    />
                  </motion.div>
                ))}

                {/* Logo Container */}
                <div className="relative w-10 h-10 -right-2.5 top-0.5 overflow-visible rounded-xl logo-3d">
                  <motion.img
                    src="/logo.png"
                    alt="Neqo360 - Cat on Rocket"
                    className="w-full h-full object-contain rocket-part cursor-pointer"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      delay: 0.2,
                      type: "spring",
                      stiffness: 500,
                      damping: 15
                    }}
                    whileHover={{
                      y: [0, -3, 0],
                      rotate: [0, 8, -8, 0],
                      scale: [1, 1.05, 1]
                    }}
                  />

                  {/* Advanced Rocket Fire */}
                  <motion.div
                    className="absolute bottom-0 transform -translate-x-1/2 opacity-0 group-hover:opacity-100"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute rounded-full fire-effect"
                        style={{
                          width: `${2 - i * 0.2}px`,
                          background: `linear-gradient(to bottom, ${['#ff6b35', '#f7931e', '#ffd700', '#ff4757', '#ff9500'][i]
                            }, transparent)`,
                          left: `${i * 1.5 - 3}px`,
                          bottom: '-14px'
                        }}
                        animate={{
                          height: [6, 18, 6],
                          opacity: [0.6, 1, 0.6],
                          scaleX: [0.8, 1.4, 0.8],
                        }}
                        transition={{
                          duration: 0.25,
                          repeat: Infinity,
                          delay: i * 0.05,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                  </motion.div>

                  {/* Enhanced Cat Waving with Sparkles */}
                  <motion.div
                    className="absolute w-3 h-3 opacity-0 group-hover:opacity-100"
                  >
                    {/* Main wave effect */}
                    <motion.div
                      className="w-2 h-2 bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 rounded-full blur-sm cat-part"
                      animate={{
                        rotate: [0, 25, -25, 0],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />

                    {/* Floating sparkles */}
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={`sparkle-${i}`}
                        className="absolute w-1 h-1 -right-2.5 top-0.5 bg-yellow-300 rounded-full animate-floating-sparkle"
                        style={{
                          left: `${i * 2}px`,
                          top: `${i * 1}px`
                        }}
                        animate={{
                          y: [0, -15, -25],
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                          rotate: [0, 360]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.3,
                          ease: "easeOut"
                        }}
                      />
                    ))}
                  </motion.div>
                </div>

              </motion.div>
              <div className="flex flex-col">
                <motion.span
                  className="text-xl font-bold tracking-tight"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Neqo360
                </motion.span>
                <motion.span
                  className="text-xs text-muted-foreground font-medium"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Digital Solutions
                </motion.span>
              </div>
            </motion.div>

            <div className="hidden md:flex items-center space-x-1 bg-white/5 rounded-full p-1 backdrop-blur-sm">
              {[
                { id: 'home', label: 'Home' },
                { id: 'services', label: 'Services' },
                { id: 'pricing', label: 'Pricing' },
                { id: 'about', label: 'About' },
                { id: 'contact', label: 'Contact' }
              ].map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${activeSection === item.id
                    ? 'bg-white/20 text-accent shadow-lg'
                    : 'hover:bg-white/10 hover:text-accent'
                    }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + (item.id === 'home' ? 0 : ['services', 'pricing', 'about', 'contact'].indexOf(item.id) + 1) * 0.1 }}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-accent/20 to-accent-hover/20 rounded-full"
                      layoutId="navbar-active"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            <motion.button
              className="btn-primary relative overflow-hidden group px-6 py-3 rounded-md shadow-lg transition-transform focus:outline-none focus:ring-2 focus:ring-accent hover:shadow-xl"
              whileHover={{ scale: 1.07, y: -3 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setShowCalendar(true)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* Button content */}
              <motion.span
                className="relative z-10 flex items-center space-x-2 text-white font-semibold"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
              >
                <span>Book Meeting</span>
              </motion.span>

              {/* Background animation layer */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent-hover to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 180,
                  damping: 18,
                  duration: 0.5,
                }}
                style={{ transformOrigin: "left" }}
              />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Enhanced Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 pb-32">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/2 to-accent-hover/2"></div>
        
        {/* Floating Orbs */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-accent/10 to-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-pink-500/10 to-accent/10 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        <motion.div
          className="container-width section-padding relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-8"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.div 
                variants={fadeInUp}
                className="relative"
              >
                {/* Glowing effect behind text */}
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-accent/10 to-purple-500/10 rounded-3xl blur-2xl opacity-0"
                  animate={{ opacity: [0, 0.3, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <h1 className="text-hero text-balance sm:mt-0 mt-14 relative z-10">
                  Software that <br />
                  <motion.span 
                    className="gradient-text bg-gradient-to-r from-accent via-purple-500 to-pink-500 bg-clip-text text-transparent"
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{
                      backgroundSize: '200% 200%'
                    }}
                  >
                    just works.
                  </motion.span>
                </h1>
              </motion.div>

              <motion.div 
                variants={fadeInUp}
                className="relative"
              >
                <motion.p 
                  className="text-large text-muted-foreground text-balance max-w-2xl leading-relaxed"
                >
                We're a Sri Lankan software agency that delivers high-quality web apps, mobile solutions, and integrated systems. No complex processes. Whether you're a startup or scaling business, we'll help you go from idea to launch with speed and precision.
                </motion.p>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 relative"
              >
                <motion.button
                  className="btn-primary hover-glow relative overflow-hidden group"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('pricing')}
                >
                  <span className="relative z-10 flex items-center gap-2">

                    Let's build together!
                  </span>
                  
                  {/* Button shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.button>
                
                <motion.button
                  className="btn-secondary hover-glow relative overflow-hidden group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('services')}
                >
                  <span className="relative z-10 flex items-center gap-2 text-foreground group-hover:text-foreground">
                    Explore The Site
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      →
                    </motion.span>
                  </span>
                  
                  {/* Button shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.button>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              {/* Glow effect around the showcase */}
              <motion.div
                className="absolute -inset-8 bg-gradient-to-r from-accent/20 to-purple-500/20 rounded-3xl blur-3xl"
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <motion.div
                className="glass p-8 rounded-3xl hover-lift relative z-10"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                whileHover={{
                  scale: 1.02,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
              >
                <div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="mt-12"
                  >
                    <CodeShowcase />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-muted/30">
        <div className="container-width section-padding">
          <motion.div
            className="text-center space-y-4 mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-section">What we build</h2>
            <p className="text-large text-muted-foreground max-w-2xl mx-auto text-balance">
              Tech-stack agnostic solutions focused on execution and results
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                icon: (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                title: 'Web Applications',
                description: 'Modern, responsive web apps built with the latest technologies. Fast, secure, and scalable.'
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                ),
                title: 'Mobile Apps',
                description: 'Native and cross-platform mobile solutions that deliver exceptional user experiences.'
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                ),
                title: 'System Integration',
                description: 'Seamless integration of existing systems with modern solutions and APIs.'
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="glass-subtle p-8 rounded-3xl hover-lift group cursor-pointer"
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <motion.div
                  className="w-12 h-12 rounded-2xl gradient-accent flex items-center justify-center mb-6"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {service.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24">
        <div className="container-width section-padding">
          <motion.div
            className="text-center space-y-4 mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-section">Simple, honest pricing</h2>
            <p className="text-large text-muted-foreground max-w-2xl mx-auto text-balance">
              Affordable rates for startups and businesses. No hidden fees, no surprises.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                name: 'Starter',
                price: 'Rs. 75,000',
                period: '/project',
                description: 'Perfect for small businesses and startups',
                features: [
                  'Landing page or simple website',
                  'Mobile responsive design',
                  'Basic SEO optimization',
                  'Contact form integration',
                  '1 month support',
                  'Fast delivery (7-14 days)'
                ],
                popular: false
              },
              {
                name: 'Professional',
                price: 'Rs. 150,000',
                period: '/project',
                description: 'Ideal for growing businesses',
                features: [
                  'Custom web application',
                  'Database integration',
                  'User authentication',
                  'Admin dashboard',
                  'API integrations',
                  '3 months support',
                  'Advanced SEO',
                  'Performance optimization'
                ],
                popular: true
              },
              {
                name: 'Enterprise',
                price: 'Rs. 300,000+',
                period: '/project',
                description: 'For complex systems and large businesses',
                features: [
                  'Full-stack application',
                  'Mobile app (iOS/Android)',
                  'Custom integrations',
                  'Scalable architecture',
                  'DevOps setup',
                  '6 months support',
                  'Priority support',
                  'Custom features'
                ],
                popular: false
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`relative p-8 rounded-3xl border transition-all duration-300 ${plan.popular
                  ? 'border-accent bg-accent/5 scale-105'
                  : 'border-border bg-background hover:border-accent/50'
                  }`}
                whileHover={{ y: -5, scale: plan.popular ? 1.05 : 1.02 }}
              >
                {plan.popular && (
                  <motion.div
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="bg-accent text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </motion.div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                  <div className="mb-2">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: featureIndex * 0.1 }}
                    >
                      <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                <motion.button
                  className={`w-full py-3 px-6 rounded-full font-medium transition-colors cursor-pointer ${plan.popular
                    ? 'btn-primary hover-glow animate-pulse-glow'
                    : 'btn-secondary'
                    }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('contact')}
                >
                  Get Started
                </motion.button>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-muted-foreground mb-4">
              Need a custom solution? Let's discuss your specific requirements.
            </p>
            <motion.button
              className="btn-secondary relative group overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCalendar(true)}
            >
              <span className="relative z-10">Schedule a Free Consultation</span>

              {/* Mini logo animation on button */}
              <motion.div
                className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100"
                initial={{ x: 20, opacity: 0 }}
                whileHover={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.img
                  src="/logo.png"
                  alt=""
                  className="w-5 h-5 object-contain"
                  animate={{
                    rotate: [0, 10, -10, 0],
                    y: [0, -1, 0]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                {/* Mini rocket trail */}
                <motion.div
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
                >
                  <motion.div
                    className="w-0.5 h-1 bg-gradient-to-b from-accent to-transparent rounded-full"
                    animate={{
                      height: [1, 3, 1],
                      opacity: [0.4, 0.8, 0.4],
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              </motion.div>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-muted/30">
        <div className="container-width section-padding">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-section">Why choose Neqo360?</h2>

              <div className="space-y-6">
                {[
                  {
                    emoji: '🚀',
                    title: 'Execution Focused',
                    description: 'We ship fast. No endless meetings or bureaucracy. Just results.'
                  },
                  {
                    emoji: '🎯',
                    title: 'Tech Agnostic',
                    description: 'Right tool for the job. We adapt to your needs, not the other way around.'
                  },
                  {
                    emoji: '📈',
                    title: 'Built to Scale',
                    description: 'Every solution is designed with growth in mind. Start small, scale big.'
                  },
                  {
                    emoji: '🐱',
                    title: 'Human Touch',
                    description: 'We believe in genuine connections. Like cats, we\'re independent but loyal.'
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                  >
                    <motion.div
                      className="w-8 h-8 rounded-full gradient-accent flex items-center justify-center flex-shrink-0 mt-1"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <span className="text-white text-sm">{item.emoji}</span>
                    </motion.div>
                    <div>
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="glass p-8 rounded-3xl"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="space-y-6">
                  <div className="text-center">
                    <motion.div
                      className="text-4xl mb-2"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      ⚡
                    </motion.div>
                    <h3 className="font-semibold">Lightning Fast</h3>
                    <p className="text-sm text-muted-foreground">Sub-second load times</p>
                  </div>

                  <div className="border-t border-border pt-6">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                      >
                        <div className="text-2xl font-bold gradient-text">99.9%</div>
                        <div className="text-xs text-muted-foreground">Uptime</div>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                      >
                        <div className="text-2xl font-bold gradient-text">24/7</div>
                        <div className="text-xs text-muted-foreground">Support</div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact" className="py-24">
        <div className="container-width section-padding">
          <motion.div
            className="text-center space-y-4 mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-section">Ready to build?</h2>
            <p className="text-large text-muted-foreground max-w-2xl mx-auto text-balance">
              Let's discuss your project. No lengthy forms, no sales pitches. Just a conversation.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="glass p-8 rounded-3xl">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name *</label>
                      <input
                        {...register('name')}
                        type="text"
                        className={`w-full px-4 py-3 rounded-2xl border bg-background/50 focus:outline-none focus:ring-2 focus:ring-accent transition-all ${errors.name ? 'border-red-500' : 'border-border'
                          }`}
                        placeholder="Your name"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email *</label>
                      <input
                        {...register('email')}
                        type="email"
                        className={`w-full px-4 py-3 rounded-2xl border bg-background/50 focus:outline-none focus:ring-2 focus:ring-accent transition-all ${errors.email ? 'border-red-500' : 'border-border'
                          }`}
                        placeholder="your@email.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Project Type *</label>
                    <CustomDropdown
                      value={watch('projectType') || ''}
                      onChange={(value) => setValue('projectType', value)}
                      options={[
                        { value: 'Web Application', label: '🌐 Web Application' },
                        { value: 'Mobile App', label: '📱 Mobile App' },
                        { value: 'System Integration', label: '🔗 System Integration' },
                        { value: 'E-commerce', label: '🛒 E-commerce Store' },
                        { value: 'Not Sure Yet', label: '🤔 Not Sure Yet' }
                      ]}
                      placeholder="🚀 Select your project type"
                    />
                    {errors.projectType && (
                      <p className="text-red-500 text-sm mt-1">{errors.projectType.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Tell us about your project *</label>
                    <textarea
                      {...register('message')}
                      rows={4}
                      className={`w-full px-4 py-3 rounded-2xl border bg-background/50 focus:outline-none focus:ring-2 focus:ring-accent transition-all ${errors.message ? 'border-red-500' : 'border-border'
                        }`}
                      placeholder="What are you looking to build? Any specific requirements or timeline?"
                    ></textarea>
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  {submitStatus && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`text-center p-4 rounded-2xl ${submitStatus === 'success'
                        ? 'bg-green-100 text-green-800 border border-green-300'
                        : 'bg-red-100 text-red-800 border border-red-300'
                        }`}
                    >
                      {submitStatus === 'success'
                        ? 'Message sent successfully! We\'ll get back to you soon.'
                        : 'Failed to send message. Please try again or contact us directly.'}
                    </motion.div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary hover-glow disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info & Schedule Call */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Schedule Call Card */}
              <motion.div
                className="glass p-8 rounded-3xl text-center"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-semibold mb-4">Prefer to talk?</h3>
                <p className="text-muted-foreground mb-6">
                  Schedule a free 30-minute consultation to discuss your project in detail.
                </p>
                <motion.button
                  onClick={() => setShowCalendar(true)}
                  className="btn-primary hover-glow w-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Schedule Free Call
                </motion.button>
              </motion.div>

              {/* Contact Details */}
              <div className="glass p-8 rounded-3xl">
                <h3 className="text-xl font-semibold mb-6">Get in touch</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span>hello@neqo360.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span>Colombo, Sri Lanka</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span>Usually respond within 2 hours</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container-width section-padding">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.div
              className="flex items-center space-x-3 group"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div className="relative">
                <motion.img
                  src="/logo.png"
                  alt="Neqo360"
                  className="w-8 h-8 object-contain cursor-pointer"
                  whileHover={{
                    rotate: [0, 10, -10, 0],
                    y: [0, -2, 0]
                  }}
                  transition={{ duration: 0.6 }}
                />
                {/* Mini rocket fire on hover */}
                <motion.div
                  className="absolute bottom-1 left-1/4 transform rotate-[40deg] -translate-x-1/2 opacity-0 group-hover:opacity-100"
                >
                  <motion.div
                    className="w-0.5 h-2 bg-gradient-to-b from-orange-400 to-transparent rounded-full"
                    animate={{
                      height: [4, 8, 4],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 0.4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              </motion.div>
              <span className="font-semibold">Neqo360</span>
            </motion.div>

            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <span>© 2025 Neqo360</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <motion.div
        className="fixed bottom-8 right-8 z-40"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 300 }}
      >
        <motion.button
          className="w-16 h-16 bg-gradient-to-r from-accent to-accent-hover rounded-full text-white shadow-2xl flex items-center justify-center cursor-pointer group relative overflow-hidden"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowCalendar(true)}
          animate={{
            boxShadow: [
              "0 10px 30px rgba(99, 102, 241, 0.3)",
              "0 15px 40px rgba(99, 102, 241, 0.5)",
              "0 10px 30px rgba(99, 102, 241, 0.3)"
            ]
          }}
          transition={{
            boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          {/* Logo */}
          <motion.img
            src="/logo.png"
            alt="Book Meeting"
            className="w-8 h-8 object-contain relative z-10 cursor-pointer"
            animate={{
              rotate: [0, 5, -5, 0],
              y: [0, -1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Tooltip */}
          <motion.div
            className="absolute -top-14 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg backdrop-blur-sm"
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            whileHover={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            🚀 Let's blast off together!
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90"></div>
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Scroll to Top Button */}
      <motion.button
        className="fixed bottom-8 left-8 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full text-accent shadow-lg flex items-center justify-center cursor-pointer"
        style={{ opacity: scrollOpacity }}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        ↑
      </motion.button>

      {/* Calendar Modal */}
      {showCalendar && calendarModalContent}
    </div>
  );
}
