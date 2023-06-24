const usuario = require("../models/usuario")
const Mensaje = require("../models/message");

const usuarioConectado = async (uid='')=>{
    const Usuario = await usuario.findById(uid);
    Usuario.online = true;
    await Usuario.save();
    return Usuario;
}
const usuarioDesconectado = async (uid='')=>{
    const Usuario = await usuario.findById(uid);
    Usuario.online = false;
    await Usuario.save();
    return Usuario;
}

const grabarMensaje = async(payload)=>{
    try {
        const mensaje = new Mensaje(payload);
        await mensaje.save();
        return true
    } catch (error) {
        return false
    }
}

module.exports={
    usuarioConectado,
    usuarioDesconectado,
    grabarMensaje
}