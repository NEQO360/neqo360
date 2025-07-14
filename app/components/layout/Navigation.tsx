'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslation } from '../../providers/TranslationProvider';
import { NAVIGATION_SECTIONS, SITE_CONFIG } from '../../lib/constants';
import LanguageSwitcher from '../ui/LanguageSwitcher';
import { useTheme } from '../../providers/ThemeProvider';
import { Moon, Sun, Calendar } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
  onBookMeeting: () => void;
}

export default function Navigation({ activeSection, onSectionClick, onBookMeeting }: NavigationProps) {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 120; 
      const startY = window.scrollY;
      const distance = y - startY;
      const duration = 350; 
      const startTime = performance.now();

      function fastScroll(currentTime: number) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        window.scrollTo(0, startY + distance * ease);

        if (progress < 1) {
          requestAnimationFrame(fastScroll);
        } else {
          window.scrollTo(0, y); 
          onSectionClick(sectionId);
        }
      }

      requestAnimationFrame(fastScroll);
    }
  };

  return (
    <motion.nav
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 glass border-b border-white/10 rounded-full shadow-2xl w-full max-w-screen-md md:max-w-2xl lg:max-w-7xl pl-4 md:pl-8 pr-4 md:pr-8 lg:pr-12 mx-auto min-h-[56px] flex items-center"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full flex items-center justify-between gap-4">
        {/* Left: Logo */}
        <motion.div
          className="flex items-center cursor-pointer h-12 min-w-[170px] pr-4"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300 }}
          onClick={() => scrollToSection('home')}
          role="button"
          tabIndex={0}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              scrollToSection('home');
            }
          }}
        >
          <div className="flex items-center h-full space-x-3">
            <div className="relative w-10 h-10 overflow-visible rounded-xl logo-3d flex items-center">
              <motion.div
                className="w-full h-full rocket-part cursor-pointer"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: 0.2,
                  type: 'spring',
                  stiffness: 500,
                  damping: 15
                }}
                whileHover={{
                  y: [0, -3, 0],
                  rotate: [0, 8, -8, 0],
                  scale: [1, 1.05, 1]
                }}
              >
                <Image
                  src="/logo.png"
                  alt="Neqo360 - Cat on Rocket"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                  priority
                />
              </motion.div>
            </div>
            <div className="flex flex-col justify-center h-full min-w-[90px]">
              <motion.span className="text-xl font-bold tracking-tight whitespace-nowrap">{SITE_CONFIG.name}</motion.span>
              <motion.span className="text-sm text-muted-foreground font-medium whitespace-nowrap">{SITE_CONFIG.tagline}</motion.span>
            </div>
          </div>
        </motion.div>

        {/* Center: Nav Links */}
        <div className="flex-1 flex items-center justify-center">
          <div className="hidden md:flex items-center space-x-1 bg-white/10 rounded-full p-1 px-3 backdrop-blur-sm shadow-sm">
            {NAVIGATION_SECTIONS.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-2 rounded-full text-sm tracking-wide transition-all duration-300 cursor-pointer ${activeSection === item.id
                  ? 'bg-white/30 text-accent shadow-md'
                  : 'hover:bg-white/20 hover:text-accent'
                  }`}
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.96 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + (item.id === 'home' ? 0 : ['services', 'pricing', 'about', 'contact'].indexOf(item.id) + 1) * 0.1 }}
              >
                {t(item.label)}
                {activeSection === item.id && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-accent/20 to-accent-hover/20 rounded-full"
                    layoutId="navbar-active"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="hidden md:block border-l border-white/20 mx-3 h-8" />

        {/* Right: Lang, Theme, Book Meeting as icons */}
        <div className="flex items-center space-x-3 md:space-x-4">
          {/* Language icon button using LanguageSwitcher logic */}
          <LanguageSwitcher iconOnly />
          {/* Theme toggle icon button */}
          <button
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-all text-xl shadow-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            title="Toggle theme"
            aria-label="Toggle theme"
            type="button"
            onClick={toggleTheme}
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5" aria-label="Light mode" />
            ) : (
              <Moon className="w-5 h-5" aria-label="Dark mode" />
            )}
          </button>
          {/* Book Meeting icon button */}
          <button
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-accent to-accent-hover text-white text-xl shadow-lg border border-white/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 hover:from-accent-hover hover:to-accent"
            title="Book meeting"
            aria-label="Book meeting"
            type="button"
            onClick={onBookMeeting}
          >
            <Calendar className="w-5 h-5" aria-label="Book meeting" />
          </button>
        </div>
      </div>
    </motion.nav>
  );
} 