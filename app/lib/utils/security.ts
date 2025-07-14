import DOMPurify from 'dompurify';

/**
 * Sanitize HTML content to prevent XSS attacks
 */
export function sanitizeHtml(input: string): string {
  if (!input) return '';
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  });
}

/**
 * Sanitize plain text content
 */
export function sanitizeText(input: string): string {
  if (!input) return '';
  return input
    .trim()
    .replace(/[<>]/g, '') 
    .replace(/&/g, '&amp;') 
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Validate email format
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Validate phone number format
 */
export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[1-9][\d\s\-\(\)]{9,14}$/;
  return phoneRegex.test(phone.trim());
}

/**
 * Validate name format (letters and spaces only)
 */
export function validateName(name: string): boolean {
  const nameRegex = /^[a-zA-Z\s]{2,100}$/;
  return nameRegex.test(name.trim());
}

/**
 * Check if string contains potentially dangerous content
 */
export function containsDangerousContent(input: string): boolean {
  const dangerousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /data:text\/html/i,
    /vbscript:/i,
    /expression\(/i,
  ];
  
  return dangerousPatterns.some(pattern => pattern.test(input));
}

/**
 * Generate CSRF token (placeholder for future implementation)
 */
export function generateCSRFToken(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

/**
 * Validate CSRF token (placeholder for future implementation)
 */
export function validateCSRFToken(token: string, storedToken: string): boolean {
  return token === storedToken;
}

/**
 * Sanitize and validate user input
 */
export function sanitizeAndValidateInput(input: string, maxLength: number = 1000): {
  isValid: boolean;
  sanitized: string;
  error?: string;
} {
  if (!input || typeof input !== 'string') {
    return {
      isValid: false,
      sanitized: '',
      error: 'Input is required and must be a string'
    };
  }

  if (input.length > maxLength) {
    return {
      isValid: false,
      sanitized: '',
      error: `Input must be less than ${maxLength} characters`
    };
  }

  if (containsDangerousContent(input)) {
    return {
      isValid: false,
      sanitized: '',
      error: 'Input contains potentially dangerous content'
    };
  }

  const sanitized = sanitizeText(input);
  
  return {
    isValid: true,
    sanitized
  };
} 