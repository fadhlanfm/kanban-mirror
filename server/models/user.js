'use strict';
const { generateHashedPassword } = require('../helpers/crypt')
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model
  
  class User extends Model {}

  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: `Email is already in use. Please use another email`
      },
      validate: {
        isEmail: {
          msg: `Please enter the correct email address`
        },
        notEmpty: {
          args: true,
          msg: `Please enter your email`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `Please enter your password`
        }
      }
    },
    organization: DataTypes.STRING
  }, { sequelize })

  User.beforeCreate((user, option) => {
    user.password = generateHashedPassword(user.password)
    user.organization = 'Hacktiv8'
  })

  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Task)
  };
  return User;
};