self.addEventListener('install', event => {
    console.log('Service worker installed at: ' + new Date().toLocaleTimeString());

    event.waitUntil(
        caches.open('v1').then(cache => {
            return cache.addAll([
                '/',
                '/index.html',
                '/css/style.css',
                '/script/script.js',
                '/script/camera.js',
                '/script/geo-location.js',
                '/script/lightbox.js',
                '/script/notifcations.js',
                '/manifest.webmanifest',
                '/img/sample-image-1.png',
                '/img/sample-image-2.png'
            ])
        })
    )
})

self.addEventListener('activate', event => {
    console.log('Service worker activates at: ' + new Date().toLocaleTimeString());
})

self.addEventListener('fetch', event => {
    console.log('Service worker fetching resource: ', event.request.url);
    // om vi är online - gör ett vanligt request + spara resultatet
    // om vi är offline - leta efter ett sparat response

    if( navigator.onLine ) {
        console.log('Fetch: online');
        event.respondWith( fetch(event.request).then(response => {
            // Innan vi skickar tillbaka response till webbläsaren - spara en kopia av response i cache
            let clone = response.clone();
            caches.open('v1').then(cache => {
                cache.put(event.request, clone);
            })
            return response;
        }) )
    }
    else {
        console.log('Fetch: offline, request url is:', event.request.url);
        // Vi är offline. Leta först efter ett matchande request i cache. Om det inte finns, returnera en offline-sida.

        event.respondWith( caches.match(event.request).then(maybeResponse => {
            if( maybeResponse !== undefined ) {
                // Tur! Vi har sparat resultatet från ett liknande request tidigare
                console.log('Fetch: maybeResponse=', maybeResponse);
                return maybeResponse;
            } else {
                // Aj då, det fanns inget cachat resultat. Nu gäller det att returnera något vi kan visa användaren i stället.
                // Obs! Vi kan titta på event.request.url för att se vilken URL man efterfrågade. Om användaren frågade efter en HTML-fil: svara med offline.html.
                console.log('Fetch: returns new response');
                return new Response('<h1> No internet </h1>', { headers: { 'Content-Type': 'text/html' }})
            }
        }))
    }
})

// Session storage - försvinner när vi startar om appen
// Local storage - är till för att spara data
// Cache - är till för att spara filer
