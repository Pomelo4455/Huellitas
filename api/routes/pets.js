const { Router } = require("express");
const {
  getAllPets,
  getPetById,
  getAllPetsAdm,
} = require("../controllers/petControllers.js");
const { getAllUser, updateUser } = require("../controllers/userControllers.js");
const { User, Pet, Campaign, Adoption } = require("../db.js");
const {
  createFilters,
  setOrder,
  userFilters,
  filterAdmPet,
} = require("../utils/functions.js");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { name, species, sex, size, order, adopted, giverId } = req.query;
    const filtersPet = createFilters(species, sex, size, adopted, giverId);
    const orderPets = setOrder(order);
    let pets = await getAllPets(filtersPet, orderPets);
    if (req.query && !pets.length) throw new Error("No se encontro perritos");
    if (name) {
      // en el caso de que se quieran las pets de solo fundaciones que contengan name en su nombre:
      let filtersUser = userFilters(name);
      let users = await getAllUser(filtersUser);
      let userIds = users.map((user) => user.id);
      // if (!userIds.length) throw new Error("No se encontro la fundacion");
      pets = pets.filter((pet) => userIds.includes(pet.GiverId));
      if (!pets.length) throw new Error("No se encontro la fundacion");
    }
    res.status(200).send(pets);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    let {
      name,
      age,
      species,
      image,
      size,
      color,
      sex,
      temperament,
      adopted,
      deleted,
      userId,
      latitude,
      longitude
    } = req.body;
    let newPet = await Pet.create({
      name,
      age,
      species,
      image,
      size,
      color,
      sex,
      temperament,
      adopted,
      deleted,
      }
    );

    const data = {latitude, longitude};

    if (data) {
      await updateUser(userId, data);
    }

    await newPet.setGiver(userId);
    res.status(200).send("La mascota fue creada");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let {
      name,
      age,
      species,
      image,
      size,
      color,
      sex,
      temperament,
      adopted,
      deleted,
    } = req.body;
    Pet.update(
      {
        name,
        age,
        species,
        image,
        size,
        color,
        sex,
        temperament,
        adopted,
        deleted,
      },
      {
        where: {
          id,
        },
      }
    );
    res.status(200).send("Mascota actualizada");
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let { deleted, adopted } = req.query;
    Pet.update(
      {
        deleted,
        adopted,
      },
      {
        where: {
          id,
        },
      }
    );
    res.status(200).send("Mascota eliminada");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let pet = await getPetById(id);
    if (!pet) throw new Error("Mascota no encontrada");
    else res.status(200).send(pet);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get("/Adm/Admin", async (req, res) => {
  const { name } = req.query;
  try {
    let allPets;
    if (name) {
      const filters = filterAdmPet(name);
      allPets = await getAllPetsAdm(filters);
    } else {
      allPets = await getAllPetsAdm();
    }
    if (!allPets.length) {
      res.status(404).send({
        Error: "No se encontraron mascotas con el nombre proporcionado",
      });
    } else {
      res.status(200).send(allPets);
    }
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

module.exports = router;
