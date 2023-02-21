const { Op } = require("sequelize");

const createFilters = (species, sex, size, adopted) => {
  let filters = { deleted: "no" };
  if (species && ["perro", "gato", "otros"].includes(species))
    filters.species = species;
  if (sex && ["hembra", "macho"].includes(sex)) filters.sex = sex;
  if (size && ["pequeño", "mediano", "grande"].includes(size))
    filters.size = size;
  if (adopted && ["si", "no"].includes(adopted)) filters.adopted = adopted
  return filters;
};

const userFilters = (name, status, type) => {
  const filters = {};
  if (name) filters.name = { [Op.iLike]: `%${name}%` };
  if (status) filters.status = status;
  if (type) filters.type = type;
  return filters;
};

const setOrder = (order) => {
  if (!order) return [];
  else {
    let orden = order.split("_");
    return [orden];
  }
};

const eliminarRepetidos = (array) => {
  const sinRepetidos = [];
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    if (!sinRepetidos.includes(element)) {
      sinRepetidos.push(element);
    }
  }
  return sinRepetidos;
};

const filterAdmCampaign = (title) => {
  const filters = {};
  if (title) filters.title = { [Op.iLike]: `%${title}%` };
  return filters;
};

const filterAdmPet = (name) => {
  const filters = {};
  if (name) filters.name = { [Op.iLike]: `%${name}%` };
  return filters;
};

const filterFundacion = (name) => {
  let filters = { status: "activo", type: "fundacion" };
  if (name) filters.name = { [Op.iLike]: `%${name}%` };
  return filters;
};

module.exports = {
  createFilters,
  setOrder,
  userFilters,
  eliminarRepetidos,
  filterAdmCampaign,
  filterAdmPet,
  filterFundacion,
};
