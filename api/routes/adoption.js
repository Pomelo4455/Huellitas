const { Router } = require("express");
const { putFollow, getFollows, getSeguido } = require("../controllers/followControllers");

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

// devuelve true si el usuario con userId sigue a la mascota con petId, caso contrario false.
router.get("/:userId/:petId", async (req,res) => {
  try {
    let {userId, petId} = req.params;
    let seguido = await getSeguido(userId, petId);
    res.status(200).send(seguido);
  } catch (error) {
    res.status(400).send(error.message);
  }
  

})

module.exports = router;