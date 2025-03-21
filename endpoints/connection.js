const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234'
});

connection.connect ((err) =>{
    if(err){
        console.log('Error al conectar a la base de datos', err);
        return;
    }
    connection.query('CREATE DATABASE IF NOT EXISTS lvdl', (err) =>{
        if(err){
            console.log('Error al crear la base de datos', err);
            return;
        }
    });
    connection.changeUser ({database: 'lvdl'}, (err) =>{
        if(err){
            console.log('Error al seleccionar la base de datos', err);
            return;
        }
    });
    connection.query('CREATE TABLE IF NOT EXISTS provincias (id INT AUTO_INCREMENT PRIMARY KEY, nombre VARCHAR(50))', (err) =>{
        if (err){
            console.log('error al crear la tabla provincias', err);
            return;
        }
    });
    connection.query('CREATE TABLE IF NOT EXISTS ciudades (id INT AUTO_INCREMENT PRIMARY KEY, nombre VARCHAR(50), provinciaId INT, CONSTRAINT FK_ProvinciaCiudad FOREIGN KEY (provinciaId) REFERENCES provincias (id))', (err) =>{
        if(err){
              console.log('Error al crear la tabla ciudades', err);
                return;
            }
            //, publicacionId INT, CONSTRAINT FK_PublicacionComentario FOREIGN KEY (publicacionId) REFERENCES publicaciones (id)
    });
    connection.query ('CREATE TABLE IF NOT EXISTS comentarios (id INT AUTO_INCREMENT PRIMARY KEY, texto VARCHAR(500))', (err) =>{
        if(err){
              console.log('Error al crear la tabla comentarios', err);
                return;
            }
    });


    console.log('Conectado a la base de datos');
});


module.exports = connection;