const CACHE = 'ptn-link-v2';
const SHELL = [
  './',
  './index.html',
  './offline.html',
  './manifest.json',
  './android-chrome-192x192.png',
  './android-chrome-512x512.png',
  './apple-touch-icon.png',
  './favicon.ico',
  './favicon-16x16.png',
  './favicon-32x32.png'
];

// ติดตั้ง: เก็บไฟล์หลักไว้ในแคช
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)));
  self.skipWaiting();
});

// เปิดใช้งาน: ลบแคชเวอร์ชันเก่า
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

  // หน้าเว็บ: ดึงจากเน็ตก่อน ถ้าออฟไลน์ใช้ offline.html
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).catch(() => caches.match('./offline.html')));
    return;
  }

  // ไฟล์อื่น: ดึงจากเน็ตก่อน แล้วอัปเดตแคช / ถ้าออฟไลน์ใช้แคช
  e.respondWith(
    fetch(req)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy));
        return res;
      })
      .catch(() => caches.match(req))
  );
});
