/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
const staticAssets = ["/", "/index.html", "/src/main.scss", "/src/app.tsx"];

const STATIC_CACHE_NAME = "static-data";
const DYNAMIC_CACHE_NAME = "dynamic-data";

self.addEventListener("install", async () => {
  const cache = await caches.open(STATIC_CACHE_NAME);
  console.log("install");
  cache.addAll(staticAssets);
});

self.addEventListener("activate", () => {
  console.log("activate");
  return self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.url.startsWith("chrome-extension") || request.url.includes("extension") || !(request.url.indexOf("http") === 0)) return;

  event.respondWith(cacheData(request));
});

async function cacheData(request) {
  const cashedRequest = await caches.match(request);
  return cashedRequest || networkFirst(request);
}

async function networkFirst(request) {
  const cache = await caches.open(DYNAMIC_CACHE_NAME);
  try {
    const response = await fetch(request);
    cache.put(request, response.clone());
    return response;
  } catch (error) {
    return await cache.match(request);
  }
}
