const { Router } = require("express");
const { createDonation, putCollected} = require("../controllers/donationsControllers");

const router = Router();


router.post("/", async (req, res) => {
    try {
      const {amount, campaignId, userId, status} = req.body;
      console.log(amount, campaignId, userId, status)
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

module.exports = router;