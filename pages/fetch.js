
import parser from '../lib/parser';
import urllib from 'url'

const Fetch = (probs) =>{
    return <div>
        Oops! Something went wrong
    </div>
}

Fetch.getInitialProps = (context) =>{
    let { req, res, query} = context;
   
    console.log('uri ', query.uri)
    console.log('referer ', req.headers.referer)
    let { protocol, host, uri }  = parseReq(req, query.uri)
    
    parser.fetchAndParse(protocol, host, uri, req.headers, (status, content, headers)=>{
        res.staus = status
        //res.headers = headers
        res.setHeader('content-type', headers['content-type'])
        //console.log('headers ', res.headers)
        res.end(content)
    })
    /*
    let options = {
        uri : uri,
        headers : {
            cookie : req.headers.cookie
        }
    }
 
    request(options, function (error, response, body) {
        if(error){
            console.log(error)
            res.end('Ooops! something went wrong')
            return
        }
        if(body){
            body = urlparser.parseWebContent(protocol, host,  body) 
            res.headers = response.headers
            res.end(body)  
        }
        
    });
    */
    return new Promise((req, res)=>{})
}


function parseReq(req, uri){
    let urlInfo = urllib.parse(uri)

    let protocol = urlInfo.protocol
    let host = urlInfo.host

    //return { protocol, host, uri }
    
    if(protocol && host){
        return {protocol, host, uri}
    }

    try{
        let referer = req.headers.referer
        let actualUrl = referer.split('?uri=')[1]
        let info = urllib.parse(actualUrl);
        let protocol = info.protocol
        let host = info.host
        console.log('uri changed to '+ uri)
        uri = protocol+'//'+host+ uri
        console.log('new uri '+ uri)
        return { protocol, host, uri}
        /*cookies = cookies.split('; ');
        for (var i = 0; i < cookies.length; i++) {
            var cur = cookies[i].split('=');
            if(cur[0]==='proxy_domain'){
                let urlInfo = urllib.parse(cur[1])
                protocol = urlInfo.protocol
                host = urlInfo.host
                url = protocol+'//'+host+url
                return { protocol, host, url};
            }
        }*/
    }catch(e){
        console.log(e)
    }
    return {}
}
export default Fetch;
