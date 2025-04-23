const connection = require('./connection');

function checkError(err){
    if(err){
        console.log(err)
         callback(500, {message: 'Error en la base de datos'});
         return;   
    }
}

module.exports = {
    get:(data, callback) =>{
        const ciudad = decodeURIComponent(data.id)
        const query = 'SELECT c.nombre as ciudad, p.id as id, p.img as image, c.id as ciudadesId, p.provinciaId as provinciaId, p.texto as text ' +
        'FROM publicaciones p ' +
        'INNER JOIN ciudades c ON p.ciudadId = c.id';
        connection.query(query,ciudad, (err, rows) => {
            checkError(err);
            if(ciudad != 'null'){
                let find = false;
                rows.filter((response) => {
                    if(response.ciudad == ciudad){
                        find = true
                        return callback(200, response);
                    }
                })
                if(!find){
                    return callback(404, {message: 'Publicación no encontrada'})
                }
            }else{
                callback(200, rows);
                return;
            }
        })
    },
    post: (data, callback) => {
        const {texto, ciudad, provincia, img} = data.payload;
        connection.query('INSERT INTO publicaciones SET texto = ?, ciudadId = (SELECT id FROM ciudades WHERE nombre = ? LIMIT 1), provinciaId = (SELECT id FROM provincias WHERE nombre = ? LIMIT 1), img = ?',
            [texto, ciudad, provincia, img], (err, _) => {
                checkError(err);
                callback (201, {message: 'Se ha posteado la publicación'});
            })
    },
    put:(data, callback) => {
        const {id} = data;
        const {texto, ciudad, provincia, img} = data.payload;
        if(isNaN(parseInt(id))){
            callback(400, {message: 'El id debe ser un número'});
            return;
        }else{
            connection.query ('UPDATE publicaciones SET img = ?, texto = ?,  provinciaId = (SELECT id FROM provincias WHERE nombre = ? LIMIT 1), ciudadId= (SELECT id FROM ciudades WHERE nombre = ?) WHERE id = ?', [img, texto, provincia, ciudad, id], (err,_rows) =>{
                checkError(err);
                callback (204, {message: ' Se ha actualizado la publicación'})
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