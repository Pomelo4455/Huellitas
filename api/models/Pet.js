const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "pet",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      species: {
        type: DataTypes.ENUM("perro", "gato", "conejo", "tortuga", "cobayo"),
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        defaultValue: "https://acortar.link/HBTGez",
        allowNull: false,
      },
      size: {
        type: DataTypes.ENUM("pequeño", "mediano", "grande"),
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sex: {
        type: DataTypes.ENUM("hembra", "macho"),
        allowNull: false
      },
      temperament: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      adopted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
