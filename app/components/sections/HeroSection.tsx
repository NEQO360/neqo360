'use client';

import { useTranslation } from '../../providers/TranslationProvider';
import { scrollToSection } from '../../lib/utils';
import CodeShowcase from '../ui/CodeShowcase';

interface HeroSectionProps {}

export default function HeroSection({}: HeroSectionProps) {
  const { t } = useTranslation();

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-0"
      style={{ background: 'var(--section-hero-bg, var(--background))' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-accent-hover/5"></div>
      <div className="mt-28 sm:mt-0 w-full container-width section-padding relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="space-y-8 m-0 p-0">
            <div>
              <h1 className="hero-title text-balance max-w-full lg:break-words lg:whitespace-normal sm:mt-0">
                <span className="hero-title-main capitalize">{t('hero.titleMain')} </span>
                <span className="hero-title-accent gradient-text capitalize">{t('hero.titleAccent')}</span>
                <span className="hero-title-main">
                  .
                </span>
              </h1>
            </div>

            <div>
              <p className="hero-subtitle sm:text-xl text-base text-center sm:text-left text-muted-foreground text-balance break-words whitespace-normal">
                {t('hero.subtitle')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <button
                className="btn-primary hover-glow w-full sm:w-auto"
                onClick={() => scrollToSection('contact')}
              >
                {t('hero.startProject')}
              </button>
              <button
                className="btn-secondary hover:text-accent w-full sm:w-auto"
                onClick={() => scrollToSection('about')}
              >
                {t('hero.exploreSite')}
              </button>
            </div>

            <div className="flex items-center space-x-8 sm:pt-8 pt-4 w-full sm:w-auto">
              <div className="text-center w-full">
                <div className="text-2xl font-bold break-words whitespace-normal">2025</div>
                <div className="text-sm text-muted-foreground break-words whitespace-normal">{t('hero.yearFounded')}</div>
              </div>
              <div className="text-center w-full">
                <div className="text-2xl font-bold break-words whitespace-normal">100%</div>
                <div className="text-sm text-muted-foreground break-words whitespace-normal">{t('hero.commitment')}</div>
              </div>
              <div className="text-center w-full">
                <div className="text-2xl font-bold break-words whitespace-normal">24/7</div>
                <div className="text-sm text-muted-foreground break-words whitespace-normal">{t('hero.availability')}</div>
              </div>
            </div>
          </div>

          <div className="relative sm:mt-8 mt-4 lg:mt-0 mb-6 sm:mb-0">
            <div className="glass p-4 sm:p-8 rounded-2xl sm:rounded-3xl hover-lift mx-auto">
              <div>
                <div className="mt-12">
                  <CodeShowcase />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 