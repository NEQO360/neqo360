// Service Worker for Neqo360 PWA
const CACHE_NAME = 'neqo360-v1.0.0'
const STATIC_CACHE = 'neqo360-static-v1.0.0'
const DYNAMIC_CACHE = 'neqo360-dynamic-v1.0.0'

// Files to cache immediately
const STATIC_FILES = [
  '/',
  '/offline.html',
  '/manifest.json',
  '/favicon.ico',
  '/icon-192x192.png',
  '/icon-512x512.png',
  '/apple-touch-icon.png',
]

// API routes to cache
const API_ROUTES = [
  '/api/contact',
]

// Install event - cache static files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Caching static files')
        return cache.addAll(STATIC_FILES)
      })
      .then(() => {
        console.log('Static files cached successfully')
        return self.skipWaiting()
      })
      .catch((error) => {
        console.error('Error caching static files:', error)
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Deleting old cache:', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => {
        console.log('Service Worker activated')
        return self.clients.claim()
      })
  )
})

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }

  // Handle API requests
  if (API_ROUTES.some(route => url.pathname.startsWith(route))) {
    event.respondWith(handleApiRequest(request))
    return
  }

  // Handle static assets
  if (isStaticAsset(url.pathname)) {
    event.respondWith(handleStaticAsset(request))
    return
  }

  // Handle HTML pages
  if (request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(handleHtmlRequest(request))
    return
  }

  // Default: network first, fallback to cache
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Cache successful responses
        if (response.status === 200) {
          const responseClone = response.clone()
          caches.open(DYNAMIC_CACHE)
            .then((cache) => {
              cache.put(request, responseClone)
            })
        }
        return response
      })
      .catch(() => {
        // Fallback to cache
        return caches.match(request)
      })
  )
})

// Handle API requests with network-first strategy
async function handleApiRequest(request) {
  try {
    const response = await fetch(request)
    if (response.status === 200) {
      const responseClone = response.clone()
      const cache = await caches.open(DYNAMIC_CACHE)
      cache.put(request, responseClone)
    }
    return response
  } catch (error) {
    // Return cached response if available
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }
    
    // Return offline response for API requests
    return new Response(
      JSON.stringify({ error: 'Network unavailable' }),
      {
        status: 503,
        statusText: 'Service Unavailable',
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}

// Handle static assets with cache-first strategy
async function handleStaticAsset(request) {
  const cachedResponse = await caches.match(request)
  if (cachedResponse) {
    return cachedResponse
  }

  try {
    const response = await fetch(request)
    if (response.status === 200) {
      const responseClone = response.clone()
      const cache = await caches.open(STATIC_CACHE)
      cache.put(request, responseClone)
    }
    return response
  } catch (error) {
    // Return offline page for static assets
    return caches.match('/offline.html')
  }
}

// Handle HTML requests with network-first strategy
async function handleHtmlRequest(request) {
  try {
    const response = await fetch(request)
    if (response.status === 200) {
      const responseClone = response.clone()
      const cache = await caches.open(DYNAMIC_CACHE)
      cache.put(request, responseClone)
    }
    return response
  } catch (error) {
    // Return cached response if available
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }
    
    // Return offline page
    return caches.match('/offline.html')
  }
}

// Check if URL is a static asset
function isStaticAsset(pathname) {
  const staticExtensions = [
    '.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico',
    '.woff', '.woff2', '.ttf', '.eot', '.mp4', '.webm', '.mp3', '.wav'
  ]
  return staticExtensions.some(ext => pathname.endsWith(ext))
}

// Background sync for offline form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync())
  }
})

async function doBackgroundSync() {
  try {
    const cache = await caches.open(DYNAMIC_CACHE)
    const requests = await cache.keys()
    
    for (const request of requests) {
      if (request.url.includes('/api/contact')) {
        try {
          const response = await fetch(request)
          if (response.ok) {
            await cache.delete(request)
          }
        } catch (error) {
          console.error('Background sync failed:', error)
        }
      }
    }
  } catch (error) {
    console.error('Background sync error:', error)
  }
}

// Push notification handling
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New notification from Neqo360',
    icon: '/icon-192x192.png',
    badge: '/icon-192x192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View',
        icon: '/icon-192x192.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icon-192x192.png'
      }
    ]
  }

  event.waitUntil(
    self.registration.showNotification('Neqo360', options)
  )
})

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    )
  }
}) 