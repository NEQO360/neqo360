'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../../providers/TranslationProvider';
import { CONTACT_INFO, PROJECT_TYPES, ANIMATION_VARIANTS } from '../../lib/constants';
import { validateEmail, validatePhone } from '../../lib/utils';
import { useToast } from '../../lib/hooks/useToast';
import { contactSchema, ContactFormData } from '../../lib/validation/schemas';
import { apiClient } from '../../lib/api/client';
import { ErrorMessages } from '../../lib/types/errors';

interface ContactSectionProps {
  onBookMeeting: () => void;
}

const getContactIcon = (iconType: string) => {
  switch (iconType) {
    case 'email':
      return (
        <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case 'location':
      return (
        <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    case 'time':
      return (
        <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    default:
      return null;
  }
};

export default function ContactSection({ onBookMeeting }: ContactSectionProps) {
  const { t } = useTranslation();
  const { showSuccess, showError } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const validationResult = contactSchema.safeParse(formData);
    
    if (validationResult.success) {
      setErrors({});
      return true;
    }
    
    const newErrors: Record<string, string> = {};
    validationResult.error.errors.forEach(error => {
      if (error.path[0]) {
        newErrors[error.path[0] as string] = error.message;
      }
    });
    
    setErrors(newErrors);
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await apiClient.submitContact(formData);

      if (response.error) {
        showError(t('contact.form.error'));
      } else {
        setFormData({
          name: '',
          email: '',
          phone: '',
          projectType: '',
          message: ''
        });
        showSuccess(t('contact.form.success'));
      }
    } catch (error) {
      showError(t('contact.form.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-muted/30">
      <div className="container-width section-padding">
        <motion.div
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-section break-words whitespace-normal max-w-full">{t('contact.title')}</h2>
          <p className="text-large text-muted-foreground max-w-2xl mx-auto text-balance break-words whitespace-normal">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 min-w-0">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h3 className="text-2xl font-semibold mb-4 break-words whitespace-normal max-w-full">{t('contact.getInTouch')}</h3>
              <p className="text-muted-foreground mb-8 break-words whitespace-normal max-w-full">{t('contact.description')}</p>
            </div>

            <div className="space-y-6">
              {CONTACT_INFO.map((info, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    {getContactIcon(info.icon)}
                  </div>
                  <span className="text-muted-foreground break-words whitespace-normal max-w-full">
                    {info.icon === 'location' ? t('contact.contactInfo.location') :
                     info.icon === 'time' ? t('contact.contactInfo.responseTime') :
                     info.text}
                   </span>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="pt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <motion.button
                className="btn-primary w-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onBookMeeting}
              >
                {t('contact.scheduleMeeting')}
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid md:grid-cols-2 gap-6 min-w-0">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 break-words whitespace-normal max-w-full">
                  {t('contact.form.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-2xl border transition-colors ${
                    errors.name ? 'border-red-500' : 'border-border focus:border-accent'
                  }`}
                  placeholder={t('contact.form.namePlaceholder')}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  aria-invalid={!!errors.name}
                  required
                />
                {errors.name && <p id="name-error" className="text-red-500 text-sm mt-1" role="alert">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 break-words whitespace-normal max-w-full">
                  {t('contact.form.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-2xl border transition-colors ${
                    errors.email ? 'border-red-500' : 'border-border focus:border-accent'
                  }`}
                  placeholder={t('contact.form.emailPlaceholder')}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  aria-invalid={!!errors.email}
                  required
                />
                {errors.email && <p id="email-error" className="text-red-500 text-sm mt-1" role="alert">{errors.email}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 min-w-0">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2 break-words whitespace-normal max-w-full">
                  {t('contact.form.phone')}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-2xl border transition-colors ${
                    errors.phone ? 'border-red-500' : 'border-border focus:border-accent'
                  }`}
                  placeholder={t('contact.form.phonePlaceholder')}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                  aria-invalid={!!errors.phone}
                />
                {errors.phone && <p id="phone-error" className="text-red-500 text-sm mt-1" role="alert">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="projectType" className="block text-sm font-medium mb-2 break-words whitespace-normal max-w-full">
                  {t('contact.form.projectType')}
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-2xl border transition-colors ${
                    errors.projectType ? 'border-red-500' : 'border-border focus:border-accent'
                  }`}
                  aria-describedby={errors.projectType ? 'projectType-error' : undefined}
                  aria-invalid={!!errors.projectType}
                  required
                >
                  <option value="">{t('contact.form.projectTypePlaceholder')}</option>
                  {PROJECT_TYPES.map((type, index) => (
                    <option key={index} value={type.value}>
                      {t(type.labelKey)}
                    </option>
                  ))}
                </select>
                {errors.projectType && <p id="projectType-error" className="text-red-500 text-sm mt-1" role="alert">{errors.projectType}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2 break-words whitespace-normal max-w-full">
                {t('contact.form.message')}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                className={`w-full px-4 py-3 rounded-2xl border transition-colors resize-none ${
                  errors.message ? 'border-red-500' : 'border-border focus:border-accent'
                }`}
                placeholder={t('contact.form.messagePlaceholder')}
                aria-describedby={errors.message ? 'message-error' : undefined}
                aria-invalid={!!errors.message}
                required
              />
              {errors.message && <p id="message-error" className="text-red-500 text-sm mt-1" role="alert">{errors.message}</p>}
            </div>

            <motion.button
              type="submit"
              className="btn-primary w-full"
              disabled={isSubmitting}
              aria-describedby={isSubmitting ? 'submitting-status' : undefined}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
            </motion.button>
            {isSubmitting && (
              <p id="submitting-status" className="sr-only" role="status">
                {t('contact.form.submitting')}
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
} 