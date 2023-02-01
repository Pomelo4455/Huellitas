const { Router } = require('express');
const { User, Pet, Campaign, Adoption } = require('../db.js');


const router = Router();

router.get("/",async (req,res)=>{
    res.status(200).send("Ruta GET /campaigns")
})

router.post("/",async (req,res)=>{
    res.status(200).send("Ruta POST /campaigns")
})

router.put("/",async (req,res)=>{
    res.status(200).send("Ruta PUT /campaigns")
})

router.delete("/",async (req,res)=>{
    res.status(200).send("Ruta DELETE /campaigns")
})

router.get("/:id",async (req,res)=>{
    let id=req.params.id;
    res.status(200).send(`Ruta GET /campaigns/${id}`)
})

module.exports = router;