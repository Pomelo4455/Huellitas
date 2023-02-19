const { Router } = require("express");
const { getReviews } = require("../controllers/reviewControllers.js");

const router = Router();


// trae todas las reviews
router.get("/", async (req, res) => {
  try {
    let reviews = await getReviews();
    res.status(200).send(reviews);
  } catch (error) {
    res.status(400).send(error.message);
  }
})

module.exports = router;