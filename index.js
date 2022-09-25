const express = require('express');
const { dbConnection } = require('./databases/confiig');
const cors = require('cors');
require('dotenv').config();

//Crear el servidor express
const app = express();

//Base datos
dbConnection();

//CORS
app.use(cors());

//Diirectorio Publico
app.use(express.static('public'));

//Lectura y parse del body
app.use(express.json());

//Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

//escuhcar peticiones
app.listen(port = process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${port}`);
});