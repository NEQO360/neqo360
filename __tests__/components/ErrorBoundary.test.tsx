import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { ErrorBoundary } from '../../app/components/ui/ErrorBoundary'

// Component that throws an error for testing
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error')
  }
  return <div>No error</div>
}

describe('ErrorBoundary', () => {
  beforeEach(() => {
    // Suppress console.error for expected errors in tests
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    )

    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('renders error UI when there is an error', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    expect(screen.getByText(/We're sorry, but something unexpected happened/)).toBeInTheDocument()
  })

  it('renders custom fallback when provided', () => {
    const customFallback = <div>Custom error message</div>
    
    render(
      <ErrorBoundary fallback={customFallback}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByText('Custom error message')).toBeInTheDocument()
  })

  it('calls onError when error occurs', () => {
    const onError = jest.fn()
    
    render(
      <ErrorBoundary onError={onError}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(onError).toHaveBeenCalled()
  })

  it('allows retry when Try Again button is clicked', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    const tryAgainButton = screen.getByText('Try Again')
    fireEvent.click(tryAgainButton)

    // The error boundary should reset and show the error again
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })

  it('refreshes page when Refresh Page button is clicked', () => {
    const reloadMock = jest.fn()
    Object.defineProperty(window, 'location', {
      value: { reload: reloadMock },
      writable: true,
    })

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    const refreshButton = screen.getByText('Refresh Page')
    fireEvent.click(refreshButton)

    expect(reloadMock).toHaveBeenCalled()
  })

  it('shows error details in development mode', () => {
    const originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'development'

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByText('Error Details (Development Only)')).toBeInTheDocument()
    expect(screen.getByText('Test error')).toBeInTheDocument()

    process.env.NODE_ENV = originalEnv
  })

  it('does not show error details in production mode', () => {
    const originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'production'

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.queryByText('Error Details (Development Only)')).not.toBeInTheDocument()

    process.env.NODE_ENV = originalEnv
  })
}) 