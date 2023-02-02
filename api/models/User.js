const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "user",
    {
      type: {
        type: DataTypes.ENUM("fundacion", "usuario", "admin"),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      phone: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        defaultValue: "",
      },
      facebook: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      instagram: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      twitter: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      tiktok: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      image: {
        type: DataTypes.STRING,
        defaultValue: "https://acortar.link/JjnSW3",
      },
      CVU: {
        type: DataTypes.STRING,
        defaultValue: "",
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
