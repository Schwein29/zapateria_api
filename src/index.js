require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const PORT = process.env.PORT || 4000;

const respuestas = {
    success: function (req, res, mensaje, status) {
        const statusCode = status || 200;
        res.status(statusCode).send({
            error: false,
            status: statusCode,
            body: mensaje
        });
    },
    error: function (req, res, mensaje, status) {
        const statusCode = status || 500;
        res.status(statusCode).send({
            error: true,
            status: statusCode,
            body: mensaje
        });
    },
};

const db = require('./db/mysql'); 
const TABLA = 'cliente';

const TABLA_PRODUCT0 = 'producto';
const TABLA_VENTA = 'venta';
const TABLA_COMPRA = 'compra';

const controladorClientes = {
    todos: () => db.todos(TABLA),
    actualizar: (id, data) => db.actualizar(TABLA, data, id),
    uno:(id) => db.uno(TABLA, id),
    registrar:(data) => db.registrar(TABLA, data),
    nuevo_producto:(data) => db.nuevo_producto(TABLA_PRODUCT0, data),
    actualizar_producto: (id, data) => db.actualizar_producto(TABLA_PRODUCT0, data, id),
    nueva_compra:(data) => db.nueva_compra(TABLA_COMPRA, data),
    nueva_venta:(data) => db.nueva_venta(TABLA_VENTA, data),

};


//rutas
const routerClientes = express.Router();

routerClientes.get('/clientes/', async (req, res) => {
    try {
        const resultado = await controladorClientes.todos();
        respuestas.success(req, res, resultado, 200);
    } catch (error) {
        respuestas.error(req, res, error, 500);
    }
});

routerClientes.put('/clientes/:id', async(req, res) => {
    try{
        const data = req.body;
        const id = req.params.id;

        const resultado = await controladorClientes.actualizar(id, data);
        respuestas.success(req, res, resultado, 200);
    } catch (error) {
        respuestas.error(req, res, error, 500);
    }
});

routerClientes.get('/clientes/:id', async(req, res) => {
    try{
        const id = req.params.id;
        const resultado = await controladorClientes.uno(id);
        respuestas.success(req, res, resultado, 200);
    }catch(error) {
        respuestas.error(req, res, error, 500);
    }
})

routerClientes.post('/clientes/', async (req, res) => {
    try {
        const data = req.body;
        const resultado = await controladorClientes.registrar(data);
        respuestas.success(req, res, {
            mensaje: "Cliente agregado correctamente",
            insertId: resultado.insertId
        }, 200);
    } catch (error) {
        respuestas.error(req, res, error, 500);
    }
});

routerClientes.post('/producto/', async (req, res) => {
    try {
        const data = req.body;
        const resultado = await controladorClientes.nuevo_producto(data);
        respuestas.success(req, res, {
            mensaje: "Producto agregado correctamente",
            insertId: resultado.insertId
        }, 200);
    } catch (error) {
        respuestas.error(req, res, error, 500);
    }
});

routerClientes.put('/producto/:id', async(req, res) => {
    try{
        const data = req.body;
        const id = req.params.id;

        const resultado = await controladorClientes.actualizar_producto(id, data);
        respuestas.success(req, res, resultado, 200);
    } catch (error) {
        respuestas.error(req, res, error, 500);
    }
});

routerClientes.post('/compra/', async (req, res) => {
    try {
        const data = req.body;
        const resultado = await controladorClientes.nueva_compra(data);
        respuestas.success(req, res, {
            mensaje: "Compra registrada correctamente",
            insertId: resultado.insertId
        }, 200);
    } catch (error) {
        respuestas.error(req, res, error, 500);
    }
});

routerClientes.post('/venta/', async (req, res) => {
    try {
        const data = req.body;
        const resultado = await controladorClientes.nueva_venta(data);
        respuestas.success(req, res, {
            mensaje: "Venta registrada correctamente",
            insertId: resultado.insertId
        }, 200);
    } catch (error) {
        respuestas.error(req, res, error, 500);
    }
});

app.use('/api', routerClientes);


app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
