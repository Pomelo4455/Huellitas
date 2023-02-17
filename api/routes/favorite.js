const { Router } = require("express");
const { putFollow, getFollows } = require("../controllers/favoriteControllers");

const router = Router();


// crea o actualiza la relacion entre un usuario y una mascota. recibe seguir, userId y petId por query
router.put("/", async (req, res) => {
  try {
    let {seguir, userId, petId} = req.query;
    let relacion = putFollow(userId, petId, seguir);
    res.status(200).send(relacion);
  } catch (error) {
    res.status(400).send(error.message);
  }
})

// recibe el userId por query y retorna todas las mascotas que tiene en seguimiento
router.get("/", async (req, res) => {
  try {
    let {userId} = req.query;
    let follows = await getFollows(userId)
    res.status(200).send(follows);
  } catch (error) {
    res.status(400).send(error.message);
  }
})

  module.exports = router;