// Service Worker para Cache Offline
// Data: 28 de Outubro de 2025

const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `sherlock-ramos-${CACHE_VERSION}`;

// Assets para pré-cache (critical assets)
const PRECACHE_ASSETS = [
    '/',
    '/posts/',
    '/about/',
    '/offline.html'
];

// Install: Pre-cache critical assets
self.addEventListener('install', (event) => {
    console.log('[SW] Installing service worker...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[SW] Pre-caching critical assets');
                return cache.addAll(PRECACHE_ASSETS.map(url => new Request(url, { cache: 'reload' })));
            })
            .catch((error) => {
                console.error('[SW] Pre-cache failed:', error);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate: Clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating service worker...');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((name) => name !== CACHE_NAME)
                        .map((name) => {
                            console.log('[SW] Deleting old cache:', name);
                            return caches.delete(name);
                        })
                );
            })
            .then(() => self.clients.claim())
    );
});

// Fetch: Cache-first strategy for assets, network-first for HTML
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests and external requests
    if (request.method !== 'GET' || url.origin !== self.location.origin) {
        return;
    }
    
    // Cache strategy based on request type
    if (request.destination === 'document') {
        // HTML pages: Network-first (fresh content)
        event.respondWith(networkFirstStrategy(request));
    } else {
        // Assets (CSS, JS, images): Cache-first (performance)
        event.respondWith(cacheFirstStrategy(request));
    }
});

// Network-first strategy (for HTML)
async function networkFirstStrategy(request) {
    try {
        const networkResponse = await fetch(request);
        
        // Cache successful responses
        if (networkResponse && networkResponse.status === 200) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.log('[SW] Network failed, trying cache:', request.url);
        const cachedResponse = await caches.match(request);
        
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // Fallback to offline page for HTML
        if (request.destination === 'document') {
            return caches.match('/offline.html');
        }
        
        throw error;
    }
}

// Cache-first strategy (for assets)
async function cacheFirstStrategy(request) {
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
        console.log('[SW] Serving from cache:', request.url);
        return cachedResponse;
    }
    
    try {
        const networkResponse = await fetch(request);
        
        // Cache successful responses
        if (networkResponse && networkResponse.status === 200) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.error('[SW] Fetch failed:', request.url, error);
        throw error;
    }
}

// Message handler for cache updates
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
