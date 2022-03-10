const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category_benifit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Benifit, { foreignKey: 'category_id' });
    }
  }
  Category_benifit.init({
    title: DataTypes.STRING,
    link: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Category_benifit',
  });
  return Category_benifit;
};
