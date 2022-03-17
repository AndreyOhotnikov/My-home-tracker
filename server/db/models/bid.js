const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Bid extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id' });
      this.hasMany(models.Photolink, { foreignKey: 'bid_id' });
    }
  }
  Bid.init({
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    status: DataTypes.STRING,
    text: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Bid',
  });
  return Bid;
};
