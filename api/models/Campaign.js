const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "campaign",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      reason: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },image: {
        type: DataTypes.STRING,
        defaultValue: "https://acortar.link/JjnSW3",
      },
      goal: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("activo", "inactivo", "baneado"),
        defaultValue: "activo",
      },
    },
    {
      timestamps: false,
    }
  );
};
