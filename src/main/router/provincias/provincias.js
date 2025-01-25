const connection= require('../connection')


module.exports = {
    get: (data, callback) => {
        connection.query('SELECT * FROM provincias', (err, rows) => {
            if(err){
                console.log('La conexion ha fallado')
                callback(500, {message: 'La conexion ha fallado'})
                return
            }else if(data.id){
                let prov;
                rows.filter( (provincia) => {
                    if (provincia.id == data.id) {
                        prov = provincia
                    }
                })
                if(prov){
                    return callback (200, prov)
                } else {
                return callback (404, {message:'Provincia no encontrada'})
                }
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
            if (err){
                console.log('La conexion ha fallado')
                callback (500, {message: 'La conexion ha fallado'})
                return
            }else{
                callback (200, {message: 'Se ha eliminado la provincia'})
            }
        })
    }
}