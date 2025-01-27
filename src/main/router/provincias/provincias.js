const connection= require('../connection')


module.exports = {
    get: (data, callback) => {
        connection.query('SELECT * FROM provincias ORDER BY provincias.id', (err, rows) => {
            if(err){
                console.log('La conexion ha fallado')
                callback(500, {message: 'La conexion ha fallado'})
                return
            }else if(data.id){
                let prov;
                rows.filter( (provincia) => {
                    if (provincia.id == data.id) {
                        connection.query('SELECT c.id as id, c.name as name FROM ciudades c INNER JOIN provincias p ON p.id = c.provinciaId WHERE p.name = ?', provincia.name, (err, rows) => {
                            if (err){
                                prov = provincia
                                callback (500, {message: 'Ha habido problemas al recuperar las ciudades de la provincia'})
                                return
                            } else {
                                prov = {
                                    id: provincia.id,
                                    name: provincia.name,
                                    ciudades: rows
                                }
                            }
                            if(prov){
                                return callback (200, prov)
                            } else {
                                return callback (404, {message:'Provincia no encontrada'})
                            }
                        })
                    }
                })
            }else{
                callback(200, rows)
            }
        })
    },
    post: (data, callback) => {
        connection.query('INSERT INTO provincias SET ?', data.payload, (err, _rows) =>{
            if(err){
                console,log('La conexion ha fallado')
                callback(500, {message: 'La conexion ha fallado'})
                return
            }else{ 
                callback(201, {message: 'Se ha insertado la provincia'} )
            }
        })
    },
    put: (data, callback) => {
        connection.query('UPDATE provincias SET ? WHERE id = ?', [data.payload, data.id], (err, _rows) => {
            if (err){
                console.log('La conexion ha fallado')
                callback (500, {message: 'La conexion ha fallado'})
                return
            }else{
                callback(204, {message:'Se ha actualizado la provincia'})
            }
        })
    },
    delete: (data, callback) =>{
        
        connection.query('DELETE FROM provincias WHERE id = ?', data.id, (err, _rows) => {
            if(err){
                console.log('La conexion ha fallado', err)
                callback (500, {message: 'La conexion ha fallado'})
                return
            }else{
                connection.query('update provincias set id = id - 1 where id > ?', data.id, (err, _rows) => {
                    if(err){
                        console.log('La base de datos no se ha reordenado', err)
                    }
                    connection.query('ALTER TABLE provincias AUTO_INCREMENT = ?', parseInt(data.id), (err, _rows) => {
                        console.log('La base de datos se ha reordenado')
                    })
                    callback (200, {message: 'Se ha eliminado la provincia'})
                })
            } 
        })
    }
}