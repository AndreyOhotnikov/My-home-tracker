'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Home extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Street,{foreignKey:'street_id'})
      this.hasMany(models.User,{foreignKey:'home_id'})
    }
  }
  Home.init({
    name: DataTypes.INTEGER,
    street_id:DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Home',
  });
  return Home;
};
