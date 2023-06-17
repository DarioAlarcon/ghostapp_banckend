const express = require('express');
const path = require('path');
const { Socket } = require('socket.io');
require('dotenv').config();

//Db config
require('./databases/config').dbConnection();

const app = express();//app de express
//lectura del body
app.use(express.json());

const server = require('http').createServer(app);//node server
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));
//rutas
app.use('/api/login', require('./routes/auth'));

server.listen(process.env.PORT, (err)=>{
    
    if (err) throw new Error(err);
    console.log('Servidor corriendo en puerto', process.env.PORT);
}
);