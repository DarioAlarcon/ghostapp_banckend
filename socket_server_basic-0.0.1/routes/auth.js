//path: api/login

const {Router, response}=require('express');
const { crearUsuario, login, renewToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar_JWT');
const router = Router();

router.post('/new', [
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('password', 'la contraseña es obligatoria').not().isEmpty(),
    check('email', 'el correo es obligatorio').isEmail(),
    validarCampos
],crearUsuario)

router.post('/',
    [
    check('password', 'la contraseña es obligatoria').not().isEmpty(),
    check('email', 'el correo es obligatorio').isEmail(),
    ],
    login
)

router.get('/renew', validarJWT,renewToken);

module.exports = router;