const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "adoption",
    {
      fecha: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
      },
      // estado: {
      //   type: DataTypes.TEXT,
      //   allowNull: false,
      // },
    },
    {
      timestamps: false,
    }
  );
};
