
import request from 'request';
import urlparser from '../lib/parser';
import urllib from 'url'

const Fetch = (probs) =>{
    return <div>
        Oops! Something went wrong
    </div>
}

Fetch.getInitialProps = (context) =>{
    let { req, res, query} = context;
   
    let { protocol, host, uri }  = parseReq(query.uri)
    
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
            //let cookieStr= 'proxy_domain='+ (protocol+'//'+host)
            //res.setHeader("Set-Cookie", cookieStr);
            res.end(body)  
        }
        
    });
    return new Promise((req, res)=>{})
}


function parseReq(uri){
    let urlInfo = urllib.parse(uri)

    let protocol = urlInfo.protocol
    let host = urlInfo.host

    return { protocol, host, uri }
    /*
    if(protocol && host){
        return {protocol, host, url}
    }

    try{
        let cookies = req.headers.cookie
        cookies = cookies.split('; ');
        for (var i = 0; i < cookies.length; i++) {
            var cur = cookies[i].split('=');
            if(cur[0]==='proxy_domain'){
                let urlInfo = urllib.parse(cur[1])
                protocol = urlInfo.protocol
                host = urlInfo.host
                url = protocol+'//'+host+url
                return { protocol, host, url};
            }
        }
    }catch(e){
        console.log(e)
    }
    return {}
    */
}
export default Fetch;
