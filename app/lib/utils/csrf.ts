// Helper to check if running on server
const isServer = typeof window === 'undefined';

// Only import Node.js crypto on the server
let nodeCrypto: typeof import('crypto') | undefined = undefined;
if (isServer) {
  nodeCrypto = require('crypto');
}

import { env } from '../config/env';

/**
 * Generate a cryptographically secure CSRF token
 */
export function generateCSRFToken(): string {
  let token: string;
  if (isServer && nodeCrypto) {
    token = nodeCrypto.randomBytes(32).toString('hex');
  } else {
    // Browser: use window.crypto
    const array = new Uint8Array(32);
    window.crypto.getRandomValues(array);
    token = Array.from(array, b => b.toString(16).padStart(2, '0')).join('');
  }
  const timestamp = Date.now().toString();
  let signature: string;
  if (isServer && nodeCrypto) {
    signature = nodeCrypto.createHmac('sha256', env.CSRF_SECRET)
      .update(token + timestamp)
      .digest('hex');
  } else {
    // Browser: skip signature (server will validate real signature)
    signature = '';
  }
  return `${token}.${timestamp}.${signature}`;
}

/**
 * Validate a CSRF token (server-side only)
 */
export function validateCSRFToken(token: string): boolean {
  if (!isServer || !nodeCrypto) return false;
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
    const expectedSignature = nodeCrypto.createHmac('sha256', env.CSRF_SECRET)
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