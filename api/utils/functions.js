const { Op } = require("sequelize");

const createFilters = (species, sex, size) => {
  let filters = { deleted: "no" };
  if (species && ["perro", "gato", "otros"].includes(species))
    filters.species = species;
  if (sex && ["hembra", "macho"].includes(sex)) filters.sex = sex;
  if (size && ["pequeño", "mediano", "grande"].includes(size))
    filters.size = size;
  return filters;
};

const userFilters = (name, status, type) => {
  const filters = {};
  if (name) filters.name = { [Op.iLike]: `%${name}%` };
  if (status) filters.status = status;
  if (type) filters.type = type;
  console.log(filters);
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
      sinRepetidos.push(element)
    }
  }
  return sinRepetidos;
}

module.exports = { createFilters, setOrder, userFilters, eliminarRepetidos };
