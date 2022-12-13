const { offlineFallback, warmStrategyCache } = require("workbox-recipes");
const { CacheFirst } = require("workbox-strategies");
const { registerRoute } = require("workbox-routing");
const { CacheableResponsePlugin } = require("workbox-cacheable-response");
const { ExpirationPlugin } = require("workbox-expiration");
const { precacheAndRoute } = require("workbox-precaching/precacheAndRoute");

// Precache all manifest content
precacheAndRoute(self.__WB_MANIFEST);

// Cache for pages the user navigates to
const pageCache = new CacheFirst({
  cacheName: "page-cache",
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

// Precache a few likely URL's the user will visit
warmStrategyCache({
  urls: ["/index.html", "/"],
  strategy: pageCache,
});

// Cache any pages the user goes to
registerRoute(({ request }) => request.mode === "navigate", pageCache);

// Cache for images
const assetCache = new CacheFirst({
  cacheName: "asset-cache",
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxEntries: 10,
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

// Caches images as they're requested
registerRoute(({ request }) => request.destination === 'image', assetCache);
