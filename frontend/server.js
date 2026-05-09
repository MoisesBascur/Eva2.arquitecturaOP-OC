const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static('public'));

const dbConfig = {
    host: 'mariadb-server',
    user: 'root',
    password: 'acme_password',
    database: 'acme_erp'
};

app.get('/api/productos', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM productos');
        await connection.end();
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al consultar la base de datos');
    }
});

app.post('/api/productos', async (req, res) => {
    const { nombre, descripcion, precio, stock } = req.body;
    try {
        const connection = await mysql.createConnection(dbConfig);
        await connection.execute(
            'INSERT INTO productos (nombre, descripcion, precio, stock) VALUES (?, ?, ?, ?)',
            [nombre, descripcion, precio, stock]
        );
        await connection.end();
        res.status(201).send('Producto agregado exitosamente');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al insertar en la base de datos');
    }
});

const PORT = 80;
app.listen(PORT, () => {
    console.log(`Servidor Frontend ejecutándose en el puerto ${PORT}`);
});