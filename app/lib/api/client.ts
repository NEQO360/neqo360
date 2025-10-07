import { generateCSRFToken } from '../utils/csrf';
import { logger } from '../utils/logger';

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  details?: any;
  status: number;
}

export interface ApiRequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
  retries?: number;
}

/**
 * Centralized API client for handling all HTTP requests with built-in error handling,
 * retry logic, CSRF protection, and logging.
 */
class ApiClient {
  private baseURL: string;
  private defaultTimeout: number = 10000; // 10 seconds
  private defaultRetries: number = 3;

  constructor(baseURL: string = '') {
    this.baseURL = baseURL;
  }

  /**
   * Makes an HTTP request with retry logic, error handling, and logging.
   * 
   * @param endpoint - The API endpoint to call
   * @param config - Request configuration including method, headers, body, etc.
   * @returns Promise resolving to API response with data or error
   */
  private async request<T>(
    endpoint: string,
    config: ApiRequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const {
      method = 'GET',
      headers = {},
      body,
      timeout = this.defaultTimeout,
      retries = this.defaultRetries
    } = config;

    const url = `${this.baseURL}${endpoint}`;
    const csrfToken = generateCSRFToken();

    const requestConfig: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'x-csrf-token': csrfToken,
        ...headers,
      },
      signal: AbortSignal.timeout(timeout),
    };

    if (body && method !== 'GET') {
      requestConfig.body = JSON.stringify(body);
    }

    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const startTime = Date.now();
        const response = await fetch(url, requestConfig);
        const duration = Date.now() - startTime;

        // Log the request
        logger.info('API Request', {
          method,
          url,
          status: response.status,
          duration: `${duration}ms`,
          attempt,
        });

        const responseData = await response.json().catch(() => ({}));

        if (!response.ok) {
          const error = new Error(responseData.error || `HTTP ${response.status}`);
          error.name = 'ApiError';
          (error as any).status = response.status;
          (error as any).details = responseData.details;
          throw error;
        }

        return {
          data: responseData.data || responseData,
          status: response.status,
        };
      } catch (error) {
        lastError = error as Error;
        
        // Don't retry on client errors (4xx)
        if (error instanceof Error && 'status' in error && (error as any).status >= 400 && (error as any).status < 500) {
          break;
        }

        // Don't retry on timeout
        if (error instanceof Error && error.name === 'TimeoutError') {
          break;
        }

        if (attempt < retries) {
          logger.warn('API Request failed, retrying', {
            method,
            url,
            attempt,
            error: error instanceof Error ? error.message : 'Unknown error',
          });
          
          // Exponential backoff
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        }
      }
    }

    logger.error('API Request failed after all retries', {
      method,
      url,
      retries,
      error: lastError instanceof Error ? lastError.message : 'Unknown error',
    });

    return {
      error: lastError instanceof Error ? lastError.message : 'Request failed',
      details: lastError instanceof Error ? (lastError as any).details : undefined,
      status: lastError instanceof Error ? (lastError as any).status || 500 : 500,
    };
  }

  /**
   * Submits a contact form to the API.
   * 
   * @param data - Contact form data including name, email, project type, and message
   * @returns Promise resolving to API response
   */
  async submitContact(data: {
    name: string;
    email: string;
    phone?: string;
    projectType: string;
    message: string;
  }): Promise<ApiResponse> {
    return this.request('/.netlify/functions/contact', {
      method: 'POST',
      body: data,
    });
  }

  /**
   * Submits a meeting request to the API.
   * 
   * @param data - Meeting request data including contact info, date, and time
   * @returns Promise resolving to API response
   */
  async submitMeetingRequest(data: {
    name: string;
    email: string;
    phone: string;
    message: string;
    date: Date;
    time: string;
  }): Promise<ApiResponse> {
    return this.request('/.netlify/functions/schedule', {
      method: 'POST',
      body: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
        date: data.date.toDateString(),
        time: data.time,
      },
    });
  }

  // Generic GET request
  async get<T>(endpoint: string, config?: Omit<ApiRequestConfig, 'method' | 'body'>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'GET' });
  }

  // Generic POST request
  async post<T>(endpoint: string, data: any, config?: Omit<ApiRequestConfig, 'method'>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'POST', body: data });
  }

  // Generic PUT request
  async put<T>(endpoint: string, data: any, config?: Omit<ApiRequestConfig, 'method'>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'PUT', body: data });
  }

  // Generic DELETE request
  async delete<T>(endpoint: string, config?: Omit<ApiRequestConfig, 'method' | 'body'>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' });
  }
}

// Create and export the default API client instance
export const apiClient = new ApiClient();

// Export the class for custom instances
export { ApiClient }; 