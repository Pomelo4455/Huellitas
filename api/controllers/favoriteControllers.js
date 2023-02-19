const { Pet, User, Follow } = require("../db.js");
const { Op } = require("sequelize");

// crea o actualiza la relacion entre un usuario y una mascota. recibe seguir, userId y petId por query
const putFollow = async (userId, petId, seguir) => {
  try {
    let relacion = await Follow.findOne({ where: {userId, petId}})
    if(relacion) {
      relacion = await relacion.update({seguir}, {where: {userId, petId}});
    }
    else {
      const seguidor = await User.findByPk(userId);
      const seguido = await Pet.findByPk(petId);
      if (seguidor && seguido) {
        relacion = await Follow.create({seguir});
        relacion.setSeguidor(userId);
        relacion.setSeguido(petId);
      }
    }
    return relacion;
  } catch (error) {
    throw new Error(error.message);
  }

  
}

// recibe el userId por query y retorna todas las mascotas que tiene en seguimiento
const getFollows = async (userId) => {
  let follows = await Follow.findAll({
    attributes: [],
    where: {userId, seguir: true},
    include: [{
      model: Pet,
      attributes: ["id"],
      as: "seguido",
      }]
  })
  return follows
};

module.exports = {
  getFollows,
  putFollow,
};
