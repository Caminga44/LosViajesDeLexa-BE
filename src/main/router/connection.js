const mysql = require ('mysql');
let connection = mysql.createConnection({
    host: 'localhost',
    database: 'lvdl',
    user: 'root',
    password: 'admin',
});

connection.connect((err) => {
    if (err) {
        console.log('err <<<<<<<<<<<<<<', err)
        console.log('La conexión a la base de datos ha fallado');
        return
    }else{
        console.log('La base datos está conectada');
    }
});

module.exports = connection;