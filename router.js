const provincias = require('./endpoints/provincias')
const ciudades = require('./endpoints/ciudades')
module.exports ={
    main: (data, callback)=>{
        callback (200, {message: 'hello'});
    },
    notFound: (data, callback)=>{
        callback (404, {message: 'not found'});
    },
    provincias,
    ciudades,
}