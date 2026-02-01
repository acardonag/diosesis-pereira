const CACHE_NAME = 'diosesis-pereira-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/logo-diosesis.png',
  'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://cdn.tailwindcss.com'
];

// Instalación del Service Worker
self.addEventListener('install', event => {
  console.log('Service Worker: Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Cacheando archivos');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Activación del Service Worker
self.addEventListener('activate', event => {
  console.log('Service Worker: Activando...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Service Worker: Eliminando caché antigua');
            return caches.delete(cache);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Estrategia de cache: Network First, falling back to cache
self.addEventListener('fetch', event => {
  // Solo cachear peticiones GET
  if (event.request.method !== 'GET') return;

  // Para la API de Google Apps Script, siempre intentar red primero
  if (event.request.url.includes('script.google.com')) {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return new Response(
            JSON.stringify({ parroquias: [], horarios: [] }),
            { headers: { 'Content-Type': 'application/json' } }
          );
        })
    );
    return;
  }

  // Para otros recursos: Network First con fallback a cache
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Clonar la respuesta
        const responseClone = response.clone();
        
        // Guardar en caché
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseClone);
        });
        
        return response;
      })
      .catch(() => {
        // Si falla la red, buscar en caché
        return caches.match(event.request)
          .then(response => {
            return response || new Response('Offline - Recurso no disponible', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/plain'
              })
            });
          });
      })
  );
});

// Sincronización en segundo plano (opcional)
self.addEventListener('sync', event => {
  console.log('Service Worker: Sincronizando datos...');
});

// Notificaciones push (opcional para futuro)
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Diócesis de Pereira';
  const options = {
    body: data.body || 'Nueva actualización disponible',
    icon: 'logo-diosesis.png',
    badge: 'logo-diosesis.png',
    vibrate: [200, 100, 200],
    tag: 'diosesis-notification'
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});
