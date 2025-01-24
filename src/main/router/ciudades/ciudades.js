const connection = require ('../connection')


module.exports = {
        get:(_data, callback) => {
          connection.query('SELECT * FROM ciudades', (err, rows) => {
            if(err){
                console.log('La conexion ha fallado')
                callback (500, {message: 'La conexion ha fallado'})
                return
            }else{
                callback (200, rows)
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
                    callback (201, 'Se ha insertado la ciudad')
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
        delete:(data,callback) => {
            connection.query('DELETE FROM ciudades WHERE id = ?', data.id, (err, _rowa) => {
                if(err){
                    console.log('La conexion ha fallado')
                    callback (500, {message: 'La conexion ha fallado'})
                    return
                }else{
                    callback (200, {message: 'Se ha eliminado la ciudad'})
                } 
            }
            )
        },
    }
