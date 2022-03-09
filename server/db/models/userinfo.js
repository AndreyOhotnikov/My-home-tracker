'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Userinfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User,{foreignKey:'user_id'})
      this.hasMany(models.Photolink,{foreignKey:'userinfo_id'})
    }
  }
  Userinfo.init({
    user_id: DataTypes.INTEGER,
    full_name: DataTypes.STRING,
    entrance: DataTypes.INTEGER,
    flat: DataTypes.INTEGER,
    phone: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'Userinfo',
  });
  return Userinfo;
};
