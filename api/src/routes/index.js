const { Router } = require('express');
const { getDogs, getDogByIdBreed, createDog, getTemperaments, seedTemperament} = require('../controllers/dogs.controller')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/seedTemperament', seedTemperament)

router.get('/dogs', getDogs)

router.get('/dogs', getDogs)

router.get('/dogs/:idRaza', getDogByIdBreed)

router.post('/dogs', createDog)

router.get('/temperaments', getTemperaments)

module.exports = router;
