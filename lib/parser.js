

const urllib = require('url');
import request from 'request'

var urlMatchRegex = /\s(href|accesskey|background|cite|classid|codebase|data|longdesc|profile|src|usemap|itemtype|srcset)=("|')([^"']+)/g 

function parseWebContent(protocol, host,  content) {
    let protoPrefix = protocol + '//';

    content = content.replace(urlMatchRegex, function(){
        if(arguments.length>3){ 
            let parsedUrl = arguments[3];
            if(parsedUrl.startsWith('//')){
                parsedUrl = protocol + parsedUrl;
            }else if(parsedUrl.startsWith('/')){
                parsedUrl = protoPrefix + host + parsedUrl;
            }else if(!parsedUrl.startsWith('http://') &&!parsedUrl.startsWith('https://')){
                parsedUrl = protoPrefix + host + '/' + parsedUrl;
            }  
            return ' '+arguments[1]+'="https://proxy.now.sh/fetch?uri='+parsedUrl
        }
    });
    return content;
}

function parseCookie(req, path){
    try{
        let cookies = req.headers.cookie
        cookies = cookies.split('; ');
        for (var i = 0; i < cookies.length; i++) {
            var cur = cookies[i].split('=');
            if(cur[0]==='proxy_domain'){
                let urlInfo = urllib.parse(cur[1])
                let protocol = urlInfo.protocol
                let host = urlInfo.host
                let url = protocol+'//'+host+path
                return { protocol, host, url};
            }
        }
    }catch(e){
        console.log(e)
    }
    return {}
}

function fetchAndParse(protocol, host, completeUrl, headers, cb){
    
    let options = {
        uri : completeUrl,
        headers : {
            cookie : headers.cookie
        }
    }
 
    request(options, function (error, response, body) {
        let status = response ? response.statusCode : 200
        if(error){
            console.log(error)
            cb(status, 'Ooops! something went wrong')
            return;
        }
        if(body){
            body = parseWebContent(protocol, host,  body) 
            cb(status, body, response.headers)  
        }
        
    });
}

export default {
    parseWebContent,
    parseCookie,
    fetchAndParse
}