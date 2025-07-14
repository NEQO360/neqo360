// Environment configuration with validation
export const env = {
  // Email configuration
  RESEND_API_KEY: process.env.RESEND_API_KEY || '',
  FROM_EMAIL: process.env.FROM_EMAIL || 'onboarding@resend.dev',
  TO_EMAIL: process.env.TO_EMAIL || 'neqo360@gmail.com',
  
  // Security configuration
  NODE_ENV: process.env.NODE_ENV || 'development',
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  
  // Rate limiting
  RATE_LIMIT_MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '5'),
  RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  
  // CSRF
  CSRF_SECRET: process.env.CSRF_SECRET || 'your-csrf-secret-key',
} as const;

// Validate required environment variables
export function validateEnv() {
  const required = ['RESEND_API_KEY'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

// Type-safe environment access
export type Env = typeof env; 