const connection = require ('../connection')


module.exports = {
    get: (data,  callback) => {
        connection.query('SELECT * FROM comentarios', (err, rows) =>{
            if(err){
                console.log ('La conexion ha fallado')
                callback (500, {message: 'La conexion ha fallado'})
                return
            }else if(data.id){
                let text;
                rows.filter( (texto) => {
                    if (texto.id == data.id){
                        text = texto
                    }
                })
                if(text){
                    return callback(200, text)
                }else{
                    return callback(404, {message: 'Comentario no encontrado'})
                }
            }else{
                callback(200, rows)
            }
        })
    },
    post:(data, callback) => {
        connection.query('INSERT INTO comentarios SET ?', data.payload, (err, _rows) => {
            if(err){
                console.log('La conexion ha fallado')
                callback(500, {message: 'La conexion ha fallado'})
                return
            }else{
                callback(201, {message: 'Se ha insertado el comentario'})
            }
        })
    },
    put:(darta, callback) => {
        connection.query('UPDATE comentarios SET ? WHERE id = ?', [data.payload, data.id], (err, _rows) =>{
            if(err){
                console.log('La conexion ha fallado')
                callback(500, {message: 'La conexion ha fallado'})
                return
            }else{
                callback(204, {message: 'Se ha actualizado el comentario'})
            }
        })
    },
    delete:(data, callback) => {
        connection.query ('DELETE FROM comentarios WHERE id = ?', data.id, (err, _rows) => {
            if(err){
                console.log('La conexion ha fallado')
                callback (500, {message: 'La conexion ha fallado'})
                return
            }else{
                callback (200, {message: 'Se ha eliminado el comentario'})
            }
        })
    },
}