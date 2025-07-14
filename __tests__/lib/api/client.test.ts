import { apiClient, ApiClient } from '../../../app/lib/api/client'

// Mock the dependencies
jest.mock('../../../app/lib/utils/csrf', () => ({
  generateCSRFToken: jest.fn(() => 'test-csrf-token'),
}))

jest.mock('../../../app/lib/utils/logger', () => ({
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  },
}))

describe('ApiClient', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(global.fetch as jest.Mock).mockClear()
  })

  describe('submitContact', () => {
    it('should submit contact form successfully', async () => {
      const mockResponse = { data: { id: '123' } }
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockResponse,
      })

      const contactData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        projectType: 'Web Development',
        message: 'Test message',
      }

      const result = await apiClient.submitContact(contactData)

      expect(result.data).toEqual(mockResponse)
      expect(result.status).toBe(200)
      expect(global.fetch).toHaveBeenCalledWith('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': 'test-csrf-token',
        },
        body: JSON.stringify(contactData),
        signal: expect.any(AbortSignal),
      })
    })

    it('should handle API errors', async () => {
      const errorResponse = { error: 'Validation failed' }
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => errorResponse,
      })

      const contactData = {
        name: 'John Doe',
        email: 'invalid-email',
        projectType: 'Web Development',
        message: 'Test message',
      }

      const result = await apiClient.submitContact(contactData)

      expect(result.error).toBe('Validation failed')
      expect(result.status).toBe(400)
    })

    it('should handle network errors', async () => {
      ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'))

      const contactData = {
        name: 'John Doe',
        email: 'john@example.com',
        projectType: 'Web Development',
        message: 'Test message',
      }

      const result = await apiClient.submitContact(contactData)

      expect(result.error).toBe('Request failed')
      expect(result.status).toBe(500)
    })
  })

  describe('submitMeetingRequest', () => {
    it('should submit meeting request successfully', async () => {
      const mockResponse = { data: { id: '456' } }
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockResponse,
      })

      const meetingData = {
        name: 'Jane Doe',
        email: 'jane@example.com',
        phone: '0987654321',
        message: 'Meeting request',
        date: new Date('2024-01-15'),
        time: '10:00 AM',
      }

      const result = await apiClient.submitMeetingRequest(meetingData)

      expect(result.data).toEqual(mockResponse)
      expect(result.status).toBe(200)
      expect(global.fetch).toHaveBeenCalledWith('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': 'test-csrf-token',
        },
        body: JSON.stringify({
          name: meetingData.name,
          email: meetingData.email,
          projectType: 'Meeting Request',
          message: expect.stringContaining('Meeting Request:'),
        }),
        signal: expect.any(AbortSignal),
      })
    })
  })

  describe('retry logic', () => {
    it('should retry failed requests', async () => {
      const mockResponse = { data: { success: true } }
      
      // First two calls fail, third succeeds
      ;(global.fetch as jest.Mock)
        .mockRejectedValueOnce(new Error('Network error'))
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
          json: async () => mockResponse,
        })

      const result = await apiClient.submitContact({
        name: 'Test',
        email: 'test@example.com',
        projectType: 'Test',
        message: 'Test',
      })

      expect(result.data).toEqual(mockResponse)
      expect(global.fetch).toHaveBeenCalledTimes(3)
    })

    it('should not retry client errors (4xx)', async () => {
      const errorResponse = { error: 'Bad Request' }
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => errorResponse,
      })

      const result = await apiClient.submitContact({
        name: 'Test',
        email: 'test@example.com',
        projectType: 'Test',
        message: 'Test',
      })

      expect(result.error).toBe('Bad Request')
      expect(global.fetch).toHaveBeenCalledTimes(1)
    })
  })

  describe('timeout handling', () => {
    it('should handle timeout errors', async () => {
      const timeoutError = new Error('Timeout')
      timeoutError.name = 'TimeoutError'
      ;(global.fetch as jest.Mock).mockRejectedValueOnce(timeoutError)

      const result = await apiClient.submitContact({
        name: 'Test',
        email: 'test@example.com',
        projectType: 'Test',
        message: 'Test',
      })

      expect(result.error).toBe('Request failed')
      expect(global.fetch).toHaveBeenCalledTimes(1)
    })
  })

  describe('generic methods', () => {
    it('should handle GET requests', async () => {
      const mockResponse = { data: { items: [] } }
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockResponse,
      })

      const result = await apiClient.get('/api/items')

      expect(result.data).toEqual(mockResponse)
      expect(global.fetch).toHaveBeenCalledWith('/api/items', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': 'test-csrf-token',
        },
        signal: expect.any(AbortSignal),
      })
    })

    it('should handle POST requests', async () => {
      const mockResponse = { data: { created: true } }
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: async () => mockResponse,
      })

      const postData = { name: 'Test Item' }
      const result = await apiClient.post('/api/items', postData)

      expect(result.data).toEqual(mockResponse)
      expect(global.fetch).toHaveBeenCalledWith('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': 'test-csrf-token',
        },
        body: JSON.stringify(postData),
        signal: expect.any(AbortSignal),
      })
    })
  })
}) 