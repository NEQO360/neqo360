import { lazy } from 'react';

// Lazy load large components for better performance
export const SpiderWebPricing = lazy(() => import('../ui/SpiderWebPricing'));
export const CalendarModal = lazy(() => import('../modals/CalendarModal'));
export const CodeShowcase = lazy(() => import('../ui/CodeShowcase'));

// Lazy load sections that are below the fold
export const AboutSection = lazy(() => import('../sections/AboutSection'));
export const ContactSection = lazy(() => import('../sections/ContactSection'));
export const Footer = lazy(() => import('../layout/Footer'));

// Lazy load UI components
export const ConfirmationDialog = lazy(() => import('../ui/ConfirmationDialog')); 