module.exports = (sequelize, DataTypes) => {
  return sequelize.define("vote", {
    ip: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {}
    },
  });
}