
console.log('loaded')


self.addEventListener('install', function(event) {
    console.log('install event triggered')
});

self.addEventListener('fetch', (event) => {
    console.log('fetch ', event.request.url)
    //console.log('req ', event.request)
    //event.respondWith(event.request);
});
