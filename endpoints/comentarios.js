const connection = require('./connection');

function checkError(err) {
    if(err){
        callback (500, {message: 'Error en la base de datos'})
            return;
    }
}

module.exports = {
    get: (data, callback) => {
        const {id} = data;
        if(id){
            connection.query('SELECT * FROM comentarios WHERE id = ?', [id], (err, rows) => {
                checkError(err);
                callback(200, rows[0]);
            })
            return;
        }else{
            connection.query('SELECT * FROM comentarios', (err, rows) =>{
                checkError(err);
                callback(200, rows);
            })}
    },
    post: (data, callback) => {
        const {texto} = data.payload;
        if (!texto){
            callback (400, {message: 'El texto del comentario no puede ser nulo'})
            return;
        }
        connection.query('INSERT INTO comentarios (texto) VALUES (?)', [texto], (err) =>{
            checkError(err);
            callback(201, {message:'Comentario creado correctamente'});
        })
    },
    put: (data, callback) => {
        const {texto} = data.payload;
        const id = parseInt(data.id);
        if(!texto || isNaN(id)){
            callback(400, {message: 'Asegurate que el texto o id no sean nulos'});
            return;
        }else{
            connection.query('UPDATE comentarios SET texto = ? WHERE id = ?', [texto, id], (err) =>{
                checkError(err);
                callback(200, {message: ' Comentario actualizado correctamente'})
            })}
    },
    delete: (data, callback) => {
        const id = parseInt(data.id);
        if(isNaN(id)){
            callback(400, {message: ' Asegurate que el texto o el id no sean nulos'});
            return;
        }else{
            connection.query('DELETE FROM comentarios where id = ?' , [id], (err) => {
                checkError(err);
                callback(200, {message: 'Comentario eliminado correctamente'})
            })
        }
    }
}