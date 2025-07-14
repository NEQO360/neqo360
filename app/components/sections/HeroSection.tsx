'use client';

import { useTranslation } from '../../providers/TranslationProvider';
import { HERO_STATS } from '../../lib/constants';
import { scrollToSection } from '../../lib/utils';
import CodeShowcase from '../CodeShowcase';

interface HeroSectionProps {}

export default function HeroSection({}: HeroSectionProps) {
  const { t } = useTranslation();

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: 'var(--section-hero-bg, var(--background))' }}>
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-accent-hover/5"></div>
      <div className="container-width section-padding relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h1 className="hero-title text-balance max-w-full break-words whitespace-normal sm:mt-0">
                <span className="hero-title-main">{t('hero.titleMain')} </span>
                <span className="hero-title-accent gradient-text">{t('hero.titleAccent')}</span>
                
                <span className="hero-title-main"><div className=""></div></span>

              </h1>
            </div>

            <div>
              <p className="hero-subtitle text-large text-muted-foreground text-balance max-w-2xl break-words whitespace-normal">
                {t('hero.subtitle')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="btn-primary hover-glow"
                onClick={() => scrollToSection('contact')}
              >
                {t('hero.startProject')}
              </button>
              <button
                className="btn-secondary hover:text-accent"
                onClick={() => scrollToSection('about')}
              >
                Explore site
              </button>
            </div>

            <div className="flex items-center space-x-8 pt-8">
              <div className="text-center w-full">
                <div className="text-2xl font-bold break-words whitespace-normal">2025</div>
                <div className="text-sm text-muted-foreground break-words whitespace-normal">Year Founded</div>
              </div>
              <div className="text-center w-full">
                <div className="text-2xl font-bold break-words whitespace-normal">100%</div>
                <div className="text-sm text-muted-foreground break-words whitespace-normal">Commitment</div>
              </div>
              <div className="text-center w-full">
                <div className="text-2xl font-bold break-words whitespace-normal">24/7</div>
                <div className="text-sm text-muted-foreground break-words whitespace-normal">Availability</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="glass p-8 rounded-3xl hover-lift">
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