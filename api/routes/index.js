const { Router } = require('express');
const Pets = require("./pets.js");
const Users = require("./user.js")
const Campaigns = require("./campaign.js")
const { User, Pet, Campaign, Adoption } = require('../db.js');


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/', (req, res) => {
    res.status(200).send('Ruta GET /')
});

router.use("/pets",Pets)
router.use("/users",Users)
router.use("/campaigns",Campaigns)


module.exports = router;