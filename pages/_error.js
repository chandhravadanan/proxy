
import React from 'react'
import parser from '../lib/parser'
var urlinfo = require('url')
import Router from 'next/router';

function Redirect(props) {
  return (
    <p>
      Ooops! something went wrong
    </p>
  )
}

Redirect.getInitialProps = ({ req, res, err }) => {

  if (res && res.statusCode === 404) {
    res.writeHead(302, {
      Location: '/fetch?uri=https://google.com'
    });
    res.end();
  } else if (err && err.statusCode === 404) {
    Router.push('/fetch?uri=https://google.com');
  }
  return {};
  /*
  try{
    let path = req.url
    console.log('path', path)
    let referer = req.headers.referer;
    if(referer){
        console.log('referer ', referer)
        let actualUrl = referer.split('?uri=')[1]
        console.log('actual url ', actualUrl)
        let info = urlinfo.parse(actualUrl);
        let protocol = info.protocol
        let host = info.host
        let completeUrl = protocol+'//'+host+path
        let redirectUrl = 'http://localhost:3000/fetch?uri='+completeUrl
        console.log('redirected to '+ redirectUrl)
        res.status = 302
        res.writeHead(302, {Location: redirectUrl});
        res.end();
        /*
        parser.fetchAndParse(protocol, host, completeUrl, req.headers, (status, content, headers)=>{
          res.staus = status
          res.headers = headers
          res.end(content)
        })
        return new Promise((req, res)=>{})
    }
  }catch(e){
    console.log('error',  e)
  }*/

  return {}
}

export default Redirect

/*{
            "src": "^/fetch(.*)",
            "dest": "/fetch$1"
        },
        {
            "src": "^/((?!_next|p).+)",
            "dest": "/fetch?uri=/$1"
        }*/