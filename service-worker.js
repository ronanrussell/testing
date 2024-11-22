self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('static-v1').then(cache => {
            return cache.addAll([
                '/',
                '/index.html',
                '/countdown.html',
                '/manifest.json',
                '/service-worker.js',
                '/icon.png'
            ]);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
Register the Service Worker:

Add the following code to the <script> section of both index.html and countdown.html:
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
            console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(error => {
            console.log('Service Worker registration failed:', error);
        });
}