// Analytics utility for tracking user behavior and performance

interface AnalyticsEvent {
  action: string
  category: string
  label?: string
  value?: number
  customParameters?: Record<string, any>
}

interface PageViewEvent {
  page: string
  title: string
  url: string
}

class Analytics {
  private isEnabled: boolean
  private isDevelopment: boolean

  constructor() {
    this.isEnabled = process.env.NODE_ENV === 'production'
    this.isDevelopment = process.env.NODE_ENV === 'development'
  }

  /**
   * Track a custom event
   */
  trackEvent(event: AnalyticsEvent): void {
    if (!this.isEnabled) {
      if (this.isDevelopment) {
        console.log('Analytics Event:', event)
      }
      return
    }

    // Google Analytics 4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
        ...event.customParameters,
      })
    }

    // Plausible Analytics
    if (typeof window !== 'undefined' && (window as any).plausible) {
      (window as any).plausible(event.action, {
        props: {
          category: event.category,
          label: event.label,
          value: event.value,
          ...event.customParameters,
        },
      })
    }
  }

  /**
   * Track page views
   */
  trackPageView(event: PageViewEvent): void {
    if (!this.isEnabled) {
      if (this.isDevelopment) {
        console.log('Page View:', event)
      }
      return
    }

    // Google Analytics 4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
        page_title: event.title,
        page_location: event.url,
      })
    }

    // Plausible Analytics
    if (typeof window !== 'undefined' && (window as any).plausible) {
      (window as any).plausible('pageview', {
        props: {
          page: event.page,
          title: event.title,
          url: event.url,
        },
      })
    }
  }

  /**
   * Track form submissions
   */
  trackFormSubmission(formName: string, success: boolean, errorMessage?: string): void {
    this.trackEvent({
      action: 'form_submit',
      category: 'engagement',
      label: formName,
      value: success ? 1 : 0,
      customParameters: {
        success,
        error_message: errorMessage,
      },
    })
  }

  /**
   * Track button clicks
   */
  trackButtonClick(buttonName: string, location: string): void {
    this.trackEvent({
      action: 'button_click',
      category: 'engagement',
      label: buttonName,
      customParameters: {
        location,
      },
    })
  }

  /**
   * Track scroll depth
   */
  trackScrollDepth(depth: number): void {
    this.trackEvent({
      action: 'scroll',
      category: 'engagement',
      label: 'scroll_depth',
      value: depth,
    })
  }

  /**
   * Track time on page
   */
  trackTimeOnPage(timeInSeconds: number): void {
    this.trackEvent({
      action: 'time_on_page',
      category: 'engagement',
      label: 'time_spent',
      value: timeInSeconds,
    })
  }

  /**
   * Track performance metrics
   */
  trackPerformance(metric: string, value: number): void {
    this.trackEvent({
      action: 'performance',
      category: 'web_vitals',
      label: metric,
      value,
    })
  }

  /**
   * Track errors
   */
  trackError(error: Error, context?: string): void {
    this.trackEvent({
      action: 'error',
      category: 'error',
      label: error.message,
      customParameters: {
        stack: error.stack,
        context,
      },
    })
  }

  /**
   * Track user engagement
   */
  trackEngagement(action: string, details?: Record<string, any>): void {
    this.trackEvent({
      action,
      category: 'engagement',
      customParameters: details,
    })
  }
}

// Create and export the analytics instance
export const analytics = new Analytics()

// Hook for tracking page views
export function usePageTracking() {
  if (typeof window !== 'undefined') {
    // Track initial page load
    analytics.trackPageView({
      page: window.location.pathname,
      title: document.title,
      url: window.location.href,
    })

    // Track navigation changes
    const originalPushState = history.pushState
    const originalReplaceState = history.replaceState

    history.pushState = function(...args) {
      originalPushState.apply(history, args)
      analytics.trackPageView({
        page: window.location.pathname,
        title: document.title,
        url: window.location.href,
      })
    }

    history.replaceState = function(...args) {
      originalReplaceState.apply(history, args)
      analytics.trackPageView({
        page: window.location.pathname,
        title: document.title,
        url: window.location.href,
      })
    }
  }
}

// Hook for tracking scroll depth
export function useScrollTracking() {
  if (typeof window !== 'undefined') {
    let maxScrollDepth = 0
    let hasTracked25 = false
    let hasTracked50 = false
    let hasTracked75 = false
    let hasTracked100 = false

    const trackScroll = () => {
      const scrollTop = window.pageYOffset
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100

      if (scrollPercent > maxScrollDepth) {
        maxScrollDepth = scrollPercent
      }

      // Track milestone scroll depths
      if (scrollPercent >= 25 && !hasTracked25) {
        analytics.trackScrollDepth(25)
        hasTracked25 = true
      }
      if (scrollPercent >= 50 && !hasTracked50) {
        analytics.trackScrollDepth(50)
        hasTracked50 = true
      }
      if (scrollPercent >= 75 && !hasTracked75) {
        analytics.trackScrollDepth(75)
        hasTracked75 = true
      }
      if (scrollPercent >= 100 && !hasTracked100) {
        analytics.trackScrollDepth(100)
        hasTracked100 = true
      }
    }

    window.addEventListener('scroll', trackScroll, { passive: true })

    // Track time on page
    let startTime = Date.now()
    const trackTimeOnPage = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000)
      analytics.trackTimeOnPage(timeSpent)
    }

    window.addEventListener('beforeunload', trackTimeOnPage)
  }
}

// Performance monitoring
export function trackWebVitals() {
  if (typeof window !== 'undefined') {
    // Track Core Web Vitals
    const trackCLS = (metric: any) => {
      analytics.trackPerformance('CLS', metric.value)
    }

    const trackFID = (metric: any) => {
      analytics.trackPerformance('FID', metric.value)
    }

    const trackLCP = (metric: any) => {
      analytics.trackPerformance('LCP', metric.value)
    }

    const trackFCP = (metric: any) => {
      analytics.trackPerformance('FCP', metric.value)
    }

    const trackTTFB = (metric: any) => {
      analytics.trackPerformance('TTFB', metric.value)
    }

    // Import and track web vitals
    import('web-vitals').then(({ getCLS, getFID, getLCP, getFCP, getTTFB }) => {
      getCLS(trackCLS)
      getFID(trackFID)
      getLCP(trackLCP)
      getFCP(trackFCP)
      getTTFB(trackTTFB)
    })
  }
} 