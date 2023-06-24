const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket');
const { comprobarJWT } = require('../helpers/jwt');
const {io} = require('../index');


io.on('connection', client => {//socket comunication
    console.log(client.handshake.headers['x-token']);
    console.log('cliente conectado')
    const [valido, uid]=comprobarJWT(client.handshake.headers['x-token'])
    if(!valido){return client.disconnect()}
    usuarioConectado(uid);
    
    client.join(uid);

    client.on('mensaje-personal',async (payload)=>{
        await grabarMensaje(payload);
        io.to(payload.para).emit('mensaje-personal',payload);
    })

    client.on('disconnect', () => { 
        console.log('cliente desconectado')
        usuarioDesconectado(uid);
    });

    client.on('mensaje', (payload)=>{
        console.log('mensaje', payload);
        io.emit('mensaje',{admin: 'new message'})
    });
});
