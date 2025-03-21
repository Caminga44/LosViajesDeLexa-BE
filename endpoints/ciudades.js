const connection = require('./connection');

function checkError(err) {
    if(err){
        cancelIdleCallback(500, {message: 'Error en la base ded datos'})
        return;
    }
}

module.exports = {
    get: (data, callback) => {
        const {id} = data;
        if(id) {
            connection.query('SELECT * FROM ciudades WHERE id = ?', [id], (err, rows) =>{
                checkError(err);
                callback(200, rows[0]);
            })
            return;
        }else{
            connection.query('SELECT * FROM ciudades', (err, rows) => {
                checkError(err),
                callback(200,rows);
            })}
    },
    post: (data, callback) => {
        const {nombre} = data.payload;
        if(!nombre){
            callback(400, {message: 'El nombre de la ciudad no puede ser nulo'});
            return;
        }
        connection.query('INSERT INTO ciudades (nombre) VALUES (?)', [nombre], (err) => {
            checkError(err);
            callback(201, {message: 'Ciudad creada correctamente'});
        })
    },
    put: (data, callback) => {
        const {nombre} = data.payload;
        const id = data.id;
        if(!nombre || isNaN(id)){
            callback(400, {message: 'Asegurate que el nombre o id no sean nulos'});
            return;
        }else{
            connection.query ('UPDATE ciudades SET nombre = ? WHERE id =?', [nombre, id], (err) => {
                checkError(err);
                callback(200, {message:'Ciudad actualizada correctamente '})
            })}
    },
    delete: (data, callback) =>{
        const id = parseInt(data.id);
        if(isNaN(id)){
            callback(400, {message: ' Asegurate que el nombre o id no sean nulos'});
            return;
        }else{
            connection.query('DELETE FROM ciudades WHERE id = ?', [id], (err) => {
                checkError(err);
                callback(200, {message: 'Ciudad eliminada correctamente'});
            })
        }
    }
}