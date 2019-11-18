
import React from 'react'
var urlinfo = require('url')

function Error({ statusCode }) {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : 'An error occurred on client'}
    </p>
  )
}

Error.getInitialProps = ({ req, res, err }) => {
  let path = req.url
  let referer = req.headers.referer;
  if(referer){
      console.log('referer ', referer)
      let actualUrl = referer.split('?uri=')[1]
      console.log('actual url ', actualUrl)
      let info = urlinfo.parse(actualUrl);
      let protocol = info.protocol
      let host = info.host
      let redirectUrl = 'https://proxy.now.sh/fetch?uri='+protocol+'//'+host+path
      console.log('redirected to '+ redirectUrl)
      res.statusCode = 302
      res.writeHead(302, {Location: redirectUrl});
      res.end();
      return new Promise((req, res)=>{})
  }
  return {}
}

export default Error