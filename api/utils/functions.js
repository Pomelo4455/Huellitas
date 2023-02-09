const { Op } = require("sequelize");

const createFilters = ( species, sex, size) => {
  let filters = { deleted: false };
  if (species && ["perro","gato","otros"].includes(species)) filters.species = species;
  if (sex && ["hembra", "macho"].includes(sex)) filters.sex = sex;
  if (size && ["pequeño", "mediano", "grande"].includes(size)) filters.size = size;
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
    if (!order) return[];
    else {
        let orden = order.split("_")
        return[orden];
    }
}

module.exports = { createFilters, setOrder, userFilters };
