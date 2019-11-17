
import request from 'request';

const Fetch = (probs) =>{
    return <div>
        Oops! Something went wrong
    </div>
}

Fetch.getInitialProps = (context) =>{
    let { res, query} = context;
    let uri = query.uri
    request.get(uri).pipe(res)
    return new Promise((req, res)=>{})
}

export default Fetch;
