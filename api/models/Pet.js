const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "pet",
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      edad: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      especie: {
        type: DataTypes.ENUM("perro", "gato", "conejo", "tortuga", "cobayo"),
        allowNull: false,
      },
      imagen: {
        type: DataTypes.STRING,
        defaultValue: "https://acortar.link/HBTGez",
        allowNull: false,
      },
      tamaño: {
        type: DataTypes.ENUM("pequeño", "mediano", "grande"),
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      temperamento: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      adoptado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
