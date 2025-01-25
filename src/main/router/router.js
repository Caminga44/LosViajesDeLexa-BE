const ciudades = require('./ciudades/ciudades');
const provincias = require('./provincias/provincias');
const comentarios = require('./comentarios/comentarios');
module.exports = {
    notFound: (_data, callback) => {
        callback(statusCode = 404, message = 'No se ha encontrado la ruta');
    },
    main: (data, callback) => {
        callback(statusCode = 200, message = 'Estas en la home');
    },
    ciudades,  
    provincias,
    comentarios,
}; 