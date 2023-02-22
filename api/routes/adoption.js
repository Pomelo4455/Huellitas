const { Router } = require("express");
const { postSolicitante, getSolicitantesPet, postAdopcion } = require("../controllers/adoptionControllers.js");

const router = Router();

// hace un post a la tabla intermedia solicitantes y relaciona un posible adoptante con una mascota que quiere ser adoptada por el.
router.post("/solicitud/:SolicitanteId/:MascotaId", async (req, res) => {
  try {
    let {SolicitanteId, MascotaId} = req.params;
    await postSolicitante(SolicitanteId, MascotaId)
    res.status(200).send("Solicitante vinculado con mascota.");
  } catch (error) {
    res.status(400).send(error.message);
  }
})

// trae todos los solicitantes de una mascota
router.get("/solicitud/:MascotaId", async (req, res) => {
  try {
    let {MascotaId} = req.params;
    let solicitantes = await getSolicitantesPet(MascotaId);
    res.status(200).send(solicitantes);
  } catch (error) {
    res.status(400).send(error.message);
  }
})

// relaciona una mascota y un usuario mediante la relacion adoptante que tiene como columna en la tabla de las pets adoptanteId.
router.post("/:AdoptanteId/:MascotaId", async (req,res) => {
  try {
    let {AdoptanteId, MascotaId} = req.params;
    await postAdopcion(AdoptanteId, MascotaId)
    res.status(200).send("Adoptante vinculado con mascota.");
  } catch (error) {
    res.status(400).send(error.message);
  }
  

})

module.exports = router;