const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class LikeLocal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Local_news, { foreignKey: 'local_news_id' });
    }
  }
  LikeLocal.init({
    user_id: DataTypes.INTEGER,
    local_news_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'LikeLocal',
  });
  return LikeLocal;
};
