import { NextResponse } from 'next/server'
import { logger } from '../../lib/utils/logger'

/**
 * Health check endpoint for monitoring and offline detection
 * Used by service worker and monitoring tools
 */
export async function GET() {
  try {
    const startTime = Date.now()
    
    // Basic health checks
    const healthChecks = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
      version: process.env.npm_package_version || '1.0.0',
      checks: {
        database: 'ok', // Add actual DB check if needed
        email: 'ok', // Add actual email service check if needed
        memory: process.memoryUsage(),
      }
    }
    
    const responseTime = Date.now() - startTime
    
    logger.info('Health check completed', {
      responseTime,
      status: healthChecks.status
    })
    
    return NextResponse.json(healthChecks, {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
  } catch (error) {
    logger.error('Health check failed', { error })
    
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: 'Health check failed'
      },
      { status: 503 }
    )
  }
}

/**
 * HEAD method for lightweight health checks
 */
export async function HEAD() {
  try {
    return new NextResponse(null, {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
  } catch (error) {
    logger.error('Health check HEAD failed', { error })
    return new NextResponse(null, { status: 503 })
  }
} 