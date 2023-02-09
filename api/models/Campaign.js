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
        defaultValue: "https://acortar.link/yBPxc1",
      },
      goal: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      collected: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
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
