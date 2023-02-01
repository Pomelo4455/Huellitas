const { Router } = require('express');
const { User, Pet, Campaign, Adoption } = require('../db.js');
// const {getAllPets} =require("..controllers/index.js")

const router = Router();

router.get("/",async (req,res)=>{
    res.status(200).send("Ruta GET /pets")
})

router.post("/",async (req,res)=>{
    res.status(200).send("Ruta POST /pets")
})

router.put("/",async (req,res)=>{
    res.status(200).send("Ruta PUT /pets")
})

router.delete("/",async (req,res)=>{
    res.status(200).send("Ruta DELETE /pets")
})

router.get("/:id",async (req,res)=>{
    let id=req.params.id;
    res.status(200).send(`Ruta GET /pets/${id}`)
})

module.exports = router;