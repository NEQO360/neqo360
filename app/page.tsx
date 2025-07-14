'use client';

import { useState, useEffect, Suspense, lazy } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navigation from './components/layout/Navigation';
import HeroSection from './components/sections/HeroSection';
import ServicesSection from './components/sections/ServicesSection';
import PricingSection from './components/sections/PricingSection';
import FloatingActionButton from './components/ui/FloatingActionButton';
import LoadingSpinner from './components/ui/LoadingSpinner';
import { useToast } from './lib/hooks/useToast';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { apiClient } from './lib/api/client';
import { ErrorMessages } from './lib/types/errors';
import { analytics, usePageTracking, useScrollTracking, trackWebVitals } from './lib/analytics';
import { useTranslation } from './lib/i18n/useTranslation';

// Lazy load heavy components with dynamic imports
const LazyAboutSection = lazy(() => import('./components/sections/AboutSection'));
const LazyContactSection = lazy(() => import('./components/sections/ContactSection'));
const LazyFooter = lazy(() => import('./components/layout/Footer'));
const LazyCalendarModal = lazy(() => import('./components/modals/CalendarModal'));
const LazySpiderWebPricing = lazy(() => import('./components/SpiderWebPricing'));

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [showCalendar, setShowCalendar] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { showSuccess, showError } = useToast();
  const { t } = useTranslation();

  // Hydration safety
  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize analytics with delay to reduce initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      usePageTracking();
      useScrollTracking();
      trackWebVitals();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 200]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const scrollOpacity = useTransform(scrollY, [500, 600], [0, 1]);

  // Optimized scroll listener with throttling
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
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
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Set initial active section

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBookMeeting = () => {
    analytics.trackButtonClick('book_meeting', 'floating_action_button');
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
      const response = await apiClient.submitMeetingRequest(data);

      if (response.error) {
        analytics.trackFormSubmission('meeting_request', false, response.error);
        showError(t('meeting.toast.error'));
      } else {
        analytics.trackFormSubmission('meeting_request', true);
        setShowCalendar(false);
        showSuccess(t('meeting.toast.success'));
      }
    } catch (error) {
      analytics.trackError(error as Error, 'meeting_submission');
      showError(t('api.toast.networkError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <Navigation
          activeSection={activeSection}
          onSectionClick={setActiveSection}
          onBookMeeting={handleBookMeeting}
        />
        <HeroSection y1={y1} y2={y2} />
        <ServicesSection />
        <Suspense fallback={<LoadingSpinner size="lg" className="py-20" />}>
          <LazySpiderWebPricing />
        </Suspense>
        <Suspense fallback={<LoadingSpinner size="lg" className="py-20" />}>
          <LazyAboutSection />
        </Suspense>
        <Suspense fallback={<LoadingSpinner size="lg" className="py-20" />}>
          <LazyContactSection onBookMeeting={handleBookMeeting} />
        </Suspense>
        <Suspense fallback={<LoadingSpinner size="md" className="py-10" />}>
          <LazyFooter />
        </Suspense>
        <FloatingActionButton onBookMeeting={handleBookMeeting} />
        <motion.button
          className="fixed bottom-8 left-8 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full text-accent shadow-lg flex items-center justify-center cursor-pointer"
          style={{ opacity: scrollOpacity }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
        >
          ↑
        </motion.button>
        <Suspense fallback={<LoadingSpinner size="md" className="py-10" />}>
          <LazyCalendarModal
            isOpen={showCalendar}
            onClose={() => setShowCalendar(false)}
            onSubmit={handleMeetingSubmit}
            isSubmitting={isSubmitting}
          />
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}
