import { translations, Language } from './i18n/translations';

export const SITE_CONFIG = {
  name: 'Neqo360',
  tagline: 'Digital Solutions',
  email: 'neqo360@gmail.com',
  location: 'Colombo, Sri Lanka',
  responseTime: 'Usually respond within 2 hours',
  copyright: '© 2025 Neqo360',
} as const;

export const NAVIGATION_SECTIONS = [
  { id: 'home', label: 'navigation.home' },
  { id: 'about', label: 'navigation.about' },
  { id: 'services', label: 'navigation.services' },
  { id: 'pricing', label: 'navigation.pricing' },
  { id: 'contact', label: 'navigation.contact' },
] as const;

export const HERO_STATS = [
  { value: '50+', label: 'hero.stats.projects' },
  { value: '99%', label: 'hero.stats.satisfaction' },
  { value: '<1s', label: 'hero.stats.loadTime' },
] as const;

const SERVICE_ICONS: Record<string, string> = {
  webApps: 'web',
  mobileApps: 'mobile',
  systemIntegration: 'integration',
  seo: 'seo',
  uiux: 'uiux',
  gameDev: 'game',
};

const SERVICE_KEYS = [
  'webApps',
  'mobileApps',
  'systemIntegration',
  'seo',
  'uiux',
  'gameDev',
] as const;

type ServiceTranslation = {
  title: string;
  description: string;
};

export function getServices(language: Language) {
  const services = translations[language].services;
  return SERVICE_KEYS
    .filter(key => typeof services[key] === 'object' && services[key] && 'title' in services[key] && 'description' in services[key])
    .map(key => {
      const service = services[key] as ServiceTranslation;
      return {
        icon: SERVICE_ICONS[key] || 'web',
        title: service.title,
        description: service.description,
        key,
      };
    });
}

export const ABOUT_FEATURES = [
  {
    icon: 'Rocket',
    titleKey: 'about.executionFocused.title',
    descriptionKey: 'about.executionFocused.description',
  },
  {
    icon: 'Target',
    titleKey: 'about.techAgnostic.title',
    descriptionKey: 'about.techAgnostic.description',
  },
  {
    icon: 'BarChart2',
    titleKey: 'about.builtToScale.title',
    descriptionKey: 'about.builtToScale.description',
  },
  {
    icon: 'Hand',
    titleKey: 'about.humanTouch.title',
    descriptionKey: 'about.humanTouch.description',
  },
] as const;

export const PROJECT_TYPES = [
  { value: 'Web Application', labelKey: 'contact.projectTypes.webApp' },
  { value: 'Mobile App', labelKey: 'contact.projectTypes.mobileApp' },
  { value: 'System Integration', labelKey: 'contact.projectTypes.systemIntegration' },
  { value: 'E-commerce', labelKey: 'contact.projectTypes.ecommerce' },
  { value: 'Not Sure Yet', labelKey: 'contact.projectTypes.notSure' },
] as const;

export const TIME_SLOTS = [
  '09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'
] as const;

export const ANIMATION_VARIANTS = {
  fadeInUp: {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: 'easeOut' }
  },
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  },
} as const;

export const CONTACT_INFO = [
  {
    icon: 'email',
    text: SITE_CONFIG.email,
  },
  {
    icon: 'location',
    text: SITE_CONFIG.location,
  },
  {
    icon: 'time',
    text: SITE_CONFIG.responseTime,
  },
] as const;

export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
] as const;

export const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;

export const PRICING_PLANS = [
  {
    titleKey: 'pricing.starter.title',
    descriptionKey: 'pricing.starter.description',
    price: '2,500',
    featured: false,
    features: [
      'pricing.starter.features.basicWeb',
      'pricing.starter.features.responsive',
      'pricing.starter.features.basicSEO',
      'pricing.starter.features.support',
    ],
  },
  {
    titleKey: 'pricing.pro.title',
    descriptionKey: 'pricing.pro.description',
    price: '5,000',
    featured: true,
    features: [
      'pricing.pro.features.advancedWeb',
      'pricing.pro.features.mobileApp',
      'pricing.pro.features.advancedSEO',
      'pricing.pro.features.integration',
      'pricing.pro.features.prioritySupport',
    ],
  },
  {
    titleKey: 'pricing.enterprise.title',
    descriptionKey: 'pricing.enterprise.description',
    price: 'Custom',
    featured: false,
    features: [
      'pricing.enterprise.features.customSolution',
      'pricing.enterprise.features.scalable',
      'pricing.enterprise.features.advancedFeatures',
      'pricing.enterprise.features.dedicatedSupport',
      'pricing.enterprise.features.maintenance',
    ],
  },
] as const; 