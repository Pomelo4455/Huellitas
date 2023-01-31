const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "user",
    {
      tipo: {
        type: DataTypes.ENUM("fundacion", "usuario", "admin"),
        allowNull: false,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      telefono: {
        type: DataTypes.INTEGER,
      },
      contraseña: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      direccion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.TEXT,
      },
      facebook: {
        type: DataTypes.STRING,
      },
      instagram: {
        type: DataTypes.STRING,
      },
      twitter: {
        type: DataTypes.STRING,
      },
      tiktok: {
        type: DataTypes.STRING,
      },
      imagen: {
        type: DataTypes.STRING,
        defaultValue: "https://acortar.link/JjnSW3",
      },
      CVU: {
        type: DataTypes.STRING,
      },
      estado: {
        type: DataTypes.ENUM("activo", "inactivo", "baneado"),
        defaultValue: "activo",
      },
    },
    {
      timestamps: false,
    }
  );
};
