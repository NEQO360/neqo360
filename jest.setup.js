import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
  usePathname() {
    return '/'
  },
}))

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
    form: ({ children, ...props }) => <form {...props}>{children}</form>,
    input: (props) => <input {...props} />,
    textarea: (props) => <textarea {...props} />,
    select: ({ children, ...props }) => <select {...props}>{children}</select>,
    option: ({ children, ...props }) => <option {...props}>{children}</option>,
    label: ({ children, ...props }) => <label {...props}>{children}</label>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }) => <h2 {...props}>{children}</h2>,
    h3: ({ children, ...props }) => <h3 {...props}>{children}</h3>,
    details: ({ children, ...props }) => <details {...props}>{children}</details>,
    summary: ({ children, ...props }) => <summary {...props}>{children}</summary>,
    pre: ({ children, ...props }) => <pre {...props}>{children}</pre>,
  },
  AnimatePresence: ({ children }) => children,
  useScroll: () => ({ scrollY: { get: () => 0 } }),
  useTransform: () => 0,
}))

// Mock react-hot-toast
jest.mock('react-hot-toast', () => ({
  __esModule: true,
  default: {
    success: jest.fn(),
    error: jest.fn(),
    loading: jest.fn(),
    dismiss: jest.fn(),
  },
}))

// Mock environment variables
process.env.NODE_ENV = 'test'
process.env.RESEND_API_KEY = 'test-api-key'
process.env.FROM_EMAIL = 'test@example.com'
process.env.TO_EMAIL = 'test@example.com'
process.env.CSRF_SECRET = 'test-csrf-secret'

// Global test utilities
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Mock fetch
global.fetch = jest.fn()

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
} 