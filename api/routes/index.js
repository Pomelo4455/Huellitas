const { Router } = require('express');
const Pets = require("./pets.js");
const Users = require("./user.js")
const Campaigns = require("./campaign.js")
const Payment = require("./payment.js")
const { User, Pet, Campaign, Adoption } = require('../db.js');
const {loadUsers,loadPets,loadCampaigns}= require("../controllers/index.js")
const {petsData,usersData,campaignsData} = require("../utils/data.js")


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.post('/', async (req, res) => {
   try{
    await loadUsers();
    await loadPets();
    await loadCampaigns();
    res.status(200).send("Datos cargados correctamente")
   }catch(error){
    res.status(400).send("error en la carga de datos")
   }
});

router.use("/pets",Pets)
router.use("/users",Users)
router.use("/campaigns",Campaigns)
router.use("/payment",Payment)

module.exports = router;