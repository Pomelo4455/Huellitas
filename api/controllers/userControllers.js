const { User, Pet, Campaign, Adoption } = require("../db.js");

const createUser = async (Data) => {
  const { email, password } = Data;
  if (!email || !password) throw new Error("Faltan datos");
  const users = await User.create(Data);
  return users;
};

const getAllUser = async (filters) => {
  const users = await User.findAll({
    where: filters,
    include: [
      {
        model: Pet,
        attributes: [
          "name",
          "age",
          "species",
          "image",
          "size",
          "color",
          "sex",
          "temperament",
          "adopted",
        ],
        // through: {
        //   model: Fav,
        //   attributes: [],
        // },
      },
      {
        model: Campaign,
        attributes: ["title", "reason", "description", "goal", "status"],
        // where: {
        //   status: "activo",
        // },
      },
      {
        model: Adoption,
        attributes: ["date"],
      },
    ],
  });
  // const userTotal = userData.concat(users)
  // const usersActive = userTotal.filter(e=> e.status==="activo")
  // return usersActive
  return users;
};

const getUserDetail = async (id) => {
  const allUser = await getAllUser();
  const filterDetail = allUser.map((e) => e.dataValues);
  const userDetail = filterDetail.find((e) => e.id === Number(id));
  if (!userDetail) throw new Error("No existe el id definido");
  return userDetail;
};

const updateUser = async (id, data) => {
  const userToUpdate = await User.findByPk(id);
  if (!userToUpdate) throw new Error("No se encontró el usuario");
  const updatedUser = await userToUpdate.update(data);
  return updatedUser;
};

const deleteUser = async (id, status) => {
  if (!id) throw new Error("No se envio el id a eliminar");
  const userDelete = await User.update(
    { status: status },
    {
      where: {
        id,
      },
    }
  );
  return userDelete;
};

module.exports = {
  getAllUser,
  createUser,
  getUserDetail,
  deleteUser,
  updateUser,
};
