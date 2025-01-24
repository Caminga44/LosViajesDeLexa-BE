const url = require('url');
const stringDecoder = require('string_decoder').StringDecoder;
const router = require('./router');

module.exports = (req,res) => {

    const urlGross = req.url;
    const urlParsed = url.parse(urlGross, true);

    const path = urlParsed.pathname;
    const pathClean = path.replace(/^\/+|\/+$/g, '');
    const decoder = new stringDecoder('utf-8');
    let buffer ='';

    req.on('data', (data) => {
        buffer += decoder.write(data);
    })
    req.on('end', () => { 
        buffer += decoder.end();
        if(req.headers['content-type']==='application/json'){
            buffer = JSON.parse(buffer);
        }
        const data = {
            path:pathClean, 
            method:req.method.toLowerCase(),
            query:urlParsed.query,
            header:req.headers,
            payload:buffer,
        }
        let handler;
        if(pathClean === '') {
            handler = router.main;
        } else if(pathClean && router[pathClean]){
            if(router[pathClean][data.method]) {
            handler = router[pathClean][data.method];
            } else {
                handler = router[pathClean]
            }
        } else {
            handler = router.notFound;
        }
        if(typeof handler==='function'){
            handler(data, (statusCode = 200, payload = {})=> {
             const payloadClean = JSON.stringify(payload);
             res.setHeader('content-type', 'application/json');
             res.writeHead(statusCode);
             res.end(payloadClean);
            })
           
        }
    } )
}