const CACHE = 'ptn-link-v1';
const SHELL = [
  './',
  './index.html',
  './offline.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './favicon.ico'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  const url = new URL(req.url);

  // ไม่ยุ่งกับ GAS / Google / ไฟล์ข้ามโดเมน
  if (req.method !== 'GET' || url.origin !== self.location.origin) return;

  // หน้าเว็บ: ดึงจากเน็ตก่อน ถ้าไม่มีเน็ตใช้ offline.html
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).catch(() => caches.match('./offline.html'))
    );
    return;
  }

  // ไฟล์อื่น (ไอคอน ฯลฯ): ใช้แคชก่อน
  e.respondWith(
    caches.match(req).then((cached) => cached || fetch(req))
  );
});
