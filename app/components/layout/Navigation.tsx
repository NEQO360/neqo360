'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '../../providers/TranslationProvider';
import { NAVIGATION_SECTIONS, SITE_CONFIG } from '../../lib/constants';
import LanguageSwitcher from '../ui/LanguageSwitcher';

interface NavigationProps {
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
  onBookMeeting: () => void;
}

export default function Navigation({ activeSection, onSectionClick, onBookMeeting }: NavigationProps) {
  const { t } = useTranslation();
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      onSectionClick(sectionId);
    }
  };

  return (
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

                <motion.div
                  className="absolute w-3 h-3 opacity-0 group-hover:opacity-100"
                >
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
                  {SITE_CONFIG.name}
                </motion.span>
                <motion.span
                  className="text-xs text-muted-foreground font-medium"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {SITE_CONFIG.tagline}
                </motion.span>
              </div>
          </motion.div>

          <div className="hidden md:flex items-center space-x-1 bg-white/5 rounded-full p-1 backdrop-blur-sm">
            {NAVIGATION_SECTIONS.map((item) => (
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
                  {t(item.label)}
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

          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <motion.button
              className="btn-primary relative overflow-hidden group px-6 py-3 rounded-md shadow-lg transition-transform focus:outline-none focus:ring-2 focus:ring-accent hover:shadow-xl"
              whileHover={{ scale: 1.07, y: -3 }}
              whileTap={{ scale: 0.96 }}
              onClick={onBookMeeting}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
            <motion.span
              className="relative z-10 flex items-center space-x-2 text-white font-semibold"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
            >
              <span>{t('navigation.bookMeeting')}</span>
            </motion.span>

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
      </div>
    </motion.nav>
  );
} 