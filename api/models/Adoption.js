const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "adoption",
    {
      date: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
      },
      // state: {
      //   type: DataTypes.TEXT,
      //   allowNull: false,
      // },
    },
    {
      timestamps: false,
    }
  );
};
