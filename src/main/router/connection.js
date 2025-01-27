const mysql = require ('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
})

connection.connect(function(err){
    if(err) {
        console.log('Error connecting to DB: ', err);
        return;
    }
    connection.query('CREATE DATABASE IF NOT EXISTS lvdl', (err) => {
        if(err){
            console.log('err db create <<<<<<<<<<<<<<', err)
            console.log('La base de datos ya existe');
            return
        }
    });
    connection.changeUser({database: 'lvdl'}, function(err){
        if(err){
            console.log('Error connecting to DB: ', err);
            return;
        }
        console.log('Connection to DB established');
    })
    connection.query('CREATE TABLE IF NOT EXISTS provincias (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(45))', (err) => {
        if(err){
            console.log('err table create <<<<<<<<<<<<<<', err)
            return
        }
        console.log('Tabla provincias creada');
    });
    connection.query('CREATE TABLE IF NOT EXISTS ciudades (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(45), provinciaId INT, CONSTRAINT FK_ProvinciaCiudad FOREIGN KEY (provinciaId) REFERENCES provincias(id))', (err) => {
        if(err){
            console.log('err table create <<<<<<<<<<<<<<', err)
            return
        }
        console.log('Tabla ciudades creada');
    });
    connection.query('CREATE TABLE IF NOT EXISTS comentarios (id INT AUTO_INCREMENT PRIMARY KEY, text VARCHAR(200))', (err) => {
        if(err){
            console.log('err table create <<<<<<<<<<<<<<', err)
            return
        }
        console.log('Tabla comentarios creada');
    });
    connection.query('CREATE TABLE IF NOT EXISTS publicaciones (id INT AUTO_INCREMENT PRIMARY KEY, img VARCHAR(200), provinciaId INT, ciudadId INT, favorito BOOLEAN, guardado BOOLEAN, comentarioId INT, CONSTRAINT FK_ProvinciaPublicacion FOREIGN KEY (provinciaId) REFERENCES provincias(id), CONSTRAINT FK_CiudadPublicacion FOREIGN KEY (ciudadId) REFERENCES ciudades(id), CONSTRAINT FK_ComentarioPublicacion FOREIGN KEY (comentarioId) REFERENCES comentarios(id))', (err) => {
        if(err){
            console.log('err table create <<<<<<<<<<<<<<', err)
            return
        }
        console.log('Tabla publicaciones creada');
    });
    connection.query('CREATE TABLE IF NOT EXISTS guardados (publicacionId INT AUTO_INCREMENT PRIMARY KEY, provinciaId INT, ciudadId INT, CONSTRAINT FK_PublicacionGuardado FOREIGN KEY (publicacionId) REFERENCES publicaciones(id), CONSTRAINT FK_CiudadGuardado FOREIGN KEY (ciudadId) REFERENCES ciudades(id), CONSTRAINT FK_ProvinciaGuardado FOREIGN KEY (provinciaId) REFERENCES provincias(id))', (err) => {
        if(err){
            console.log('err table create <<<<<<<<<<<<<<', err)
            return
        }
        console.log('Tabla guardados creada');
    });
})

module.exports = connection;