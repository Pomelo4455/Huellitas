const { Pet, User, Favorite } = require("../db.js");
const { Op } = require("sequelize");

const addFavorite = async (user, pet) => {
  const newFavorite = await Favorite.create();
  await newFavorite.setSeguidor(pet);
  await newFavorite.setSeguido(user);
  return newFavorite;
};

const putFavorite = async (user, pet, estado) => {
  console.log(user, pet, estado)
 await Favorite.findOne(
    { status: estado},
    { where: { userId: user, petId: pet } }
  );
  return "asdasd";
};

const getFavorites = async (user, pet) => {
  const allFavorites = await Favorite.findAll({
    where: { userId: user},
  });
  return allFavorites;
};

module.exports = {
  addFavorite,
  getFavorites,
  putFavorite,
};
