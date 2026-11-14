
const CACHE_NAME = "pimemory-v3";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./pi.js",
    "./manifest.json",
    "./icon-192.png",
    "./icon-512.png",
    "./apple-touch-icon.png"
];

// Устанавливаем Service Worker и сохраняем файлы
self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

// Удаляем старые версии кэша
self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames
                    .filter(function(name) {
                        return name !== CACHE_NAME;
                    })
                    .map(function(name) {
                        return caches.delete(name);
                    })
            );
        })
    );
});

// Отдаём файлы из кэша, если они доступны
self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});
