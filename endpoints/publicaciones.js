const connection = require('./connection');

function checkError(err){
    if(err){
        console.log (err)
        callback(500, {message: 'Error en la base de datos'})
        return;
    }
}

module.exports = {
    get:(data, callback) =>{
        const {id} =data; 
        if(!isNaN(parseInt(id))){
            connection.query('SELECT p.id as id, c.nombre as ciudad, p.img as image, c.id as ciudadId, '+
            'p.provinciaId as provinciaId, p.text as text, CASE WHEN p.comentarioId IS NOT NULL '+
            'THEN com.texto ELSE null END as comentario '+
            'FROM publicaciones p ' +
            'LEFT JOIN comentarios com ON p.ciudadId = ciudadId '+
            'INNER JOIN ciudades c ON p.ciudadId = ciudadId', [id], (err, rows) => {
                    checkError(err);
                rows.filter((publicacion)=>{
                    if(publicacion.id == id){
                        return callback (200, publicacion)
                    }
                })
                return callback(404, {message:'Publicacion no encontrada'})
            })
        } else {
            connection.query('SELECT * FROM publicaciones', (err,rows) =>{
                checkError(err);
                callback(200,rows);
                return;
            })
        }
    },
    post: (data, callback) => {
        connection.query('INSERT INTO publicaciones SET text = ?, ciudadId = (SELECT id FROM ciudades WHERE nombre = ? LIMIT 1), provinciaId = (SELECT id FROM provincias WHERE nombre = ? LIMIT 1), img = ?',
            [data.payload.texto, data.payload.ciudad, data.payload.provincia, data.payload.img], (err, _) => {
                checkError(err);
                callback (201, {message: 'Se ha posteado la publicación'});
                return;
            })
    },
    put:(data, callback) => {
        const {id} = data;
        if(isNaN(parseInt(id))){
            callback(400, {message: 'El id debe ser un número'});
            return;
        }else{
            connection.query ('UPDATE publicaciones Set text = ?, ciudadId = (SELECT id FROM ciudades WHERE nombre = ? LIMIT 1), provinciaId = (SELECT id FROM provincias WHERE nombre = ? LIMIT 1), img = ? WHERE id = ?', [data.payload.texto, data.payload.ciudad, data.payload.provincia, data.payload.image, id], (err,_rows) =>{
                checkError(err);
                callback (200, {message: ' Se ha actualizado la publicación'})
            })
        }
    },
    delete: (data, callback) =>{
         const {id} = data;
         if (isNaN(parseInt(id))){
            callback(400, {message: 'El id debe ser un número'});
            return;
         }else{
            connection.query('DELETE FROM publicaciones WHERE id = ?', id, (err, _rows) => {
                checkError(err);
                callback(200, {message: 'Se ha eliminado la publicación'})
            })
         }
    },
}