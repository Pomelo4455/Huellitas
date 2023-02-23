const { Pet, User, Follow } = require("../db.js");
const { Op } = require("sequelize");

// busca en todos los usuarios las reviews que no sean vacias.
const getReviews = async (userId) => {
  let reviews = await User.findAll({
    attributes: ["review", "stars", "image", "name", "id"],
    where: {[Op.or] : [{"review" : {[Op.not]: ""}}, {"stars" : {[Op.not]: 0}}]},
  })
  return reviews.reverse()
};

module.exports = {
  getReviews,
};
