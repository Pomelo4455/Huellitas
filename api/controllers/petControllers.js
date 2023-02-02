const { User, Pet, Campaign, Adoption } = require('../db.js');

const getAllPets = async () => {
    let pets = await Pet.findAll({
        attributes: ['id', 'name', 'age', 'species', 'image', 'size', 'color', 'sex', 'temperament', 'adopted', 'userId'],
        where: {deleted: false}
    })
    pets = pets.map(pet => pet.dataValues);
    return pets;
};

const getPetById = async (id) => {
    let pet = await Pet.findOne({
        attributes: ['id', 'name', 'age', 'species', 'image', 'size', 'color', 'sex', 'temperament', 'adopted', 'userId'],
        where: {id: Number(id)}
    })
    return pet;
}

module.exports={getAllPets, getPetById}