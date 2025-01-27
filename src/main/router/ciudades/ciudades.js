const connection = require ('../connection')


module.exports = {
    get:(data, callback) => {
            connection.query('SELECT c.id, c.name, p.name AS provincia FROM provincias p INNER JOIN ciudades c ON p.id = c.provinciaId ORDER BY c.id', (err, rows) => {
            if(err){
                console.log('La conexion ha fallado')
                return callback (500, {message: 'La conexion ha fallado'})
            }else if(data.id){
                let city;
                rows.filter( (ciudad) => {
                    if (ciudad.id == data.id) {
                        connection.query('SELECT c.name, p.name FROM provincias p INNER JOIN ciudades c ON p.id = c.provinciaId WHERE c.id = ?', ciudad.id, (err, rows) => {
                            if(err){
                                callback (500, {message: 'Ha habido problemas al recuperar la provincia'})
                                city = ciudad
                                return
                            } else {
                                city = {
                                    id: ciudad.id,
                                    name: ciudad.name,
                                    provincia: rows[0].name
                                }
                            }
                            if(city){
                                return callback (200, city)
                            } else {
                                return callback (404, {message:'Ciudad no encontrada'})
                            }
                        });
                    }
                })
            }else{
                return callback (200, rows)
            }
          })
        },
        post:(data, callback) => {
            connection.query('INSERT INTO ciudades SET ?', data.payload, (err, _rows) => {
                if(err){
                    console.log('La conexion ha fallado')
                    callback (500, {message: 'La conexion ha fallado'})
                    return
                }else{
                    callback (201, {message: 'Se ha insertado la ciudad'})
                }
            })
        },
        put:(data, callback) => {
            connection.query('UPDATE ciudades SET ? WHERE id = ?', [data.payload, data.id], (err, _rows) => {
                if(err){
                    console.log('La conexion ha fallado')
                    callback (500, {message: 'La conexion ha fallado'})
                    return
                }else{
                    callback (204, {message: 'Se ha actualizado la ciudad'})
                }
            } )
        },
        delete:(data, callback) => {
            connection.query('DELETE FROM ciudades WHERE id = ?', data.id, (err, _rows) => {
                if(err){
                    console.log('La conexion ha fallado')
                    callback (500, {message: 'La conexion ha fallado'})
                    return
                }else{
                    connection.query('update ciudades set id = id - 1 where id > ?', data.id, (err, _rows) => {
                        if(err){
                            console.log('La base de datos no se ha reordenado')
                        }
                        connection.query('ALTER TABLE ciudades AUTO_INCREMENT = ?', parseInt(data.id), (err, _rows) => {
                            console.log('La base de datos se ha reordenado',err)
                        })
                        callback (200, {message: 'Se ha eliminado la ciudad'})
                    })
                } 
            })
        },
    }
