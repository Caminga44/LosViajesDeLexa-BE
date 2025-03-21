const connection = require('./connection');

function checkError(err) {
    if (err){
        callback(500, {message: 'Error en la base de datos'})
        return;
   }
}

module.exports = {
    get: (data, callback) =>{
        const {id} = data; //si en data existe id me lo guardas {}
        if(id){
            if(isNaN(parseInt(id))){
                callback(400, {message: 'El id debe ser un número'});
                return;
            } else{
                connection.query ('SELECT * FROM provincias WHERE id = ?', [id], (err, rows) => {
                    checkError(err);
                    if(rows.length === 0){
                        callback (404, {message: 'Provincia no encontrada'});
                        return;
                    }else{
                        callback (200, rows[0]);
                    }
                })
            }
        }else{
            connection.query ('SELECT * FROM provincias' , (err, rows) =>{
            checkError(err);
                callback (200, rows);
            })
        }
    },
    post: (data, callback) => {
        const {nombre} = data.payload;
        if (!nombre){
        callback (400, {message: 'El nombre de la provincia no puede ser nulo'});
        return;
        }
        connection.query ('INSERT INTO provincias (nombre) VALUES (?)', [nombre], (err) =>{
            checkError(err);
            callback(201, {message:'Provincia creada correctamente'});
        })
    },
    put: (data, callback) =>{
        const {nombre} = data.payload;
        const id = parseInt(data.id);
        if(!nombre || isNaN(id)){
            callback (400, {message: 'Asegurate que el nombre o id no sean nulos'});
            return;
        } else {
        connection.query ('UPDATE provincias SET nombre = ? WHERE id  = ?', [nombre, id], (err) =>{
            checkError(err);
            callback(200, {message: 'Provincia actualizada correctamente'})
        })}
    },
    delete: (data, callback) => {
        const id = parseInt(data.id);
        if(isNaN(id)){
            callback (400, {message: 'Asegurate que el nombre o id no sean nulos'});
            return;
        } else {
            connection.query('DELETE FROM provincias WHERE id = ?', [id],(err => {
                checkError(err);
                callback(200,{message: 'Provincia eliminada correctamente'});
            })
            )
        }
    }
}