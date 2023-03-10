const { Router } = require("express");
const {
  userFilters,
  filterAdmPet,
  filterFundacion,
} = require("../utils/functions");
const { User, Pet, Campaign, Adoption } = require("../db.js");
const {
  createUser,
  getAllUser,
  getUserDetail,
  deleteUser,
  updateUser,
  getAllUserAdm,
  getAllUserFund,
} = require("../controllers/userControllers");

const router = Router();

router.get("/", async (req, res) => {
  const { name, status, type } = req.query;
  try {
    const filters = userFilters(name, status, type);
    const users = await getAllUser(filters);
    res.status(200).send(users);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newUser = await createUser(data);
    res.status(200).send(newUser);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = req.body;
    const updatedUser = await updateUser(id, data);
    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { status, type } = req.query;
  try {
    const changeStatus = await deleteUser(id, status, type);
    res.status(200).send(`Se cambio el estado del user ${id}`);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) throw new Error("Falta enviar el id");
    const detail = await getUserDetail(id);
    res.status(200).send(detail);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get("/Adm/Admin", async (req, res) => {
  const { name } = req.query;
  try {
    let allUsers;
    if (name) {
      const filters = filterAdmPet(name);
      allUsers = await getAllUserAdm(filters);
    } else {
      allUsers = await getAllUserAdm();
    }
    if (!allUsers.length) {
      res.status(404).send({
        Error: "No se encontraron usuarios con el nombre proporcionado",
      });
    } else {
      res.status(200).send(allUsers);
    }
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

router.get("/Fundacion/Fund", async (req, res) => {
  const { name } = req.query;
  try {
    let allUsers;
    if (name) {
      const filters = filterFundacion(name);
      allUsers = await getAllUserFund(filters);
    } else {
      allUsers = await getAllUserFund();
    }
    if (!allUsers.length) {
      res.status(404).send({
        Error: "No se encontraron fundaciones con el nombre proporcionado",
      });
    } else {
      res.status(200).send(allUsers);
    }
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

module.exports = router;
