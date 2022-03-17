const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Local_news extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id' });
      this.hasMany(models.Response, { foreignKey: 'local_news_id' });
      // this.hasMany(models.Like, { foreignKey: 'local_news_id' });
      this.hasMany(models.Photolink, { foreignKey: 'local_news_id' });
      this.hasMany(models.LikeLocal, { foreignKey: 'local_news_id' });
    }
  }
  Local_news.init({
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    status: DataTypes.STRING,
    text: DataTypes.TEXT,
    phone: DataTypes.BIGINT,
    link: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Local_news',
  });
  return Local_news;
};
