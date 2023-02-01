const { Router } = require('express');
const { User, Pet, Campaign, Adoption } = require('../db.js');


const router = Router();

router.get("/",async (req,res)=>{
    res.status(200).send("Ruta GET /users")
})

router.post("/",async (req,res)=>{
    res.status(200).send("Ruta POST /users")
})

router.put("/",async (req,res)=>{
    res.status(200).send("Ruta PUT /users")
})

router.delete("/",async (req,res)=>{
    res.status(200).send("Ruta DELETE /users")
})

router.get("/:id",async (req,res)=>{
    let id=req.params.id;
    res.status(200).send(`Ruta GET /users/${id}`)
})

module.exports = router;