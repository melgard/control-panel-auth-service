// Requires
const express = require('express');
const mongoose = require('mongoose');

// Init vars
const app = express();

// Conexión a la base de datos
mongoose.connection.openUri('mongodb://localhost:27017/authdb', (err, res) => {
    if (err) throw err;
    console.log('Servidor MongoDB \x1b[32m%s\x1b[0m','conectado');
});


// Rutas
app.get('/health', (req, res, next) => {
    res.status(200).json({
        ok:true,
        message:'Service alive.'
    });
});

// Listening
const port = 3000;
app.listen(port, () => {
    console.log('Servidor Express \x1b[32m%s\x1b[0m','On-line','en el puerto', port);
});