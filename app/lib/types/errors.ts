// Base error interface
export interface AppError {
  message: string;
  code: string;
  statusCode?: number;
  details?: any;
  timestamp: string;
}

// Specific error types
export interface ValidationError extends AppError {
  code: 'VALIDATION_ERROR';
  field: string;
  value?: any;
}

export interface ApiError extends AppError {
  code: 'API_ERROR';
  endpoint: string;
  method: string;
  statusCode: number;
}

export interface NetworkError extends AppError {
  code: 'NETWORK_ERROR';
  url: string;
  retries?: number;
}

export interface AuthError extends AppError {
  code: 'AUTH_ERROR';
  action: string;
}

export interface RateLimitError extends AppError {
  code: 'RATE_LIMIT_ERROR';
  resetTime: string;
  remaining: number;
}

// Error factory functions
export function createValidationError(field: string, message: string, value?: any): ValidationError {
  return {
    message,
    code: 'VALIDATION_ERROR',
    field,
    value,
    timestamp: new Date().toISOString(),
  };
}

export function createApiError(
  message: string,
  endpoint: string,
  method: string,
  statusCode: number,
  details?: any
): ApiError {
  return {
    message,
    code: 'API_ERROR',
    endpoint,
    method,
    statusCode,
    details,
    timestamp: new Date().toISOString(),
  };
}

export function createNetworkError(message: string, url: string, retries?: number): NetworkError {
  return {
    message,
    code: 'NETWORK_ERROR',
    url,
    retries,
    timestamp: new Date().toISOString(),
  };
}

export function createAuthError(message: string, action: string): AuthError {
  return {
    message,
    code: 'AUTH_ERROR',
    action,
    timestamp: new Date().toISOString(),
  };
}

export function createRateLimitError(resetTime: string, remaining: number): RateLimitError {
  return {
    message: 'Too many requests. Please try again later.',
    code: 'RATE_LIMIT_ERROR',
    resetTime,
    remaining,
    timestamp: new Date().toISOString(),
  };
}

// Error codes enum
export enum ErrorCodes {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  API_ERROR = 'API_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  AUTH_ERROR = 'AUTH_ERROR',
  RATE_LIMIT_ERROR = 'RATE_LIMIT_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

// Common error messages
export const ErrorMessages = {
  VALIDATION: {
    REQUIRED_FIELD: 'This field is required',
    INVALID_EMAIL: 'Please enter a valid email address',
    INVALID_PHONE: 'Please enter a valid phone number',
    INVALID_NAME: 'Name can only contain letters and spaces',
    TOO_SHORT: 'This field is too short',
    TOO_LONG: 'This field is too long',
    INVALID_FORMAT: 'Invalid format',
  },
  API: {
    NETWORK_ERROR: 'Network error. Please check your connection and try again.',
    SERVER_ERROR: 'Server error. Please try again later.',
    TIMEOUT: 'Request timed out. Please try again.',
    UNAUTHORIZED: 'You are not authorized to perform this action.',
    FORBIDDEN: 'Access denied.',
    NOT_FOUND: 'Resource not found.',
  },
  FORM: {
    SUBMISSION_FAILED: 'Failed to submit form. Please try again.',
    VALIDATION_FAILED: 'Please fix the errors above and try again.',
    SUCCESS: 'Form submitted successfully!',
  },
  MEETING: {
    BOOKING_FAILED: 'Failed to book meeting. Please try again.',
    BOOKING_SUCCESS: 'Meeting request sent successfully! We\'ll get back to you soon.',
    INVALID_DATE: 'Please select a valid date.',
    INVALID_TIME: 'Please select a valid time.',
  },
} as const;

// Error handling utilities
export function isAppError(error: any): error is AppError {
  return error && typeof error === 'object' && 'code' in error && 'message' in error;
}

export function getErrorMessage(error: any): string {
  if (isAppError(error)) {
    return error.message;
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  return 'An unexpected error occurred';
}

export function getErrorCode(error: any): string {
  if (isAppError(error)) {
    return error.code;
  }
  
  return ErrorCodes.UNKNOWN_ERROR;
}

// Error logging utilities
export function logError(error: any, context?: any) {
  const errorInfo = {
    message: getErrorMessage(error),
    code: getErrorCode(error),
    timestamp: new Date().toISOString(),
    context,
    stack: error instanceof Error ? error.stack : undefined,
  };
  
  console.error('Application Error:', errorInfo);
  
  // In production, you'd want to send this to an error reporting service
  if (process.env.NODE_ENV === 'production') {
    // TODO: Send to error reporting service (e.g., Sentry)
  }
  
  return errorInfo;
} 