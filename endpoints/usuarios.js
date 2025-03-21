const connection = require('./connection');

function checkError(err){
    if(err){
        cancelIdleCallback(500, {message: 'Error en la base de datos'})
        return;
    }
}

module.exports = {
    get: (data, callback) => {
        connection.query('SELECT * FROM usuarios', (err, rows) => {
            const {alias, clave} = data.payload;
            checkError(err);
                if(!alias && !clave){
                    callback(400, {message: 'Las dos credenciales son necesarias'});
                    return;
                }
            rows.filter((usuario) => {
                if(usuario.alias == alias && usuario.clave == clave){
                    return callback(200, {message: 'Credenciales correctas'})
                }
            })
            return callback(404, {message: 'Usuario no encontrado'})
        })
    },
    post: (data,callback) => {
        connection.query ( 'SELECT * FROM usuarios', (err, rows) =>{
            checkError(err);
            if(data.payload.creation){
                const user = {alias: data.payload.alias, clave: data.payload.clave}
                connection.query('INSERT INTO usuarios SET ?', user, (err, _rows) =>{
                    if(err){
                        callback(500, {message: 'La conexión ha fallado'})
                        return;
                    }else{
                        callback(201, {message:'Se ha insertado el usuario'})
                    }
                })
            }else if(data.payload){
                let find = false;
                rows.filter((usuario) => {
                    if(usuario.alias == data.payload.alias && usuario.clave == data.payload.clave){
                        find = true;
                        callback(200, usuario)
                        return;
                    }
                })
                if(!find){
                    callback(404, {message: 'Usuario no encontrado'})
                    return;
                }
            }else{
                callback(400, {message: 'Algo ha fallado'})
                return;
            }
        })
    },
    put: (data, callback) => {
        const user = {alias: data.payload.alias, clave: data.payload.clave}
        connection.query('UPDATE usuarios SET ? WHERE alias = ?', [user, user.alias], (err, _rows) =>{
            if(err){
                callback(500, {message: 'La conexión ha fallado'})
                return;
            }else{
                callback(201, {message: 'Se ha actualizado el usuario'})
                return;
            }
        })
    },
    delete: (data, callback) => {
        const {alias} = data.payload;
        connection.query('DELETE FROM usuarios WHERE alias = ?', alias, (err, _rows) =>{
            if(err){
                callback(500, {message: 'La conexión ha fallado'})
                    return;
            }else{
                callback(200, {message: 'Se ha eliminado el usuario'})
            }
        })
    }
}