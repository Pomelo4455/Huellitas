const { Op } = require("sequelize");

const createFilters = (name, species, sex, size) => {
  let filters = { deleted: false };
  // if (!species && !sex && !size) return filters
  if (species) filters.species = species;
  if (sex) filters.sex = sex;
  if (size) filters.size = size;
  if (name) filters.name = { [Op.iLike]: `%${name}%` };
  return filters;
};

const userFilters = (name, status) => {
  const filters = {};
  if (name) filters.name = { [Op.iLike]: `%${name}%` };
  if (status) filters.status = status;
  return filters;
};

const setOrder = (order) => {
  // "columna_orden"
  // if(!order)return[];
  // else{
  //     let orden=order.split("_")
  //     return[orden]
  // }
};

module.exports = { createFilters, setOrder, userFilters };
