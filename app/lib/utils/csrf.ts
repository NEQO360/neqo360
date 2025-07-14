import { randomBytes, createHmac } from 'crypto';
import { env } from '../config/env';

/**
 * Generate a cryptographically secure CSRF token
 */
export function generateCSRFToken(): string {
  const token = randomBytes(32).toString('hex');
  const timestamp = Date.now().toString();
  const signature = createHmac('sha256', env.CSRF_SECRET)
    .update(token + timestamp)
    .digest('hex');
  
  return `${token}.${timestamp}.${signature}`;
}

/**
 * Validate a CSRF token
 */
export function validateCSRFToken(token: string): boolean {
  try {
    const [tokenPart, timestamp, signature] = token.split('.');
    
    if (!tokenPart || !timestamp || !signature) {
      return false;
    }
    
    // Check if token is expired (24 hours)
    const tokenAge = Date.now() - parseInt(timestamp);
    if (tokenAge > 24 * 60 * 60 * 1000) {
      return false;
    }
    
    // Verify signature
    const expectedSignature = createHmac('sha256', env.CSRF_SECRET)
      .update(tokenPart + timestamp)
      .digest('hex');
    
    return signature === expectedSignature;
  } catch {
    return false;
  }
}

/**
 * Extract token part from full CSRF token
 */
export function extractTokenPart(fullToken: string): string {
  return fullToken.split('.')[0] || '';
} 