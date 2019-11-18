/*
console.log('loaded')


self.addEventListener('install', function(event) {
    console.log('install event triggered')
});

let allowedUrls = [
    'http://localhost:3000',
    'http://localhost:3000/',
    'http://localhost:3000/fetch'
]
self.addEventListener('fetch', (event) => {
    /*let url = event.request.url
    console.log('requested url', url)
    if(allowedUrls.indexOf(url)>-1){
        return
    }

    if(url.startsWith(allowedUrls[1])){
        let urlInfo = new URL(url)
        let newUrl = allowedUrls[2] + '?url=' + urlInfo.pathname
        console.log('newurl', newUrl)
        return
    }

    let newUrl = allowedUrls[2] +'?url=' + url
    console.log('newurl', newUrl)*/

    /*console.log(document)
    let url = event.request.url
    console.log('requested url '+ url)
    if(url.indexOf('/fetch?uri=')==-1){
        let urlInfo = new URL(url)
        let newUrl = urlInfo.protocol+'//'+ urlInfo.host +'/fetch?uri='+ urlInfo.pathname
        console.log('newurl ' + newUrl)
    }*/
    //console.log('req ', event.request)
    //event.respondWith(event.request);
//});
