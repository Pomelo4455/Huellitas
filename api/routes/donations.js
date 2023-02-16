const { Router } = require("express");
const { createDonation, putCollected, getDonations} = require("../controllers/donationsControllers");

const router = Router();


router.post("/", async (req, res) => {
   try {
      const {amount, campaignId, userId, status} = req.body;
      const newDonation = await createDonation(status, amount, userId, campaignId);
      res.status(200).send(newDonation);
    } catch (error) {
      res.status(404).send(error.message);
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      let {id} = req.params;
      let {collected} = req.body;
      putCollected(id, collected);
      return res.status(201).send("Ha editado su campaña con éxito");
    } catch (error) {
      res.status(404).send({ error: error.message });
    }
  });

router.get("/", async (req, res) => {
  try{
    const allDonations = await getDonations();
    if (!allDonations.length)
      res.status(200).send({ Error: "No hay donaciónes" });
    else res.status(200).send(allDonations);
  }catch (error) {
    res.status(404).send({ error: error.message });
  }
})
module.exports = router;