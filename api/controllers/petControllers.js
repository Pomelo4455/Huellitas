const { User, Pet, Campaign, Adoption } = require("../db.js");

const getAllPets = async (filters, order) => {
  let pets = await Pet.findAll({
    where: filters,
    order: order,
  });
  for (let i = 0; i < pets.length; i++) {
    const pet = pets[i].dataValues;
    let giver = await User.findOne({
      attributes: ["name", "latitude", "longitude"],
      where: { id: pet.userId },
    });
    if (giver) pets[i] = { ...pet, giver: giver.dataValues.name, latitude: giver.dataValues.latitude, longitude: giver.dataValues.longitude };
  }
  return pets;
};

const getAllPetsAdm = async (filters) => {
  let pets = await Pet.findAll({
    where: filters,
  });
  for (let i = 0; i < pets.length; i++) {
    const pet = pets[i].dataValues;
    let giver = await User.findOne({
      attributes: ["name"],
      where: { id: pet.userId },
    });
    if (giver) pets[i] = { ...pet, giver: giver.dataValues.name };
  }
  return pets;
};

const getPetById = async (id) => {
  let pet = await Pet.findOne({
    attributes: [
      "id",
      "name",
      "age",
      "species",
      "image",
      "size",
      "color",
      "sex",
      "temperament",
      "adopted",
      "userId",
    ],
    where: { id: Number(id) },
  });
  return pet;
};

module.exports = { getAllPets, getPetById, getAllPetsAdm };
