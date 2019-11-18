import parser from "../lib/parser"

const Anything = (probs) =>{
    return <div>
        Oops! Something went wrong
    </div>
}

Anything.getInitialProps = (context) =>{
    let { req, res, query } = context
    let path = req.url
    let referer = req.headers.referer;
    console.log('requested '+ path+' from referer '+ referer);
    res.end('Anything page requested')
    return new Promise((req, res)=>{})
}

function redirect(res, path){
    res.writeHead(302, {Location: path});
    res.end();
}

export default Anything;