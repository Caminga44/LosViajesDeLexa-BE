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
            console.log('Error al crear la tabla provincias', err);
            return;
        }
    });
    connection.query('CREATE TABLE IF NOT EXISTS ciudades (id INT AUTO_INCREMENT PRIMARY KEY, nombre VARCHAR(50), provinciaId INT, CONSTRAINT FK_ProvinciaCiudad FOREIGN KEY (provinciaId) REFERENCES provincias (id))', (err) =>{
        if(err){
              console.log('Error al crear la tabla ciudades', err);
                return;
            }
    });
    connection.query('CREATE TABLE IF NOT EXISTS usuarios (id INT AUTO_INCREMENT PRIMARY KEY, alias VARCHAR(25), clave VARCHAR (25), admin BOOLEAN, deleted BOOLEAN, UNIQUE (alias))', (err) => {
        if(err){
            console.log('Error al crear la tabla usuarios', err);
            return
        }
    });
    connection.query('CREATE TABLE IF NOT EXISTS publicaciones (id INT AUTO_INCREMENT PRIMARY KEY, img VARCHAR(500), texto VARCHAR (1000), provinciaId INT, ciudadId INT, CONSTRAINT FK_ProvinciaPublicacion FOREIGN KEY (provinciaId) REFERENCES provincias(id), CONSTRAINT FK_CiudadPublicacion FOREIGN KEY (ciudadId) REFERENCES ciudades(id))', (err) =>{
        if(err){
            console.log('Error al crear la tabla publicaciones', err);
            return;
        }
    })
    connection.query ('CREATE TABLE IF NOT EXISTS comentarios (id INT AUTO_INCREMENT PRIMARY KEY, texto VARCHAR(1000), publicacionId INT, usuarioId INT, CONSTRAINT FK_PublicacionComentario FOREIGN KEY (publicacionId) REFERENCES publicaciones(id), CONSTRAINT FK_UsuarioComentario FOREIGN KEY (usuarioId) REFERENCES usuarios(id))', (err) =>{
        if(err){
              console.log('Error al crear la tabla comentarios', err);
                return;
            }
    });

    console.log('Conectado a la base de datos');
});


module.exports = connection;