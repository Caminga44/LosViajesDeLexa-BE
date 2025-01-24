const url = require('url');
const stringDecoder = require('string_decoder').StringDecoder;
const router = require('./router/router');

module.exports = (req,res) => {

    const urlGross = req.url;
    const urlParsed = url.parse(urlGross, true);

    const path = urlParsed.pathname;
    const pathClean = path.replace(/^\/+|\/+$/g, '');
    let id = null;
    let mainPath = pathClean;
    if(pathClean.indexOf('/') > -1){ 
        id = pathClean.split('/') [1];
        mainPath = pathClean.split('/') [0];
    }
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
            id: id,
            path:mainPath, 
            method:req.method.toLowerCase(),
            query:urlParsed.query,
            header:req.headers,
            payload:buffer,
        }
        let handler;
        if(mainPath === '') {
            handler = router.main;
        } else if(mainPath && router[mainPath]){
            if(router[mainPath][data.method]) {
            handler = router[mainPath][data.method];
            } else {
                handler = router[mainPath]
            }
        } else {
            handler = router.notFound;
        }
        if(typeof handler==='function'){
            handler(data, callback = (statusCode = 200, payload = {})=> {
             const payloadClean = JSON.stringify(payload);
             res.setHeader('content-type', 'application/json');
             res.writeHead(statusCode);
             res.end(payloadClean);
            })
           
        }
    } )
}