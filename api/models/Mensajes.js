const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "message",
    {
      message: {
        type: DataTypes.TEXT,
      },
    },
  );
};