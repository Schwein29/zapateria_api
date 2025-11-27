const mysql = require('mysql');

const dbconfig = {
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DB || 'zapateria',
};

let conexion;

function conexcionsql() {
    conexion = mysql.createConnection(dbconfig);

    conexion.connect(err => {
        if (err) {
            console.log(['db error'], err);
            console.log('MySQL no está listo, reintentando...');
            setTimeout(conexcionsql, 2000);
        } else {
            console.log('DB conectada');
        }
    });

    conexion.on('error', err => {
        console.log(['db error'], err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            conexcionsql();
        } else {
            throw err;
        }
    });
}

conexcionsql();


function todos(tabla) {
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla}`, (error, result) => {
            if (error) return reject(error);
            resolve(result);
        });
    });
}

function uno(tabla, id) {
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE id = ?`, [id], (error, result) => {
            if (error) return reject(error);
            resolve(result[0] || null);
        });
    });
}

function actualizar(tabla, data, id) {
    return new Promise((resolve, reject) => {
        conexion.query(`UPDATE ${tabla} SET ? WHERE id = ?`,
            [data, id], (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        )
    })
}

function registrar(tabla, data, id) {
    return new Promise((resolve, reject) => {
        conexion.query(`INSERT INTO ${tabla} SET ?`, data, (error, result) => {
            if (error) return reject(error);
            resolve(result);
        })
    })
}

function nuevo_producto(tabla, data,) {
    return new Promise((resolve, reject) => {
        conexion.query(`INSERT INTO ${tabla} SET ?`, data, (error, result) => {
            if (error) return reject(error);
            resolve(result);
        })
    })
}

function actualizar_producto(tabla, data, id) {
    return new Promise((resolve, reject) => {
        conexion.query(`UPDATE ${tabla} SET ? WHERE id = ?`,
            [data, id], (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        )
    })
}

function nueva_venta(tabla, data,) {
    return new Promise((resolve, reject) => {
        conexion.query(`INSERT INTO ${tabla} SET ?`, data, (error, result) => {
            if (error) return reject(error);
            resolve(result);
        })
    })
}

function nueva_compra(tabla, data,) {
    return new Promise((resolve, reject) => {
        conexion.query(`INSERT INTO ${tabla} SET ?`, data, (error, result) => {
            if (error) return reject(error);
            resolve(result);
        })
    })
}

module.exports = {
    todos,
    uno,
    actualizar,
    registrar,
    nuevo_producto,
    actualizar_producto,
    nueva_venta,
    nueva_compra
};
