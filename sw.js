const VERSION = '0.0.0-0.alpha'
const CACHE = 'static-v1'
const toUpdate = ['index.html','manifest.json', 'js/main.hs', 'js/lib/ga.js', 'js/lib/adapter-latest.js']
var reloadFlag = 0

self.addEventListener('install', event => {
    console.log('installing...')
    event.waitUntil(
        caches.open(CACHE)
        .then(cache => cache.addAll(toUpdate))
        .then(self.skipWaiting())
    );
    reloadFlag = 1
});

self.addEventListener('activate', event => {
    console.log(`${CACHE} now ready to handle fetches.`);
    console.log('VERSION', VERSION)
});

self.addEventListener('fetch', function(event) {
    const url = new URL(event.request.url);
    const pathList = url.pathname.split('/').filter( x => x != '')
    reloadFlag = pathList[0] == "socket.io" || reloadFlag == 1 ?
        0
    : 
        0 (() => { event.respondWith(caches.match(url.pathname)); return 0 })()
});