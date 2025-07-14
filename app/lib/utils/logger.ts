interface LogEntry {
  timestamp: string;
  level: 'info' | 'warn' | 'error';
  message: string;
  data?: any;
  ip?: string;
  userAgent?: string;
  method?: string;
  url?: string;
  statusCode?: number;
  duration?: number;
}

class Logger {
  private logs: LogEntry[] = [];
  private maxLogs = 1000; // Keep last 1000 logs in memory

  private addLog(entry: LogEntry) {
    this.logs.push(entry);
    
    // Keep only the last maxLogs entries
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }
    
    // In production, you'd want to send this to a logging service
    if (process.env.NODE_ENV === 'production') {
      // TODO: Send to logging service (e.g., Sentry, Logtail, etc.)
      console.log(`[${entry.level.toUpperCase()}] ${entry.message}`, entry.data || '');
    } else {
      console.log(`[${entry.level.toUpperCase()}] ${entry.message}`, entry.data || '');
    }
  }

  info(message: string, data?: any) {
    this.addLog({
      timestamp: new Date().toISOString(),
      level: 'info',
      message,
      data,
    });
  }

  warn(message: string, data?: any) {
    this.addLog({
      timestamp: new Date().toISOString(),
      level: 'warn',
      message,
      data,
    });
  }

  error(message: string, data?: any) {
    this.addLog({
      timestamp: new Date().toISOString(),
      level: 'error',
      message,
      data,
    });
  }

  logRequest(request: Request, response: Response, duration: number) {
    const url = new URL(request.url);
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    this.addLog({
      timestamp: new Date().toISOString(),
      level: 'info',
      message: `API Request: ${request.method} ${url.pathname}`,
      data: {
        method: request.method,
        url: url.pathname,
        statusCode: response.status,
        duration: `${duration}ms`,
        ip,
        userAgent: userAgent.substring(0, 100), // Truncate for privacy
      },
      ip,
      userAgent,
      method: request.method,
      url: url.pathname,
      statusCode: response.status,
      duration,
    });
  }

  logError(error: Error, context?: any) {
    this.addLog({
      timestamp: new Date().toISOString(),
      level: 'error',
      message: error.message,
      data: {
        stack: error.stack,
        context,
      },
    });
  }

  // Get recent logs (for debugging)
  getRecentLogs(limit: number = 50): LogEntry[] {
    return this.logs.slice(-limit);
  }

  // Clear logs (for memory management)
  clearLogs() {
    this.logs = [];
  }
}

export const logger = new Logger(); 