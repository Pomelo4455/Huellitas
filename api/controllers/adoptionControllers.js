const { Pet, User } = require("../db.js");
const { Op } = require("sequelize");

// crea o actualiza la relacion entre un usuario y una mascota. recibe seguir, userId y petId por query
const postSolicitante = async (SolicitanteId, MascotaId) => {
    let petDb = await Pet.findOne({where: {id : MascotaId}});
    let userDb = await User.findOne({where:{id : SolicitanteId}});
    await petDb.addSolicitante(userDb)
}

// recibe el userId por query y retorna todas las mascotas que tiene en seguimiento
const getSolicitantesPet = async (MascotaId) => {
    let solicitantes = await User.findAll({
        attributes: ["name", "id"],
        include: [{
            attributes: [],
            where: {id: MascotaId},
            model: Pet,
            as: "solicitante"
        }]
    })
    return solicitantes
};

const postAdopcion = async (AdoptanteId, MascotaId) => {
    let petDb = await Pet.findOne({where: {id : MascotaId}});
    let userDb = await User.findOne({where:{id : AdoptanteId}});
    await petDb.setAdoptante(userDb)
    await petDb.update({adopted: "si"});
}

module.exports = {
    postSolicitante,
    getSolicitantesPet,
    postAdopcion,
};