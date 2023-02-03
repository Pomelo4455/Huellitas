const { Op } = require("sequelize");

const createFilters = ( species, sex, size) => {
  let filters = { deleted: false };
  if (species) filters.species = species;
  if (sex) filters.sex = sex;
  if (size) filters.size = size;
  return filters;
};

const userFilters = (name, status) => {
  const filters = {};
  if (name) filters.name = { [Op.iLike]: `%${name}%` };
  if (status) filters.status = status;
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
