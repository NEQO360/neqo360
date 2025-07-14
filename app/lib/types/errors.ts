export interface ApiError {
  error: string;
  details?: any;
  status?: number;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface RateLimitError {
  error: string;
  resetTime: string;
  remaining: number;
}

export interface ContactFormError {
  name?: string;
  email?: string;
  phone?: string;
  projectType?: string;
  message?: string;
}

export interface MeetingFormError {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  date?: string;
  time?: string;
}

export type FormErrors = ContactFormError | MeetingFormError;

export class AppError extends Error {
  public status: number;
  public code: string;

  constructor(message: string, status: number = 500, code: string = 'INTERNAL_ERROR') {
    super(message);
    this.name = 'AppError';
    this.status = status;
    this.code = code;
  }
}

export class ValidationError extends AppError {
  public details?: any;
  
  constructor(message: string, details?: any) {
    super(message, 400, 'VALIDATION_ERROR');
    this.details = details;
  }
}

export class RateLimitError extends AppError {
  public resetTime: string;
  
  constructor(message: string, resetTime: string) {
    super(message, 429, 'RATE_LIMIT_ERROR');
    this.resetTime = resetTime;
  }
} 