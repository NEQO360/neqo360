'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import CustomDropdown from '../ui/CustomDropdown';

// Form validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  projectType: z.string().min(1, 'Please select a project type'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactForm = z.infer<typeof contactSchema>;

interface ContactSectionProps {
  onBookMeeting: () => void;
}

export default function ContactSection({ onBookMeeting }: ContactSectionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

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

  return (
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
              <div className="text-4xl mb-4">📞</div>
              <h3 className="text-xl font-semibold mb-4">Prefer to talk?</h3>
              <p className="text-muted-foreground mb-6">
                Schedule a free 30-minute consultation to discuss your project in detail.
              </p>
              <motion.button
                onClick={onBookMeeting}
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
  );
} 