const provincias = require('./endpoints/provincias')
module.exports ={
    main: (data, callback)=>{
        callback (200, {message: 'hello'});
    },
    notFound: (data, callback)=>{
        callback (404, {message: 'not found'});
    },
    provincias,
}