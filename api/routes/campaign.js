const { Router } = require("express");
const { User, Pet, Campaign, Adoption } = require("../db.js");
const {
  getCampaign,
  postCampaign,
  putCampaign,
  deleteCampaign,
  getCampaignAdm,
} = require("../controllers/campaignControllers");

//{    "title": "Todxs por Juancho",    "reason": "Operacion de Juancho",    "description": "Juancho tuvo un accidente estamos recaudando fondos así puede salvar su orejita",    "goal": 4300}

const router = Router();

router.get("/", async (req, res) => {
  try {
    const allCampaigns = await getCampaign();
    if (!allCampaigns.length)
      res.status(200).send({ Error: "No hay campañas" });
    else res.status(200).send(allCampaigns);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const allCampaigns = await getCampaign();
  try {
    if (id) {
      const detailCampaign = allCampaigns.filter((camp) => camp.id == id);

      detailCampaign.length
        ? res.status(200).send(detailCampaign)
        : res.status(404).send(`Esta campaña no existe o fue eliminada`);
    }
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

router.post("/", async (req, res) => {
    const { title, reason, description, goal, userId,image, collected } = req.body;
    try {     
        if ( !title || !reason || !description || !goal ) {
            return res.status(404).send('Faltan datos');
        }
        else {
            let newCampaign = await postCampaign(req.body);
            return res.status(201).send('¡Su campaña ha sido creada con éxito!');
        }
    } catch(error) {
        res.status(404).send({error: error.message})
    }
});

router.put("/:id", async (req, res) => {
  try {
    let edit = putCampaign(req);
    return res.status(201).send("Ha editado su campaña con éxito");
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.query;
    let deleted = await deleteCampaign(id, status);
    return res.status(201).send("Su campaña ha sido eliminada");
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

router.get("/Adm/Admin", async (req, res) => {
  try {
    const allCampaigns = await getCampaignAdm();
    if (!allCampaigns.length)
      res.status(200).send({ Error: "No hay campañas" });
    else res.status(200).send(allCampaigns);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

module.exports = router;
