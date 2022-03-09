'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Street extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.City,{foreignKey:'city_id'})
      this.hasMany(models.Home,{foreignKey:'street_id'})
    }
  }
  Street.init({
    name: DataTypes.STRING,
    city_id:DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Street',
  });
  return Street;
};
