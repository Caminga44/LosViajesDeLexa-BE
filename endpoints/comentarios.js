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
            if(isNaN(parseInt(id))){
                callback(400, {message:'El id debe ser un número'});
                return;
            }else{
            connection.query('SELECT c.id AS id, c.texto AS texto, c.publicacionId AS publicacionId, u.alias AS usuario FROM comentarios c INNER JOIN usuarios u on c.usuarioId = u.id  WHERE publicacionId = ?', [id], (err, rows) => {
                checkError(err);
                callback(200, rows);
            })
        }
        }else{
            connection.query('SELECT * FROM comentarios', (err, rows) =>{
                checkError(err);
                callback(200, rows);
            })}
    },
    post: (data, callback) => {
        const {texto, id, user} = data.payload;
        if (!texto){
            callback (400, {message: 'El texto del comentario no puede ser nulo'})
            return;
        }
        connection.query('INSERT INTO comentarios (texto,publicacionId,usuarioId) VALUES (?,?,(SELECT id FROM usuarios WHERE alias = ?))', [texto, id, user], (err) =>{
            checkError(err);
            callback(201, {message:'Comentario creado correctamente'});
        })
    },
    put: (data, callback) => {
        const {texto} = data.payload;
        const id = data.id;
        if(!texto || isNaN(parseInt(id))){
            callback(400, {message: 'Asegurate que el texto o id no sean nulos'});
            return;
        }
        connection.query('UPDATE comentarios SET texto = ? WHERE id = ?', [texto, id], (err) =>{
                checkError(err);
                callback(200, {message: 'Comentario actualizado correctamente'})
            })
    },
    delete: (data, callback) => {
        const id = data.id;
        if(id){
          if(isNaN(parseInt(id))){ 
            callback(400, {message: 'El id solo debe ser un número'});
            return;
          }else{
            connection.query('DELETE FROM comentarios WHERE id = ?' , [id], (err) => {
                checkError(err);
                callback(200, {message: 'Comentario eliminado correctamente'})
            })
        }
    }
}
}