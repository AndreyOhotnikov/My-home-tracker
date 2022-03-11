const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category_store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Store, { foreignKey: 'category_id' });
    }
  }
  Category_store.init({
    title: DataTypes.STRING,
    link: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Category_store',
  });
  return Category_store;
};
