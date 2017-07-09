const bcrypt = require("bcrypt");
const _ = require("underscore");
const config = require("config");

module.exports = function (sequelize, DataTypes) {
  return sequelize.define("user", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: { message: "Invalid e-mail" }
      }
    },
    facebookID: {
      type: DataTypes.STRING
    }
  }, {
    hooks: {
      beforeValidate: (user,options) => {
        if(typeof user.email === "string") {
          user.email = user.email.toLowerCase();
        }
      }
    },
  });
}
