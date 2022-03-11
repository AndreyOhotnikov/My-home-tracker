'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Benifit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User,{foreignKey:'user_id'})
      this.belongsTo(models.Category_benifit,{foreignKey:'category_id'})
    }
  }
  Benifit.init({
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    text: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    category_id:DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Benifit',
  });
  return Benifit;
};
