// Requires
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Importat Rutas
const appRoutes = require('./routes/app');
const usuariosRoutes = require('./routes/usuario');
const loginRoutes = require('./routes/login');


// Init vars
const app = express();

// Body Parser Config
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());

// Rutas
app.use('/usuarios', usuariosRoutes);
app.use('/login', loginRoutes);
app.use('/', appRoutes);


// Conexión a la base de datos
mongoose.connection.openUri('mongodb://localhost:27017/authdb', (err, res) => {
    if (err) throw err;
    console.log('Servidor MongoDB \x1b[32m%s\x1b[0m','conectado');
});

// Listening
const port = 3000;
app.listen(port, () => {
    console.log('Servidor Express \x1b[32m%s\x1b[0m','On-line','en el puerto', port);
});