const connection = require('./connection');

function checkError(err){
    if(err){
        callback(500, {message: 'Error en la base de datos'})
        return;
    }
}

module.exports = {
    get: (_, callback) => {
        connection.query('SELECT * FROM usuarios', (err, rows) => {
            checkError(err);
            const result = rows.filter((usuario) => {
                if(usuario.deleted != 1){
                    return usuario;
                }
            })
            return callback(200, result);
        })
    },
    post: (data,callback) => {
        connection.query ( 'SELECT * FROM usuarios', (err, rows) =>{
            checkError(err);
            if(data.payload.creation){
                let user;
                if(rows.length < 1) {
                    user = {alias: data.payload.alias, clave: data.payload.clave, admin: 1}
                } else {
                    user = {alias: data.payload.alias, clave: data.payload.clave}
                }
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
                   const user ={alias: data.payload.alias, clave: data.payload.clave, deleted: data.payload.deleted}
                   if(usuario.alias == user.alias && usuario.clave == user.clave && usuario.deleted != 1){
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
        const user = {alias: data.payload.alias, clave: data.payload.clave, admin: data.payload.admin}
        const oldAlias = data.payload.oldAlias;
        connection.query('UPDATE usuarios SET ? WHERE alias = ?', [user, oldAlias], (err, _rows) =>{
            if(err){
                callback(500, {message: 'La conexión ha fallado'})
                return;
            }else{
                callback(204, {message: 'Se ha actualizado el usuario'})
            }
        })
    },
    delete: (data, callback) => {
        const {alias} = data.payload;
        connection.query('UPDATE usuarios SET deleted = 1 WHERE alias = ?', alias, (err, _rows) =>{
           checkError(err);
           callback(200, {message: 'Se ha eliminado el usuario'})
        })
    }
}