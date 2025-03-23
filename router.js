const provincias = require('./endpoints/provincias')
const ciudades = require('./endpoints/ciudades')
const comentarios = require('./endpoints/comentarios')
const usuarios = require('./endpoints/usuarios')
const publicaciones = require('./endpoints/publicaciones')
module.exports ={
    main: (data, callback)=>{
        callback (200, {message: 'hello'});
    },
    notFound: (data, callback)=>{
        callback (404, {message: 'not found'});
    },
    provincias,
    ciudades,
    comentarios,
    usuarios,
    publicaciones
}