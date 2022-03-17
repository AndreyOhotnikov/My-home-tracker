const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Photolink extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Userinfo, { foreignKey: 'userinfo_id' });
      this.belongsTo(models.Global_news, { foreignKey: 'global_news_id' });
      this.belongsTo(models.Local_news, { foreignKey: 'local_news_id' });
      this.belongsTo(models.Bid, { foreignKey: 'bid_id' });
    }
  }
  Photolink.init({
    userinfo_id: DataTypes.INTEGER,
    global_news_id: DataTypes.INTEGER,
    local_news_id: DataTypes.INTEGER,
    bid_id: DataTypes.INTEGER,
    link: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Photolink',
  });
  return Photolink;
};
