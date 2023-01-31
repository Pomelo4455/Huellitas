const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "campaign",
    {
      titulo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      motivo: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      meta: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
