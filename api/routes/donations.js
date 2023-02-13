const { Router } = require("express");
const { createDonation, putCollected} = require("../controllers/donationsControllers");

const router = Router();


router.post("/", async (req, res) => {
    try {
      const data = req.body;
      console.log(data)
      const newDonation = await createDonation(data);
      res.status(200).send(newDonation);
    } catch (error) {
      res.status(404).send(error.message);
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      let edit = putCollected(req);
      return res.status(201).send("Ha editado su campaña con éxito");
    } catch (error) {
      res.status(404).send({ error: error.message });
    }
  });

module.exports = router;