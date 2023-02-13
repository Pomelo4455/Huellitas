const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "donation",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      status: {
        type: DataTypes.ENUM("approved", "rejected"),
      },
      amount: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
    }
  );
};
