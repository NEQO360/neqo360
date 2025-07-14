'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navigation from './components/layout/Navigation';
import HeroSection from './components/sections/HeroSection';
import ServicesSection from './components/sections/ServicesSection';
import PricingSection from './components/sections/PricingSection';
import FloatingActionButton from './components/ui/FloatingActionButton';
import LoadingSpinner from './components/ui/LoadingSpinner';
import { useToast } from './lib/hooks/useToast';
import {
  AboutSection,
  ContactSection,
  Footer,
  CalendarModal,
  SpiderWebPricing
} from './components/lazy';

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [showCalendar, setShowCalendar] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { showSuccess, showError } = useToast();

  // Hydration safety
  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 200]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const scrollOpacity = useTransform(scrollY, [500, 600], [0, 1]);

  // Scroll listener for navbar active section
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
    handleScroll(); // Set initial active section

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBookMeeting = () => {
    setShowCalendar(true);
  };

  const handleMeetingSubmit = async (data: {
    name: string;
    email: string;
    phone: string;
    message: string;
    date: Date;
    time: string;
  }) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          projectType: 'Meeting Request',
          message: `Meeting Request:
          Date: ${data.date.toDateString()}
          Time: ${data.time}
          Phone: ${data.phone}
          Message: ${data.message}`
        }),
      });

      if (response.ok) {
        setShowCalendar(false);
        showSuccess('Meeting request sent successfully! We\'ll get back to you soon.');
      } else {
        const errorData = await response.json();
        showError(errorData.error || 'Failed to send meeting request. Please try again.');
      }
    } catch (error) {
      showError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation
        activeSection={activeSection}
        onSectionClick={setActiveSection}
        onBookMeeting={handleBookMeeting}
      />
      <HeroSection y1={y1} y2={y2} />
      <ServicesSection />
      <Suspense fallback={<LoadingSpinner size="lg" className="py-20" />}>
        <SpiderWebPricing />
      </Suspense>
      <Suspense fallback={<LoadingSpinner size="lg" className="py-20" />}>
        <AboutSection />
      </Suspense>
      <Suspense fallback={<LoadingSpinner size="lg" className="py-20" />}>
        <ContactSection onBookMeeting={handleBookMeeting} />
      </Suspense>
      <Suspense fallback={<LoadingSpinner size="md" className="py-10" />}>
        <Footer />
      </Suspense>
      <FloatingActionButton onBookMeeting={handleBookMeeting} />
      <motion.button
        className="fixed bottom-8 left-8 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full text-accent shadow-lg flex items-center justify-center cursor-pointer"
        style={{ opacity: scrollOpacity }}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        ↑
      </motion.button>
      <Suspense fallback={<LoadingSpinner size="md" className="py-10" />}>
        <CalendarModal
          isOpen={showCalendar}
          onClose={() => setShowCalendar(false)}
          onSubmit={handleMeetingSubmit}
          isSubmitting={isSubmitting}
        />
      </Suspense>
    </div>
  );
}
