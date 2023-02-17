const { Router } = require("express");
const { addFavorite, putFavorite, getFavorites} = require("../controllers/favoriteControllers");

const router = Router();



router.post("/", async (req, res) =>{

    try{
    const {pet, user} = req.body;
      const newFavorite = await addFavorite(pet, user)
      res.status(200).send(newFavorite);
    }catch (error) {
        res.status(404).send({ error: error.message });
    }
   })

router.put("/", async (req, res) =>{
    const {pet, user, estado} = req.body;
    try{
      
      const modifyFavorite = await putFavorite(pet, user, estado)
      res.status(200).send(modifyFavorite);
    }catch (error) {
        res.status(404).send({ error: error.message });
    }
  })

  router.get("/", async (req, res) => {
    const {pet, user} = req.body;
    try{
      const allFavorites = await getFavorites(user, pet);
      if (!allFavorites.length)
        res.status(200).send({ Error: "No hay favoritos" });
      else res.status(200).send(allFavorites);
    }catch (error) {
      res.status(404).send({ error: error.message });
    }
  })

  module.exports = router;